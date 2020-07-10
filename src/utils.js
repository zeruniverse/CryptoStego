function rgb2ycbcr(r,g,b){
    /* RGB to Y Cb Cr space */
	return [0.299*r+0.587*g+0.114*b, 128-0.168736*r-0.331264*g+0.5*b, 128+0.5*r-0.418688*g-0.081312*b];
}

function ycbcr2rgb(y,cb,cr){
    /* Y Cb Cr to RGB space */
	return [y+1.402*(cr-128), y-0.344136*(cb-128)-0.714136*(cr-128), y+1.772*(cb-128)];
}

function get_hashed_order(password, arr_len){
    // O(arr_len) algorithm
    var orders = Array.from(Array(arr_len).keys());
    var result = [];
    var loc;
    var seed = CryptoJS.SHA512(password).words.reduce(function (total, num) {return total + Math.abs(num);}, 0);
    var rnd = new MersenneTwister(seed);
    for(var i=arr_len; i>0; i--){
        loc = rnd.genrand_int32() % i;
        result.push(orders[loc]);
        orders[loc] = orders[i-1];
    }
    return result;
}


function dct(dataArray) {
    // Apply DCT to a 8*8 data array (64). Expected input is [8*8]
    // input 8*8 | x,y loc x*8+y
    // output 8*8| u,v loc u*8+v
    var result = Array(64).fill(0);
    var cu, cv, sum;
    for(var u=0; u<8;u++) for(var v=0; v<8; v++){
        cu = (u==0)?1/Math.sqrt(2):1;
        cv = (v==0)?1/Math.sqrt(2):1;
        sum = 0;
        for(var x=0;x<8;x++) for(var y=0;y<8;y++){
            sum += dataArray[x*8+y]*Math.cos((2*x+1)*u*Math.PI/16)*Math.cos((2*y+1)*v*Math.PI/16);
        }
        result[u*8+v]=(1/4)*cu*cv*sum;
    }

    return result;
}

function idct(dataArray) {
    // Apply inverse DCT to a 8*8 data array (64). Expected output is [8*8] -> Y Cb Cr
    //input 8*8*3 | u,v loc u*8+v
    //output 8*8*3| x,y loc x*8+y
    result = Array(64).fill(0);
    var cu, cv, sum;
    for(var x=0; x<8;x++) for(var y=0; y<8; y++){
        sum = 0;
        for(var u=0;u<8;u++) for(var v=0;v<8;v++){
            cu = (u==0)?1/Math.sqrt(2):1;
            cv = (v==0)?1/Math.sqrt(2):1;
            sum += cu*cv*dataArray[u*8+v]*Math.cos((2*x+1)*u*Math.PI/16)*Math.cos((2*y+1)*v*Math.PI/16);
        }
        result[x*8+y] = (1/4)*sum;
    }

    return result;
}

function quantization_matrix(multiply){
    /*
    return a quantization matrix with given multiply. pre-defined Q from
    https://en.wikipedia.org/wiki/Quantization_(image_processing)#Quantization_matrices
    */

    var Q = [
        16, 11, 10, 16, 24, 40, 51, 61,
        12, 12, 14, 19, 26, 58, 60, 55,
        14, 13, 16, 24, 40, 57, 69, 56,
        14, 17, 22, 29, 51, 87, 80, 62,
        18, 22, 37, 56, 68, 109, 103, 77,
        24, 35, 55, 64, 81, 104, 113, 92,
        49, 64, 78, 87, 103, 121, 120, 101,
        72, 92, 95, 98, 112, 100, 103, 99,
    ]
    for(var i=0; i<64; i++){
        Q[i] *= multiply;
    }
    return Q
}

function quantize_diff(multiply, loc, mat, encode_bits){
    /* quantize the size 64 (8*8) matrix.
    Input:
        multiply (int): the multiply for quantization matrix Q. Larger value is more robust but changes more image details.
        loc (array): where to apply quantization.
        mat (array of size 64): the matrix.
        encode_bits (0/1 bit array with same size as loc)
    Output:
        diff (array of size 64): the diff to be added to original array for stego
    */
    if(loc.length != encode_bits.length) throw "LOC and ENCODE_BITS have different sizes! This is a bug in code!";
    var Q = quantization_matrix(multiply);
    var result = Array(64).fill(0);
    var div_Q, low, high;
    for(var i=0; i<loc.length; i++){
        div_Q = mat[loc[i]] / Q[loc[i]];
        low = Math.floor(div_Q);
        if(Math.abs(low % 2) != encode_bits[i]) low-=1;
        high = Math.ceil(div_Q);
        if(Math.abs(high % 2) != encode_bits[i]) high+=1;
        if(div_Q - low > high - div_Q) low = high;
        result[loc[i]] = low * Q[loc[i]] - mat[loc[i]];
    }
    return result;
}

