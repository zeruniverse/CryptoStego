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
        var count=0;
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

function extractBitArraydct(dctdata,lim)
{
    var result=Array();
    var dctdatalength=dctdata.length;
    for(var i=0;i<dctdatalength;i++){
        result.push(cbit(dctdata[i][0][0],lim));
		result.push(cbit(dctdata[i][0][1],lim));
		result.push(cbit(dctdata[i][0][2],lim));
    }
    return result;
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readMsgFromCanvas_single(canvasid,pass,dct,copy,lim){
    dct=(dct === undefined)?false:dct;
    pass=(pass=== undefined)?'':pass;
    copy=(copy=== undefined)?5:copy;
    lim=(lim=== undefined)?30:lim;
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var dctdata=(dct)?dctconvert(imgData.data,c.width,c.height):null;
    var bitarray = (dct)?extractBitArraydct(dctdata,lim):extractBitArray(imgData);
    var msgArray=(dct)?extractMsgArray_pass(bitarray,pass,copy):extractMsgArray_pass(bitarray,pass,1);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}