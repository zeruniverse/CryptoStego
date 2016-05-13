//Write msg to the image in canvasid.
//Return: null - fail. 1 - successful
function writemsg(canvasid,msg,pass=''){
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var setarray = (pass=='')?generate_nopass(Math.floor(imgData.data.length/4)*3,msg):generate_pass(Math.floor(imgData.data.length/4)*3,msg,pass);
    if(setarray==null) return null;
    setimgdata(imgData,setarray);
    ctx.putImageData(imgData,0,0);
    return 1;
}

//Read msg from the image in canvasid.
//Return msg (null -> fail)
function readmsg(canvasid,pass){
    var c=document.getElementById(canvasid);
    var ctx=c.getContext("2d");
    var imgData=ctx.getImageData(0,0,c.width,c.height);
    var bitarray = extractBitArray(imgData);
    if (bitarray[1]) return null;
    var msgArray=(bitarray[0])?extractMsgArray_pass(bitarray,pass):extractMsgArray_nopass(bitarray);
    if(msgArray==null) return null;
    return utf8Decode(msgArray);
}