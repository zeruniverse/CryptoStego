function prepare_write_data(data_bits, enc_key, encode_len){
    var data_bits_len = data_bits.length;
    if(data_bits.length > encode_len) throw "Can not hold this many data!";
    var result=Array(encode_len);
    for(var i=0; i<encode_len; i++){
        result[i] = Math.floor(Math.random()*2); //obfuscation
    }

    var order = get_hashed_order(enc_key, encode_len);
    for(var i=0; i<data_bits_len; i++) result[order[i]] = data_bits[i];

    return result;
}

function write_dct_y(channel_data, channel_width, channel_length, setdata, multiply, loc){
    /* write a DCT manipulated Y channel from original Y channel
    Input:
        channel_data (1D array of size (channel_width * channel_length)): original Y data
        channel_width (int): channel width
        channel_length (int): channel length
        setdata (1D array of bits 0/1 array): data to stego
        multiply (int): int for Q matrix to be multiplied
        loc (1D array of int): which location on block to stego on.
    */

    var row_block = Math.floor(channel_length / 8);
    var col_block = Math.floor(channel_width / 8);
    var num_block_bits = loc.length;
    if( num_block_bits * (row_block * col_block - 1)!= setdata.length) throw "Image size does not match data size (Y channel)";
    var reference_dct_block;

    for(var i=0; i<row_block; i++) for(var j=0; j<col_block; j++){
        var block_y = extract_block(channel_data, 8, i*8, j*8, channel_width);
        var dct_y = dct(block_y);
        if (i==0 && j==0){
            reference_dct_block = dct_y;
            continue;
        }
        var dct_diff = dct_y.map(function (num, idx) {return num - reference_dct_block[idx];});
        var qdiff = quantize_diff(multiply, loc, dct_diff, setdata.slice(num_block_bits * (i*col_block + j - 1), num_block_bits * (i*col_block + j)));
        dct_y = dct_y.map(function (num, idx) {return num + qdiff[idx];});
        block_y = idct(dct_y);
        //replace original block with stego Y
        replace_block(channel_data, 8, i*8, j*8, channel_width, block_y);
    }
}

function write_dct_CbCr(channel_data, channel_width, channel_length, setdata, multiply, loc){
    /* get a DCT manipulated Cb or Cr channel from original channel
    Input:
        channel_data (1D array of size (channel_width * channel_length)): original CbCr data
        channel_width (int): channel width
        channel_length (int): channel length
        setdata (1D array of bits 0/1 array): data to stego
        multiply (int): int for Q matrix to be multiplied
        loc (1D array of int): which location on block to stego on.
    */

    var row_block = Math.floor(channel_length / 16);
    var col_block = Math.floor(channel_width / 16);
    var num_block_bits = loc.length;
    if( num_block_bits * (row_block * col_block - 1) != setdata.length) throw "Image size does not match data size (CbCr channel)";
    var reference_dct_block;

    for(var i=0; i<row_block; i++) for(var j=0; j<col_block; j++){
        var block_y = extract_block(channel_data, 16, i*16, j*16, channel_width);
        var block_y_8x8 = img_16x16_to_8x8(block_y);
        var dct_y = dct(block_y_8x8);
        if (i==0 && j==0){
            reference_dct_block = dct_y;
            continue;
        }
        var dct_diff = dct_y.map(function (num, idx) {return num - reference_dct_block[idx];});
        var qdiff = quantize_diff(multiply, loc, dct_diff, setdata.slice(num_block_bits * (i*col_block + j - 1), num_block_bits * (i*col_block + j)));
        dct_y = dct_y.map(function (num, idx) {return num + qdiff[idx];});
        var block_y_stego = idct(dct_y);
        var stego_diff = block_y_stego.map(function (num, idx) {return num - block_y_8x8[idx];});
        stego_diff = img_8x8_to_16x16(stego_diff);
        block_y = block_y.map(function (num, idx) {return num + stego_diff[idx];});

        //replace original block with stego Y
        replace_block(channel_data, 16, i*16, j*16, channel_width, block_y);
    }
}


function write_lsb(imgData,setdata) {
    function unsetbit(k){
        return (k%2==1)?k-1:k;
    }

    function setbit(k){
        return (k%2==1)?k:k+1;
    }
    var j=0;
    for (var i=0;i<imgData.data.length;i+=4)
    {
        imgData.data[i] = (setdata[j])?setbit(imgData.data[i]):unsetbit(imgData.data[i]);
        imgData.data[i+1] = (setdata[j+1])?setbit(imgData.data[i+1]):unsetbit(imgData.data[i+1]);
        imgData.data[i+2] = (setdata[j+2])?setbit(imgData.data[i+2]):unsetbit(imgData.data[i+2]);
        imgData.data[i+3]=255;
        j+=3;
    }
}

