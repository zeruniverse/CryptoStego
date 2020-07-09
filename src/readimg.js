function prepare_read_data(data_bits, enc_key){
    var data_bits_len = data_bits.length;
    var result=Array(data_bits_len);
    var order = get_hashed_order(enc_key, data_bits_len);

    for(var i=0; i<data_bits_len; i++) result[i] = data_bits[order[i]];

    return result;
}

function get_bits_lsb(imgData){
    var result=Array();
    for (var i=0;i<imgData.data.length;i+=4)
    {
        result.push((imgData.data[i]%2==1)?1:0);
        result.push((imgData.data[i+1]%2==1)?1:0);
        result.push((imgData.data[i+2]%2==1)?1:0);
    }
    return result;
}

function get_dct_y(channel_data, channel_width, channel_length, multiply, loc){
    /* get bits from Y channel
    Input:
        channel_data (1D array of size (channel_width * channel_length)): manipulated data
        channel_width (int): channel width
        channel_length (int): channel length
        multiply (int): int for Q matrix to be multiplied
        loc (1D array of int): which location on block to stego on.
    Output:
        bits_stream.
    */

    var row_block = Math.floor(channel_length / 8);
    var col_block = Math.floor(channel_width / 8);
    var num_block_bits = loc.length;
    var result=Array();
    var reference_dct_block;

    for(var i=0; i<row_block; i++) for(var j=0; j<col_block; j++){
        var block_y = extract_block(channel_data, 8, i*8, j*8, channel_width);
        var dct_y = dct(block_y);
        if(i==0 && j==0){
            reference_dct_block = dct_y;
            continue;
        }
        result.push(get_bit_from_quantized(multiply, loc,
            dct_y.map(function (num, idx) {return num - reference_dct_block[idx];})));
    }

    return [].concat.apply([], result);
}

function get_dct_CbCr(channel_data, channel_width, channel_length, multiply, loc){
    /* get bits from CbCr channel
    Input:
        channel_data (1D array of size (channel_width * channel_length)): manipulated data
        channel_width (int): channel width
        channel_length (int): channel length
        multiply (int): int for Q matrix to be multiplied
        loc (1D array of int): which location on block to stego on.
    Output:
        bits_stream.
    */

    var row_block = Math.floor(channel_length / 16);
    var col_block = Math.floor(channel_width / 16);
    var num_block_bits = loc.length;
    var result=Array();
    var reference_dct_block;

    for(var i=0; i<row_block; i++) for(var j=0; j<col_block; j++){
        var block_y = extract_block(channel_data, 16, i*16, j*16, channel_width);
        block_y = img_16x16_to_8x8(block_y);
        var dct_y = dct(block_y);
        if(i==0 && j==0){
            reference_dct_block = dct_y;
            continue;
        }
        result.push(get_bit_from_quantized(multiply, loc,
            dct_y.map(function (num, idx) {return num - reference_dct_block[idx];})));
    }
    return [].concat.apply([], result);
}

function get_bits_dct(imgData, channel_width, channel_length, multiply, loc, use_y, use_downsampling){
    /* Get Stego from imgData using DCT
    Input:
        imgData: manipulated data
        channel_width (int): channel width
        channel_length (int): channel length
        multiply (int): int for Q matrix to be multiplied
        loc (1D array of int): which location on block to stego on.
        use_y (bool): whether to manipulate y channel
        use_downsampling(bool): whether to downsample on CrCb
    Output:
        bit_stream
    */

    var y=Array(), cb=Array(), cr=Array(), result=Array();
    for (var i=0;i<imgData.data.length;i+=4)
    {
        var ycbcr = rgb2ycbcr(imgData.data[i],imgData.data[i+1],imgData.data[i+2]);
        y.push(ycbcr[0]);
        cb.push(ycbcr[1]);
        cr.push(ycbcr[2]);
    }
    if(use_y) result.push(get_dct_y(y, channel_width, channel_length, multiply, loc));
    var cbcr_func = (use_downsampling)?get_dct_CbCr : get_dct_y;
    result.push(cbcr_func(cb, channel_width, channel_length, multiply, loc));
    result.push(cbcr_func(cr, channel_width, channel_length, multiply, loc));

    return [].concat.apply([], result);
}

// main function
function readMsgFromCanvas_base(canvasid, enc_key, use_dct, num_copy, multiply, loc, use_y, use_downsampling){
    /* Read message from canvas
    Input:
        canvasid: Canvas ID to read/write data
        enc_key (string): encryption key for msg
        use_dct (bool): use true for DCT, false for LSB
        num_copy (int): how many copies of each bit to write into image. Larger value is more robust but reduces capacity.

        -- below only valid for use_dct=true --

        multiply (int): int for Q matrix to be multiplied
        loc (1D array of int): which location on block to stego on.
        use_y (bool): whether to manipulate y channel
        use_downsampling(bool): whether to downsample on CrCb
    Output:
        [status, message]: status is a boolean: true means success and false means failure.
            On success, message is the decrypted message and on failure, message is the error message.
    */

    use_dct=(use_dct === undefined)?false:use_dct;
    enc_key=(enc_key === undefined)?'':enc_key;
    num_copy=(num_copy === undefined)?5:num_copy;
    multiply=(multiply=== undefined)?30:multiply;
    loc=(loc === undefined)? [1,2,8,9,10,16,17]:loc;
    use_y=(use_y === undefined) ? true: use_y;
    use_downsampling=(use_downsampling === undefined) ? true: use_downsampling;

    var c, ctx, imgData;

    try{
        c=document.getElementById(canvasid);
        ctx=c.getContext("2d");
        imgData=ctx.getImageData(0,0,c.width,c.height);
    }
    catch(err){
        return [false, err];
    }

    try{
        var bits_stream = (use_dct)?get_bits_dct(imgData, c.width, c.height, multiply, loc, use_y, use_downsampling):get_bits_lsb(imgData);
        bits_stream = prepare_read_data(bits_stream, enc_key);
        var msg = bits_to_str(bits_stream, num_copy);
        if(msg==null) return [false,
            "Message does not decrypt. Maybe due to (1) wrong password / enc method. (2) corrupted file"];
        return [true, msg];
    }
    catch(err){
        return [false, "Message does not decrypt. Maybe due to (1) wrong password / enc method. (2) corrupted file"];
    }
}