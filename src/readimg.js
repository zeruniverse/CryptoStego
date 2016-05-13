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
    var modval=imgdatalength-2;
    var lenarray=Array();
    for(var i=0;i<22;i++){
        lenarray[i] = (bitarray[gethashval(pass,modval,taken)+2])?1:0;
        pass=String(CryptoJS.SHA512(pass));
    }
    var tmp=1;
    var msgarraylen=0;
    for(var i=21; i>=0; i--){
        msgarraylen+=lenarray[i]*tmp;
        tmp = tmp*2;
    }
    if(msgarraylen*8>imgdatalength-24) return null;
    var msgarray=Array();
    var data;
    for(var i=0; i<msgarraylen; i++){
        data = 0;
        tmp=128;
        for(var j=0; j<8; j++){
            data += ((bitarray[gethashval(pass,modval,taken)+2])?1:0)*tmp;
            tmp = Math.floor(tmp/2);
            pass=String(CryptoJS.SHA512(pass));
        }
        msgarray.push(data);
    }
    
    return msgarray;
}
function extractMsgArray_nopass(bitarray)
{
    var currentloc=-2;
    var imgdatalength = bitarray.length;
    function hash(){
        if(currentloc+2>=imgdatalength-2) currentloc=-1;
        return currentloc += 2;
    }
    var lenarray=Array();
    for(var i=0;i<22;i++){
        lenarray[i] = (bitarray[hash()+2])?1:0;
    }
    var tmp=1;
    var msgarraylen=0;
    for(var i=21; i>=0; i--){
        msgarraylen+=lenarray[i]*tmp;
        tmp = tmp*2;
    }
    if(msgarraylen*8>imgdatalength-24) return null;
    var msgarray=Array();
    var data;
    for(var i=0; i<msgarraylen; i++){
        data = 0;
        tmp=128;
        for(var j=0; j<8; j++){
            data += ((bitarray[hash()+2])?1:0)*tmp;
            tmp = Math.floor(tmp/2);
        }
        msgarray.push(data);
    }
    return msgarray;
}