function dct_data_capacity(channel_width, channel_length, loc, use_y, use_downsampling){
    var y_data_len = (use_y)?(Math.floor(channel_length / 8) * Math.floor(channel_width / 8) - 1)* loc.length : 0;
    var cblock = (use_downsampling)? 16 : 8;
    var cbcr_data_len = (Math.floor(channel_length / cblock) * Math.floor(channel_width / cblock) - 1) * loc.length;
    return [y_data_len, cbcr_data_len];
}

function write_dct(imgData, channel_width, channel_length, setdata, multiply, loc, use_y, use_downsampling){
    /* Write Stego to imgData using DCT
    Input:
        imgData: to manipulate
        channel_width (int): channel width
        channel_length (int): channel length
        setdata (1D array of bits 0/1 array): data to stego
        multiply (int): int for Q matrix to be multiplied
        loc (1D array of int): which location on block to stego on.
        use_y (bool): whether to manipulate y channel
        use_downsampling (bool): whether to downsample on CrCb
    */
    var data_capacity = dct_data_capacity(channel_width, channel_length, loc, use_y, use_downsampling);
    var y_data_len = data_capacity[0];
    var cbcr_data_len = data_capacity[1];

    var y=Array(), cb=Array(), cr=Array();
    for (var i=0;i<imgData.data.length;i+=4)
    {
        var ycbcr = rgb2ycbcr(imgData.data[i],imgData.data[i+1],imgData.data[i+2]);
        y.push(ycbcr[0]);
        cb.push(ycbcr[1]);
        cr.push(ycbcr[2]);
    }
    if(use_y) write_dct_y(y, channel_width, channel_length, setdata.slice(0, y_data_len), multiply, loc);
    var cbcr_func = (use_downsampling)?write_dct_CbCr : write_dct_y;

    cbcr_func(cb, channel_width, channel_length, setdata.slice(y_data_len, y_data_len + cbcr_data_len), multiply, loc);
    cbcr_func(cr, channel_width, channel_length,
        setdata.slice(y_data_len + cbcr_data_len, y_data_len + cbcr_data_len + cbcr_data_len), multiply, loc);
    var j=0;
    for (var i=0;i<imgData.data.length;i+=4)
    {
        var rgb = ycbcr2rgb(y[j], cb[j], cr[j]);
        imgData.data[i] = rgbclip(rgb[0]);
        imgData.data[i+1] = rgbclip(rgb[1]);
        imgData.data[i+2] = rgbclip(rgb[2]);
        j+=1;
    }

}

// main function
function writeMsgToCanvas_base(canvasid, msg, enc_key, use_dct, num_copy, multiply, loc, use_y, use_downsampling){
    /* Write message to canvas
    Input:
        canvasid: Canvas ID to read/write data
        msg (string): message to stego
        enc_key (string): encryption key for msg
        use_dct (bool): use true for DCT, false for LSB
        num_copy (int): how many copies of each bit to write into image. Larger value is more robust but reduces capacity.

        -- below only valid for use_dct=true --


        multiply (int): int for Q matrix to be multiplied
        loc (1D array of int): which location on block to stego on.
        use_y (bool): whether to manipulate y channel
        use_downsampling(bool): whether to downsample on CrCb
    Output:
        isSuccess: === true: success, otherwise, a string with error message.
    */

    use_dct=(use_dct === undefined)?false:use_dct;
    enc_key=(enc_key === undefined)?'':enc_key;
    num_copy=(num_copy === undefined)?5:num_copy;
    multiply=(multiply=== undefined)?30:multiply;
    loc=(loc === undefined)? [1,2,8,9,10,16,17]:loc;
    use_y=(use_y === undefined) ? true: use_y;
    use_downsampling=(use_downsampling === undefined) ? true: use_downsampling;

    try{
        var c=document.getElementById(canvasid);
        var ctx=c.getContext("2d");
        var imgData=ctx.getImageData(0,0,c.width,c.height);

        var encode_len = Math.floor(imgData.data.length / 4) * 3;
        if(use_dct){
            var cap = dct_data_capacity(c.width, c.height, loc, use_y, use_downsampling);
            encode_len = cap[0] + 2 * cap[1];
        }
        // prepare data
        var bit_stream = str_to_bits(msg, num_copy);
        bit_stream = prepare_write_data(bit_stream, enc_key, encode_len);
        if(use_dct){
            write_dct(imgData, c.width, c.height, bit_stream, multiply, loc, use_y, use_downsampling);
        } else write_lsb(imgData, bit_stream);
        ctx.putImageData(imgData,0,0);
        return true;
    }
    catch(err){
        return err;
    }
}