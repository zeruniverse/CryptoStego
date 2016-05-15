function extractBitArray(imgData){
    var result=Array();
    for (var i=0;i<imgData.data.length;i+=4)
    {
        result.push((imgData.data[i]%2==1)?true:false);
        result.push((imgData.data[i+1]%2==1)?true:false);
        result.push((imgData.data[i+2]%2==1)?true:false);
    }
    return result;
}

function extractMsgArray_pass(bitarray,pass)
{
    var imgdatalength = bitarray.length;
    pass=String(CryptoJS.SHA512(pass));
    taken=Array();
    var modval=imgdatalength;
    var lenarray=Array();
    for(var i=0;i<22;i++){
        lenarray[i] = (bitarray[gethashval(pass,modval,taken)])?1:0;
        pass=String(CryptoJS.SHA512(pass));
    }
    var tmp=1;
    var msgarraylen=0;
    for(var i=21; i>=0; i--){
        msgarraylen+=lenarray[i]*tmp;
        tmp = tmp*2;
    }
    if(msgarraylen*8>imgdatalength-22) return null;
    var msgarray=Array();
    var data;
    for(var i=0; i<msgarraylen; i++){
        data = 0;
        tmp=128;
        for(var j=0; j<8; j++){
            data += ((bitarray[gethashval(pass,modval,taken)])?1:0)*tmp;
            tmp = Math.floor(tmp/2);
            pass=String(CryptoJS.SHA512(pass));
        }
        msgarray.push(data);
    }
    
    return msgarray;
}

function extractBitArrayFFT(fftdata,copy,lim)
{
    function cbit(a,lim){
        return (Math.round(a/lim)%2==1)?true:false;
    }
    function comb(a){
        var len=a.length;
        var count=0
        for(var i=0;i<len;i++) if(a[i]) count++;
        if(count>=(len/2)) return true; else return false;
    }
    var result=Array();
    var fftdatalength=fftdata.length;
    var resultlength=Math.floor(fftdatalength/copy);
    for(var i=0;i<resultlength;i++){
        var tmp=Array();
        for(var j=0;j<copy;j++){
            tmp.push(cbit(fftdata[i*copy+j][0].real,lim));
        }
        result.push(comb(tmp));
    }
    return result;
}

function extractBitArrayFFT_block(fftdata,copy,blocksizepow,lim)
{
    function cbit(a,lim){
        return (Math.round(a/lim)%2==1)?true:false;
    }
    function comb(a){
        var len=a.length;
        var count=0
        for(var i=0;i<len;i++) if(a[i]) count++;
        if(count>=(len/2)) return true; else return false;
    }
    var blocksize= 1 << blocksizepow;
    var result=Array();
    var fftdatalength=fftdata.length * 2;
    var resultlength=Math.floor(fftdatalength/copy);
    var count = 0;
    for(var i=0;i<resultlength;i++){
        var tmp=Array();
        for(var j=0;j<copy;j++){
            //read data from top-left 2*2 block of each FFT matrix. Drop [0] [1,1]
            var matrixloc = count % 2;
            var arrayloc = Math.floor(count / 2);
            var matrixrow = Math.floor(matrixloc / 2);
            var matrixcol = matrixloc % 2;
            if(matrixrow==0&&matrixcol==0) {matrixrow=1;matrixcol=0;}
            tmp.push(cbit(Math.sqrt(Math.pow(fftdata[arrayloc][matrixrow*blocksize+matrixcol].real,2)+Math.pow(fftdata[arrayloc][matrixrow*blocksize+matrixcol].imag,2)),lim));
            //tmp.push(cbit(fftdata[arrayloc][matrixrow*blocksize+matrixcol].real,lim));
            
            count++;
        }
        result.push(comb(tmp));
    }
    return result;
}