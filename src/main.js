//MAIN
// Parameters optimized according to tests.
function writeMsgToCanvas(canvasid,msg,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    switch (mode) {
        case 1: return writeMsgToCanvas_base(canvasid, msg, pass, true, 11, 2, [2, 9, 16], true, false);
        case 2: return writeMsgToCanvas_base(canvasid, msg, pass, true, 11, 2.5, [1, 2, 8], true, false);
        case 3: return writeMsgToCanvas_base(canvasid, msg, pass, true, 11, 3, [0, 1], true, false);
        case 4: return writeMsgToCanvas_base(canvasid, msg, pass, true, 5, 4, [0], true, false);
        case 5: return writeMsgToCanvas_base(canvasid, msg, pass, true, 5, 6, [0], true, true);

        case 0:
        default: return writeMsgToCanvas_base(canvasid, msg, pass, false, 1);
    }
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas(canvasid,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    switch (mode) {
        case 1: return readMsgFromCanvas_base(canvasid, pass, true, 11, 2, [2, 9, 16], true, false)[1];
        case 2: return readMsgFromCanvas_base(canvasid, pass, true, 11, 2.5, [1, 2, 8], true, false)[1];
        case 3: return readMsgFromCanvas_base(canvasid, pass, true, 11, 3, [0, 1], true, false)[1];
        case 4: return readMsgFromCanvas_base(canvasid, pass, true, 5, 4, [0], true, false)[1];
        case 5: return readMsgFromCanvas_base(canvasid, pass, true, 5, 6, [0], true, true)[1];
        case 0:
        default: return readMsgFromCanvas_base(canvasid, pass, false, 1)[1];
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