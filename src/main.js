//Write msg to the image in canvasid.
//Return: null - fail. 1 - successful
function writeMsgToCanvas_single(canvasid,msg,pass,fft,copy,blocksizepow,lim){
    fft=(fft === undefined)?false:fft;
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    blocksizepow=(blocksizepow=== undefined)?2:blocksizepow;
    lim=(lim=== undefined)?80:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var fftdata=(fft)?fftconvert(imgData.data,c.width,c.height,blocksizepow):null;
    var blocksize= 1 << blocksizepow;
    var datalength=(fft)?Math.floor(fftdata.length/copy):Math.floor(imgData.data.length/4)*3;
    var setarray = generate_pass(datalength,msg,pass);
    if(setarray==null) return null;
    (fft)?fftset(imgData.data,fftdata,c.width,c.height,setarray,copy,blocksizepow,lim):setimgdata(imgData,setarray);
    ctx.putImageData(imgData,0,0);
    return 1;
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas_single(canvasid,pass,fft,copy,blocksizepow,lim){
    fft=(fft === undefined)?false:fft;
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    blocksizepow=(blocksizepow=== undefined)?2:blocksizepow;
    lim=(lim=== undefined)?80:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var fftdata=(fft)?fftconvert(imgData.data,c.width,c.height,blocksizepow):null;
    var bitarray = (fft)?extractBitArrayFFT(fftdata,copy,lim):extractBitArray(imgData);
    var msgArray=extractMsgArray_pass(bitarray,pass);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}

//block version fft
//Write msg to the image in canvasid.
//Return: null - fail. 1 - successful
function writeMsgToCanvas_block(canvasid,msg,pass,copy,blocksizepow,lim){
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    blocksizepow=(blocksizepow=== undefined)?3:blocksizepow;
    blocksizepow=(blocksizepow<3)?3:blocksizepow;
    lim=(lim=== undefined)?1:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var fftdata=fftconvert(imgData.data,c.width,c.height,blocksizepow);
    var blocksize= 1 << blocksizepow;
    var datalength=Math.floor((fftdata.length*2)/copy);
    var setarray = generate_pass(datalength,msg,pass);
    if(setarray==null) return null;
    fftset_block(imgData.data,fftdata,c.width,c.height,setarray,copy,blocksizepow,lim);
    ctx.putImageData(imgData,0,0);
    return 1;
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas_block(canvasid,pass,copy,blocksizepow,lim){
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    blocksizepow=(blocksizepow=== undefined)?3:blocksizepow;
    blocksizepow=(blocksizepow<3)?3:blocksizepow;
    lim=(lim=== undefined)?1:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var fftdata=fftconvert(imgData.data,c.width,c.height,blocksizepow);
    var bitarray = extractBitArrayFFT_block(fftdata,copy,blocksizepow,lim);
    //if (bitarray[1]) return null;
    var msgArray=extractMsgArray_pass(bitarray,pass);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}

//MAIN
// Parameters optimized according to tests.
function writeMsgToCanvas(canvasid,msg,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    switch (mode) {
        case 1: return writeMsgToCanvas_block(canvasid,msg,pass,3,4,300);
        case 2: return writeMsgToCanvas_block(canvasid,msg,pass,5,4,500);
        case 3: return writeMsgToCanvas_single(canvasid,msg,pass,true,5,2,80);
        case 4: return writeMsgToCanvas_single(canvasid,msg,pass,true,9,2,350);
        case 0:
        default: return writeMsgToCanvas_single(canvasid,msg,pass);
    }
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas(canvasid,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    switch (mode) {
        case 1: return readMsgFromCanvas_block(canvasid,pass,3,4,300);
        case 2: return readMsgFromCanvas_block(canvasid,pass,5,4,500);
        case 3: return readMsgFromCanvas_single(canvasid,pass,true,5,2,80);
        case 4: return readMsgFromCanvas_single(canvasid,pass,true,9,2,350);
        case 0:
        default: return readMsgFromCanvas_single(canvasid,pass);
    }
}

//load image from html5 input and execute callback() if successful
function loadIMGtoCanvas(inputid, canvasid, callback, maxsize) {
    maxsize=(maxsize=== undefined)?0:maxsize;
    var input = document.getElementById(inputid);
    if (input.files && input.files[0]) {
        var f = input.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;
            var image = new Image();
            image.onload = function() {                        
                var w=image.width;
                var h=image.height;
                if(maxsize>0){
                    if(w>maxsize){
                        h=h*(maxsize/w);
                        w=maxsize;
                    }
                    if(h>maxsize){
                        w=w*(maxsize/h);
                        h=maxsize;
                    }
                    w=Math.floor(w);
                    h=Math.floor(h);
                }
                var canvas = document.createElement('canvas');
                canvas.id = canvasid;
                canvas.width = w;
                canvas.height = h;
                canvas.style.display = "none";
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(canvas);
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0,image.width,image.height,0,0,w,h);
                callback();
                document.body.removeChild(canvas);
            };
            image.src = data;
        };
        reader.readAsDataURL(f);
    } else {
        alert('NO IMG FILE SELECTED');
        return 'ERROR PROCESSING IMAGE!';
    }
}