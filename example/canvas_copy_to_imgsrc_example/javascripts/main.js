//MAIN
// Parameters optimized according to tests.
function writeMsgToCanvas(canvasid,msg,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    switch (mode) {
        //case 1: return writeMsgToCanvas_block(canvasid,msg,pass,5,4,350); -NOT WORKING WELL
        case 1: return writeMsgToCanvas_single(canvasid,msg,pass,true,19,3,160);
        case 2: return writeMsgToCanvas_single(canvasid,msg,pass,true,5,3,160);
        case 3: return writeMsgToCanvas_single(canvasid,msg,pass,true,5,2,80);
        case 4: return writeMsgToCanvas_single(canvasid,msg,pass,true,9,2,350);
        case 5: return writeMsgToCanvas_single(canvasid,msg,pass,true,3,3,1300);
        
        //case : return writeMsgToCanvas_AVG(canvasid,msg,pass,3,2,300); --FAIL
        case 0:
        default: return writeMsgToCanvas_single(canvasid,msg,pass);
    }
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas(canvasid,pass,mode){
    mode=(mode=== undefined)?0:parseInt(mode);
    switch (mode) {
        //case 1: return readMsgFromCanvas_block(canvasid,pass,5,4,350); -NOT WORKING WELL
        case 1: return readMsgFromCanvas_single(canvasid,pass,true,19,3,160);
        case 2: return readMsgFromCanvas_single(canvasid,pass,true,5,3,160);
        case 3: return readMsgFromCanvas_single(canvasid,pass,true,5,2,80);
        case 4: return readMsgFromCanvas_single(canvasid,pass,true,9,2,350);
        case 5: return readMsgFromCanvas_single(canvasid,pass,true,3,3,1300);
        //case : return readMsgFromCanvas_AVG(canvasid,pass,3,2,300); --FAIL
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