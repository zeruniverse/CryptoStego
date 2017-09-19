function isInclude(arr,obj) {
    return (arr.indexOf(obj) != -1);
}

function rgbtoycbcr(r,g,b){
	result = Array();
	//Y
	result.push(0.299*r+0.587*g+0.114*b);
	//Cb
	result.push(128-0.168736*r-0.331264*g+0.5*b);
	//Cr
	result.push(128+0.5*r-0.418688*g-0.081312*b);
	return result;
}
function ycbcrtorgb(y,cb,cr){
	result = Array();
	//R
	result.push(y+1.402*(cr-128));
	//G
	result.push(y-0.344136*(cb-128)-0.714136*(cr-128));
	//B
	result.push(y+1.772*(cb-128));
	return result;
}
function gethashval(str,modval,taken){
    var result=0;
    var a=0;
    for(var i=1;i<20;i++) a+=str.charCodeAt(i);
    result += a*419430000;
    a=0;
    for(var i=30;i<50;i++) a+=str.charCodeAt(i);
    result += a * 4194000;
    a=0;
    for(var i=70;i<90;i++) a+=str.charCodeAt(i);
    result += a * 41940;
    a=0;
    for(var i=100;i<110;i++) a+=str.charCodeAt(i);
    result += a * 419;
    for(var i=20;i<29;i++) result+=str.charCodeAt(i);
    for(var i=90;i<99;i++) result+=str.charCodeAt(i);
    result = result % modval;
    while(isInclude(taken,result)) result = (result+1)%modval;
    taken.push(result);
    return result;
}



//8*8 DCT BY JEFFERY
function imagedct(dataArray, isIdct) {
	//dataArray[8*8*3] -> Y Cb Cr
	//access i*8+j
    isIdct=(isIdct===undefined)?false:isIdct;
	function dct(dataArray) {
		//input 8*8*3 | x,y loc x*8+y
		//output 8*8*3| u,v loc u*8+v
		result = Array();
		for(var i = 0; i<64; i++) result.push(Array());
		for(var chann=0;chann<3;chann++)
			for(var u=0; u<8;u++)
				for(var v=0; v<8; v++){
					var cu = (u==0)?1/Math.sqrt(2):1;
					var cv = (v==0)?1/Math.sqrt(2):1;
					var sum = 0;
					for(var x=0;x<8;x++) for(var y=0;y<8;y++){
						sum += dataArray[x*8+y][chann]*Math.cos((2*x+1)*u*Math.PI/16)*Math.cos((2*y+1)*v*Math.PI/16);
					}
					result[u*8+v].push((1/4)*cu*cv*sum);
				}
					
		return result;
	}

	function idct(dataArray) {
		//input 8*8*3 | u,v loc u*8+v
		//output 8*8*3| x,y loc x*8+y
		result = Array();
		for(var i = 0; i<64; i++) result.push(Array());
		for(var chann=0;chann<3;chann++)
			for(var x=0; x<8;x++)
				for(var y=0; y<8; y++){
					var sum = 0;
					for(var u=0;u<8;u++) for(var v=0;v<8;v++){
						var cu = (u==0)?1/Math.sqrt(2):1;
						var cv = (v==0)?1/Math.sqrt(2):1;
						sum += cu*cv*dataArray[u*8+v][chann]*Math.cos((2*x+1)*u*Math.PI/16)*Math.cos((2*y+1)*v*Math.PI/16);
					}
					result[x*8+y].push((1/4)*sum);
				}
					
		return result;
	}
	return (isIdct) ? idct(dataArray) : dct(dataArray);
}

function dctconvert(imgData,width,height){
    var blocksize= 8;
    var w_ite=Math.floor(width/blocksize);
    var h_ite=Math.floor(height/blocksize);
    var result=Array();
    for(var h=0;h<h_ite;h++)
        for(var w=0;w<w_ite;w++)
        {
            var tmp=Array();
            for(var i=0;i<blocksize;i++) for(var j=0;j<blocksize;j++){
                tmp.push(rgbtoycbcr(imgData[((h*blocksize+i)*width+w*blocksize+j)*4],
				imgData[((h*blocksize+i)*width+w*blocksize+j)*4+1],
				imgData[((h*blocksize+i)*width+w*blocksize+j)*4+2]
				));
            }
            result.push(imagedct(tmp));
        }
    return result;
}
