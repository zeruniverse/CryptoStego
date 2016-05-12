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
function initialize(length,bit1,bit2){
    result=Array();
    result[0]=bit1;
    result[1]=bit2;
    for(var i=2; i<length; i++){
        result.push((Math.floor(Math.random()*2))?true:false); //obfuscation
    }
    return result;
}
function numarray(num){
    var result=Array();
    for(var j=2097152; j>0; j=Math.floor(j/2))
    {
        if(Math.floor(num/j))
        {
            result.push(true);
            num = num%j;
        }else result.push(false);
    }
    return result;
}
function generate_nopass(imgdatalength,information){
    var info=bitconvert(information);
    if(info.length>imgdatalength-24 || info.length > 4194300*8) {alert('TEXT TOO LONG!'); return null;}
    var result=initialize(imgdatalength,false,false);
    var infolen=info.length;
    var lenarray=numarray(Math.floor(infolen/8));
    for(var i=0;i<22;i++){
        result[i+2]=lenarray[i];
    }
    for(var i=0;i<infolen;i++){
        result[i+24]=info[i];
    }
    return result;
}
function isInclude(arr,obj) {
    return (arr.indexOf(obj) != -1);
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
    a=0
    for(var i=100;i<110;i++) a+=str.charCodeAt(i);
    result += a * 419;
    for(var i=20;i<29;i++) result+=str.charCodeAt(i);
    for(var i=90;i<99;i++) result+=str.charCodeAt(i);
    result = result % modval;
    while(isInclude(taken,result)) result = (result+1)%modval;
    taken.push(result);
    return result;
}
function generate_pass(imgdatalength,information,pass){
    var info=bitconvert(information);
    if(info.length>imgdatalength-24 || info.length > 4194300 * 8) {alert('TEXT TOO LONG!'); return null;}
    var result=initialize(imgdatalength,true,false);
    var infolen=info.length;
    var lenarray=numarray(Math.floor(infolen/8));
    pass=String(CryptoJS.SHA512(pass));
    taken=Array();
    modval=imgdatalength-2;
    for(var i=0;i<22;i++){
        result[gethashval(pass,modval,taken)+2]=lenarray[i];
        pass=String(CryptoJS.SHA512(pass));
    }
    for(var i=0;i<infolen;i++){
        result[gethashval(pass,modval,taken)+24]=info[i];
        pass=String(CryptoJS.SHA512(pass));
    }
    return result;
}