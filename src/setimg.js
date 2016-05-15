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

function generate_pass(imgdatalength,information,pass){
    var info=bitconvert(information);
    if(info.length>imgdatalength-22 || info.length > 4194300 * 8) {alert('TEXT TOO LONG!'); return null;}
    var result=initialize(imgdatalength,true,false);
    var infolen=info.length;
    var lenarray=numarray(Math.floor(infolen/8));
    pass=String(CryptoJS.SHA512(pass));
    var taken=Array();
    var modval=imgdatalength;
    for(var i=0;i<22;i++){
        result[gethashval(pass,modval,taken)]=lenarray[i];
        pass=String(CryptoJS.SHA512(pass));
    }
    for(var i=0;i<infolen;i++){
        result[gethashval(pass,modval,taken)]=info[i];
        pass=String(CryptoJS.SHA512(pass));
    }
    return result;
}

function fftset(imgData,fftdata,width,height,setarray,copy,blocksizepow,lim){
    function norm(a){
        a=Math.round(a);
        a=(a>255)?255:a;
        return (a<0)?0:a;
    }
    var fftdatalength=fftdata.length;
    var datalength=setarray.length;
    for(var i=0;i<datalength;i++) for(var j=0;j<copy;j++){
        fftdata[i*copy+j][0].real=(setarray[i])?fft_setbit(fftdata[i*copy+j][0].real,lim):fft_unsetbit(fftdata[i*copy+j][0].real,lim);
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

function fftset_block(imgData,fftdata,width,height,setarray,copy,blocksizepow,lim){
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
    for(var i=0;i<datalength;i++) for(var j=0;j<copy;j++){
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