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

function initialize(length,bit1,bit2){ //set bit1, bit2 so we can have at most 4 modes.
    result=Array();
    result[0]=bit1;
    result[1]=bit2;
    for(var i=2; i<length; i++){
        result.push((Math.floor(Math.random()*2))?true:false); //obfuscation
    }
    return result;
}

function generate_nopass(imgdatalength,information){
    var info=bitconvert(information);
    if(info.length>imgdatalength-24 || info.length > 4194300*8) {alert('TEXT TOO LONG!'); return null;}
    var result=initialize(imgdatalength,false,false);
    var infolen=info.length;
    var lenarray=numarray(Math.floor(infolen/8));
    var currentloc=-2;
    function hash(){
        if(currentloc+2>=imgdatalength-2) currentloc=-1;
        return currentloc += 2;
    }
    for(var i=0;i<22;i++){
        result[hash()+2]=lenarray[i];
    }
    for(var i=0;i<infolen;i++){
        result[hash()+2]=info[i];
    }
    return result;
}

function generate_pass(imgdatalength,information,pass){
    var info=bitconvert(information);
    if(info.length>imgdatalength-24 || info.length > 4194300 * 8) {alert('TEXT TOO LONG!'); return null;}
    var result=initialize(imgdatalength,true,false);
    var infolen=info.length;
    var lenarray=numarray(Math.floor(infolen/8));
    pass=String(CryptoJS.SHA512(pass));
    var taken=Array();
    var modval=imgdatalength-2;
    for(var i=0;i<22;i++){
        result[gethashval(pass,modval,taken)+2]=lenarray[i];
        pass=String(CryptoJS.SHA512(pass));
    }
    for(var i=0;i<infolen;i++){
        result[gethashval(pass,modval,taken)+2]=info[i];
        pass=String(CryptoJS.SHA512(pass));
    }
    return result;
}

function fftset(imgData,fftdata,width,height,setarray,copy,blocksizepow,lim){
    var fftdatalength=fftdata.length;
    var datalength=setarray.length;
    for(var i=0;i<datalength;i++) for(var j=0;j<copy;j++){
        fftdata[i*copy+j][0]=(setarray[i])?fft_setbit(fftdata[i*copy+j][0],lim):fft_unsetbit(fftdata[i*copy+j][0],lim);
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
                    imgData[((h*blocksize+i)*width+w*blocksize+j)*4+chann]=tmp[i*blocksize+j]
                }
                count++;
            }
    for (var i=0;i<imgData.length;i+=4)
    {
        imgData[i+3]=255;
    }
}