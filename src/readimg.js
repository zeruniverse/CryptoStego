function cbit(a,lim){
    return (Math.round(a/lim)%2==1)?true:false;
}
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

function extractMsgArray_pass(bitarray,pass,copy)
{
    function comb(a){
        var len=a.length;
        var count=0
        for(var i=0;i<len;i++) if(a[i]) count++;
        if(count>=(len/2)) return true; else return false;
    }
    var imgdatalength = bitarray.length;
    pass=String(CryptoJS.SHA512(pass));
    taken=Array();
    var modval=imgdatalength;
    var msgarray=Array();
    var data;
    var msgarraylen=Math.floor(Math.floor(imgdatalength/copy)/8);
    for(var i=0; i<msgarraylen; i++){
        data = 0;
        tmp=128;
        for(var j=0; j<8; j++){
            var tmpArray=Array();
            for(var k=0; k<copy;k++)
            {
                tmpArray.push(bitarray[gethashval(pass,modval,taken)]);
                pass=String(CryptoJS.SHA512(pass));
            }
            data += ((comb(tmpArray))?1:0)*tmp;
            tmp = Math.floor(tmp/2);
        }
        if(data == 255) break; //END NOTATION
        msgarray.push(data);
    }
    
    return msgarray;
}

function extractBitArrayFFT(fftdata,lim)
{
    var result=Array();
    var fftdatalength=fftdata.length;
    for(var i=0;i<fftdatalength;i++){
        result.push(cbit(fftdata[i][0].real,lim));
    }
    return result;
}

function extractBitArray_AVG(SUMdata,blocksizepow,lim)
{
    var blocksize= 1 << blocksizepow;
    var result=Array();
    var resultlength=SUMdata.length;
    for(var i=0;i<resultlength;i++){
        result.push(cbit(SUMdata[i],lim)); 
    }
    return result;
}

function extractBitArrayFFT_block(fftdata,blocksizepow,lim)
{
    var blocksize= 1 << blocksizepow;
    var result=Array();
    var fftdatalength=fftdata.length * 2;
    var resultlength=fftdatalength;
    for(var i=0;i<resultlength;i++){
        var matrixloc = i % 2;
        var arrayloc = Math.floor(i / 2);
        var matrixrow = Math.floor(matrixloc / 2);
        var matrixcol = matrixloc % 2;
        if(matrixrow==0&&matrixcol==0) {matrixrow=1;matrixcol=0;}
        result.push(cbit(Math.sqrt(Math.pow(fftdata[arrayloc][matrixrow*blocksize+matrixcol].real,2)+Math.pow(fftdata[arrayloc][matrixrow*blocksize+matrixcol].imag,2)),lim));
    }
    return result;
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas_single(canvasid,pass,fft,copy,blocksizepow,lim){
    fft=(fft === undefined)?false:fft;
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    blocksizepow=(blocksizepow=== undefined)?2:blocksizepow;
    lim=(lim=== undefined)?80:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var fftdata=(fft)?fftconvert(imgData.data,c.width,c.height,blocksizepow):null;
    var bitarray = (fft)?extractBitArrayFFT(fftdata,lim):extractBitArray(imgData);
    var msgArray=(fft)?extractMsgArray_pass(bitarray,pass,copy):extractMsgArray_pass(bitarray,pass,1);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas_block(canvasid,pass,copy,blocksizepow,lim){
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    blocksizepow=(blocksizepow=== undefined)?3:blocksizepow;
    blocksizepow=(blocksizepow<3)?3:blocksizepow;
    lim=(lim=== undefined)?1:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var fftdata=fftconvert(imgData.data,c.width,c.height,blocksizepow);
    var bitarray = extractBitArrayFFT_block(fftdata,blocksizepow,lim);
    //if (bitarray[1]) return null;
    var msgArray=extractMsgArray_pass(bitarray,pass,copy);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}

function readMsgFromCanvas_AVG(canvasid,pass,copy,blocksizepow,lim){
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    blocksizepow=(blocksizepow=== undefined)?3:blocksizepow;
    blocksizepow=(blocksizepow<3)?3:blocksizepow;
    lim=(lim=== undefined)?1:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var SUMdata=fastSUM(imgData.data,c.width,c.height,blocksizepow);
    var bitarray = extractBitArray_AVG(SUMdata,blocksizepow,lim);
    //if (bitarray[1]) return null;
    var msgArray=extractMsgArray_pass(bitarray,pass,copy);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}