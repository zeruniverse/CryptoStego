function unsetbit(k){
    return (k%2==1)?k-1:k;
}

function setbit(k){
    return (k%2==1)?k:k+1;
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