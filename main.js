//Write msg to the image in canvasid.
//Return: null - fail. 1 - successful
function writeMsgToCanvas(canvasid,msg,pass=''){
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var setarray = (pass=='')?generate_nopass(Math.floor(imgData.data.length/4)*3,msg):generate_pass(Math.floor(imgData.data.length/4)*3,msg,pass);
    if(setarray==null) return null;
    setimgdata(imgData,setarray);
    ctx.putImageData(imgData,0,0);
    return 1;
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas(canvasid,pass){
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var bitarray = extractBitArray(imgData);
    if (bitarray[1]) return null;
    var msgArray=(bitarray[0])?extractMsgArray_pass(bitarray,pass):extractMsgArray_nopass(bitarray);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}

//load image from html5 input and execute callback() if successful
function loadIMGtoCanvas(inputid, canvasid, callback) {
    var input = document.getElementById(inputid);
    if (input.files) {
        var f = input.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = e.target.result;
            var image = new Image();
            image.onload = function() {
                var canvas = document.createElement('canvas');
                canvas.id = canvasid;
                canvas.width = image.width;
                canvas.height = image.height;
                canvas.style.display = "none";
                var body = document.getElementsByTagName("body")[0];
                body.appendChild(canvas);
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                callback();
                document.body.removeChild(canvas);
            };
            image.src = data;
        };
        reader.readAsDataURL(f);
    } else {
        alert('NO IMG FILE SELECTED');
        return;
    }
}