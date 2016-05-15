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

function fft_setbit(k,lim){
    var tmp=Math.floor(k/lim);
    return (tmp%2==1)?tmp*lim:(tmp+1)*lim;
}

function fft_unsetbit(k,lim){
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

function fastAVGSet(imgData,SUMdata,width,height,setarray,blocksizepow,lim){
    function norm(a){
        a=Math.round(a);
        a=(a>255)?255:a;
        return (a<0)?0:a;
    }
    var datalength=setarray.length;
    var SUMdata1=Array();
    SUMdata1 = SUMdata.slice(0);
    for(var i=0;i<datalength;i++) {
        SUMdata1[i]=(setarray[i])?fft_setbit(SUMdata1[i],lim):fft_unsetbit(SUMdata1[i],lim);
    }
    var blocksize= 1 << blocksizepow;
    var w_ite=Math.floor(width/blocksize);
    var h_ite=Math.floor(height/blocksize);
    var result=Array();
    var count=0;
    for(var chann=0;chann<3;chann++)
        for(var h=0;h<h_ite;h++)
            for(var w=0;w<w_ite;w++)
            {               
                for(var i=0;i<blocksize;i++) for(var j=0;j<blocksize;j++){
                    imgData[((h*blocksize+i)*width+w*blocksize+j)*4+chann]=norm(imgData[((h*blocksize+i)*width+w*blocksize+j)*4+chann]*(SUMdata1[count]/SUMdata[count]));
                }
                count++;
            }
    for (var i=0;i<imgData.length;i+=4)
    {
        imgData[i+3]=255;
    }
}

function fftset(imgData,fftdata,width,height,setarray,blocksizepow,lim){
    function norm(a){
        a=Math.round(a);
        a=(a>255)?255:a;
        return (a<0)?0:a;
    }
    var fftdatalength=fftdata.length;
    var datalength=setarray.length;
    for(var i=0;i<datalength;i++){
        fftdata[i][0].real=(setarray[i])?fft_setbit(fftdata[i][0].real,lim):fft_unsetbit(fftdata[i][0].real,lim);
    }
    var blocksize= 1 << blocksizepow;
    var w_ite=Math.floor(width/blocksize);
    var h_ite=Math.floor(height/blocksize);
    var result=Array();
    var count=0;
    for(var chann=0;chann<3;chann++)
        for(var h=0;h<h_ite;h++)
            for(var w=0;w<w_ite;w++)
            {
                var tmp=imageFFT(fftdata[count], blocksize, blocksize,true);               
                for(var i=0;i<blocksize;i++) for(var j=0;j<blocksize;j++){
                    imgData[((h*blocksize+i)*width+w*blocksize+j)*4+chann]=norm(tmp[i*blocksize+j].real);
                }
                count++;
            }
    for (var i=0;i<imgData.length;i+=4)
    {
        imgData[i+3]=255;
    }
}

function fftset_block(imgData,fftdata,width,height,setarray,blocksizepow,lim){
    function norm(a){
        a=Math.round(a);
        a=(a>255)?255:a;
        return (a<0)?0:a;
    }
    function setbitdata(fftdata,arrayloc,objloc,setval,lim){
        var len = Math.sqrt(Math.pow(fftdata[arrayloc][objloc].real,2)+Math.pow(fftdata[arrayloc][objloc].imag,2));
        var distlen = (setval)?fft_setbit(len,lim):fft_unsetbit(len,lim);
        distlen=(distlen>=0)?distlen:0;
        //fftdata[arrayloc][objloc].real=(setval)?fft_setbit(fftdata[arrayloc][objloc].real,lim):fft_unsetbit(fftdata[arrayloc][objloc].real,lim)
        fftdata[arrayloc][objloc].real=(distlen/len)*fftdata[arrayloc][objloc].real;
        fftdata[arrayloc][objloc].imag=(distlen/len)*fftdata[arrayloc][objloc].imag;
    }
    var datalength=setarray.length;
    var blocksize= 1 << blocksizepow;
    var count=0;
    for(var i=0;i<datalength;i++){
        //write data to top-left 2*2 block of each FFT matrix except [0].
        //[1,1] is not stable, drop it.
        var matrixloc = count % 2;
        var arrayloc = Math.floor(count / 2);
        var matrixrow = Math.floor(matrixloc / 2);
        var matrixcol = matrixloc % 2;
        if(matrixrow==0&&matrixcol==0) {matrixrow=1;matrixcol=0;}
        setbitdata(fftdata,arrayloc,matrixrow*blocksize+matrixcol,setarray[i],lim);
        count = count+1;
    }
    var w_ite=Math.floor(width/blocksize);
    var h_ite=Math.floor(height/blocksize);
    var result=Array();
    count=0;
    for(var chann=0;chann<3;chann++)
        for(var h=0;h<h_ite;h++)
            for(var w=0;w<w_ite;w++)
            {
                var tmp=imageFFT(fftdata[count], blocksize, blocksize,true);               
                for(var i=0;i<blocksize;i++) for(var j=0;j<blocksize;j++){
                    imgData[((h*blocksize+i)*width+w*blocksize+j)*4+chann]=norm(tmp[i*blocksize+j].real);
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
    var datalength=(fft)?fftdata.length:Math.floor(imgData.data.length/4)*3;
    var setarray = (fft)?generate_pass(datalength,msg,pass,copy):generate_pass(datalength,msg,pass,1);
    if(setarray==null) return null;
    (fft)?fftset(imgData.data,fftdata,c.width,c.height,setarray,blocksizepow,lim):setimgdata(imgData,setarray);
    ctx.putImageData(imgData,0,0);
    return 1;
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
    var datalength=Math.floor(fftdata.length*2);
    var setarray = generate_pass(datalength,msg,pass,copy);
    if(setarray==null) return null;
    fftset_block(imgData.data,fftdata,c.width,c.height,setarray,blocksizepow,lim);
    ctx.putImageData(imgData,0,0);
    return 1;
}

function writeMsgToCanvas_AVG(canvasid,msg,pass,copy,blocksizepow,lim){
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    blocksizepow=(blocksizepow=== undefined)?3:blocksizepow;
    lim=(lim=== undefined)?50:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var SUMdata=fastSUM(imgData.data,c.width,c.height,blocksizepow);
    var blocksize= 1 << blocksizepow;
    var datalength=SUMdata.length;
    var setarray = generate_pass(datalength,msg,pass,copy);
    if(setarray==null) return null;
    fastAVGSet(imgData.data,SUMdata,c.width,c.height,setarray,blocksizepow,lim)
    ctx.putImageData(imgData,0,0);
    return 1;
}