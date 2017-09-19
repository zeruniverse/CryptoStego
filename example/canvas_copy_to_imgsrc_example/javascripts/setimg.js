function bitconvert(str)
{
    var utf8array=utf8Encode(str);
    var result=Array();
    var utf8strlen=utf8array.length;
    for(var i=0;i<utf8strlen;i++){
        for(var j=128; j>0; j=Math.floor(j/2))
        {
            if(Math.floor(utf8array[i]/j))
            {
                result.push(true);
                utf8array[i] -=j;
            }else result.push(false);
        }
    }
    return result;
}
function unsetbit(k){
    return (k%2==1)?k-1:k;
}

function setbit(k){
    return (k%2==1)?k:k+1;
}

function dct_setbit(k,lim){
    var tmp=Math.floor(k/lim);
    return (tmp%2==1)?tmp*lim:(tmp+1)*lim;
}

function dct_unsetbit(k,lim){
    var tmp=Math.floor(k/lim);
    return (tmp%2==1)?(tmp-1)*lim:tmp*lim;
}

function setimgdata(imgData,setdata) {
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

function initialize(length){ //set bit1, bit2 so we can have at most 4 modes.  //May. 14, 2016 -- Don't let people know the mode. Don't set it.
    result=Array();
    for(var i=0; i<length; i++){
        result.push((Math.floor(Math.random()*2))?true:false); //obfuscation
    }
    return result;
}

function generate_pass(imgdatalength,information,pass,copy){
    var info=bitconvert(information);
    if ((info.length+24)*copy>imgdatalength) {alert('TEXT TOO LONG!'); return null;}
    var result=initialize(imgdatalength);
    var infolen=info.length;
    pass=String(CryptoJS.SHA512(pass));
    var taken=Array();
    var modval=imgdatalength;
    for(var i=0;i<infolen;i++) for(var j=0;j<copy;j++) {
        result[gethashval(pass,modval,taken)]=info[i];
        pass=String(CryptoJS.SHA512(pass));
    }
    for(var j=0;j<24;j++) for(var i=0;i<copy;i++) {
        result[gethashval(pass,modval,taken)]=true;
        pass=String(CryptoJS.SHA512(pass));
    }
    return result;
}

function dctset(imgData,dctdata,width,height,setarray,lim){
    function norm(a){
        a=Math.round(a);
        a=(a>255)?255:a;
        return (a<0)?0:a;
    }
    var dctdatalength=dctdata.length;
    var datalength=setarray.length/3;
    for(var i=0;i<datalength;i++){
		//Y 2-bit, Cr+Cb 1-bit
        dctdata[i][0][0]=(setarray[i*3])?dct_setbit(dctdata[i][0][0],lim):dct_unsetbit(dctdata[i][0][0],lim);
		dctdata[i][0][1]=(setarray[i*3+1])?dct_setbit(dctdata[i][0][1],lim):dct_unsetbit(dctdata[i][0][1],lim);
		dctdata[i][0][2]=(setarray[i*3+2])?dct_setbit(dctdata[i][0][2],lim):dct_unsetbit(dctdata[i][0][2],lim);
    }
    var blocksize= 8;
    var w_ite=Math.floor(width/blocksize);
    var h_ite=Math.floor(height/blocksize);
    var result=Array();
    var count=0;
    for(var h=0;h<h_ite;h++)
        for(var w=0;w<w_ite;w++)
        {
            var tmp=imagedct(dctdata[count],true);               
            for(var i=0;i<blocksize;i++) for(var j=0;j<blocksize;j++){
				var rgb = ycbcrtorgb(tmp[i*blocksize+j][0],tmp[i*blocksize+j][1],tmp[i*blocksize+j][2]);
				for(var chann=0;chann<3;chann++)
					imgData[((h*blocksize+i)*width+w*blocksize+j)*4+chann]=norm(rgb[chann]);
            }
            count++;
        }
    for (var i=0;i<imgData.length;i+=4)
    {
        imgData[i+3]=255;
    }
}

//Write msg to the image in canvasid.
//Return: null - fail. 1 - successful
function writeMsgToCanvas_single(canvasid,msg,pass,dct,copy,lim){
    dct=(dct === undefined)?false:dct;
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    lim=(lim=== undefined)?30:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var dctdata=(dct)?dctconvert(imgData.data,c.width,c.height):null;
    var datalength=(dct)?dctdata.length*3:Math.floor(imgData.data.length/4)*3;
    var setarray = (dct)?generate_pass(datalength,msg,pass,copy):generate_pass(datalength,msg,pass,1);
    if(setarray==null) return null;
    (dct)?dctset(imgData.data,dctdata,c.width,c.height,setarray,lim):setimgdata(imgData,setarray);
    ctx.putImageData(imgData,0,0);
    return 1;
}