function get_bit_from_quantized(multiply, loc, quantized_mat){
    /* get bits from quantized size 64 (8*8) matrix.
    Input:
        multiply (int): the multiply for quantization matrix Q. Larger value is more robust but changes more image details.
        loc (array): where quantization is applied.
        quantized_mat (array of size 64): the matrix.
    Output:
        bits (array of size loc.length): the extracted bits
    */
    var Q = quantization_matrix(multiply);
    var result = [];
    for(var i=0; i<loc.length; i++){
        result.push(Math.abs(Math.round(quantized_mat[loc[i]] / Q[loc[i]]) % 2));
    }
    return result;
}

function img_16x16_to_8x8(mat){
    /* Resize image from 16 * 16 to 8 * 8
    Input:
        mat (size 256)
    Output:
        out_mat (size 64)
    */
    var result = Array(64);
    for(var i=0; i<8; i++) for(var j=0; j<8; j++){
        result[i*8+j] = (mat[i*2*8 + j*2] + mat[(i*2+1) * 8 + j*2] + mat[i*2*8 + j*2 + 1] + mat[(i*2+1) * 8 + j*2 + 1]) / 4;
    }
    return result;
}

function img_8x8_to_16x16(mat){
    /* Resize image from 8 * 8 to 16 * 16
    Input:
        mat (size 64)
    Output:
        out_mat (size 256)
    */
    var result = Array(256);
    for(var i=0; i<16; i++) for(var j=0; j<16; j++){
        result[i*16+j] = mat[Math.floor(i/2) * 8 + Math.floor(j/2)];
    }
    return result;
}

function rgbclip(a){
    a=Math.round(a);
    a=(a>255)?255:a;
    return (a<0)?0:a;
}

function str_to_bits(str, num_copy)
{
    var utf8array=utf8Encode(str);
    var result=Array();
    var utf8strlen=utf8array.length;
    for(var i=0;i<utf8strlen;i++){
        for(var j=128; j>0; j=Math.floor(j/2))
        {
            if(Math.floor(utf8array[i]/j))
            {
                for(var cp=0; cp<num_copy; cp++) result.push(1);
                utf8array[i] -=j;
            } else for(var cp=0; cp<num_copy; cp++) result.push(0);
        }
    }
    for(var j=0;j<24;j++) for(var i=0;i<num_copy;i++) {
        result.push(1);
    }
    return result;
}

function bits_to_str(bitarray, num_copy)
{
    function merge_bits(bits){
        var bits_len = bits.length;
        var bits_sum = 0;
        for(var i=0;i<bits_len;i++) bits_sum += bits[i];
        return Math.round(bits_sum / bits_len);
    }

    var msg_array=Array();
    var data, tmp;

    var msg_array_len=Math.floor(Math.floor(bitarray.length/num_copy)/8);
    for(var i=0; i<msg_array_len; i++){
        data = 0;
        tmp = 128;
        for(var j=0; j<8; j++){
            data += merge_bits(bitarray.slice((i*8 + j) *num_copy, (i*8 + j + 1) *num_copy))*tmp;
            tmp = Math.floor(tmp/2);
        }
        if(data == 255) break; //END NOTATION
        msg_array.push(data);
    }

    return utf8Decode(msg_array);
}

function extract_block(mat, block_size, x_min, y_min, img_num_col){
    var result = Array(block_size * block_size);
    for(var i=0; i<block_size; i++) for(var j=0; j<block_size; j++){
        result[i*block_size + j] = mat[(x_min+i)*img_num_col + y_min+j];
    }
    return result;
}

function replace_block(mat, block_size, x_min, y_min, img_num_col, new_data){
    for(var i=0; i<block_size; i++) for(var j=0; j<block_size; j++){
        mat[(x_min+i)*img_num_col + y_min+j] = new_data[i*block_size + j];
    }
}