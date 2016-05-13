#CryptoStego  
JS library for steganography with encryption - Hide text in an image with encryption and obfuscation.    
##Usage  
###loadIMGtoCanvas(inputid, canvasid, callback)  
load an image from HTML5 file input to a canvas (this function creates the canvas, you only need to specify the canvas id)  
###writeMsgToCanvas(canvasid,msg,pass='')  
Write `msg` to the image in `canvas` specified by `canvasid`. Optionally, specify a `pass` for password.  
###readMsgFromCanvas(canvasid,pass)  
Read `msg` from the image in `canvas` specified by `canvasid`. You need to specify a `pass` for password. Set `pass` to be `''` if there's no password.  