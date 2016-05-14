//Write msg to the image in canvasid.
//Return: null - fail. 1 - successful
function writeMsgToCanvas(canvasid,msg,pass='',fft=false,copy=5,blocksizepow=2,lim=80){
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var fftdata=(fft)?fftconvert(imgData.data,c.width,c.height,blocksizepow):null;
    var blocksize= 1 << blocksizepow;
    var datalength=(fft)?Math.floor(fftdata.length/copy):Math.floor(imgData.data.length/4)*3;
    var setarray = (pass=='')?generate_nopass(datalength,msg):generate_pass(datalength,msg,pass);
    if(setarray==null) return null;
    (fft)?fftset(imgData.data,fftdata,c.width,c.height,setarray,copy,blocksizepow,lim):setimgdata(imgData,setarray);
    ctx.putImageData(imgData,0,0);
    return 1;
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas(canvasid,pass='',fft=false,copy=5,blocksizepow=2,lim=80){
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var fftdata=(fft)?fftconvert(imgData.data,c.width,c.height,blocksizepow):null;
    var bitarray = (fft)?extractBitArrayFFT(fftdata,copy,lim):extractBitArray(imgData);
    if (bitarray[1]) return null;
    var msgArray=(bitarray[0])?extractMsgArray_pass(bitarray,pass):extractMsgArray_nopass(bitarray);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}

//load image from html5 input and execute callback() if successful
function loadIMGtoCanvas(inputid, canvasid, callback, maxsize=0) {
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