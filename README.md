# CryptoStego
JS library for steganography with encryption - Hide text in an image with encryption and obfuscation using neural networks!

**Note: If you want to use LSB mode (almost equal to original image, but is not robust to any distortion / compression) or DCT mode (rule-based algorithm that has robustness towards some image distortions / compressions), use [v1.8](https://github.com/zeruniverse/CryptoStego/tree/v1.8)**

## Version
v3.0

## DEMO
[http://stego.js.org](http://stego.js.org)
**Note: Library needs HTML5 support!**

### Test image
![image](https://github.com/user-attachments/assets/f11abf40-9163-49c1-8d0e-ece5c9d4e5ae)

### Test data
```
你好，世界！
HELLO WORLD!
¡HOLA MUNDO!
مرحبا بالعالم!
BONJOUR LE MONDE!
こんにちは世界！
ПРИВЕТ МИР!
```

## How to use
Download [cryptostego.zip](https://github.com/zeruniverse/CryptoStego/releases/latest/download/cryptostego.zip)
**Note: This JS library needs HTML5 support!**

put `stego.js` at same level of your `index.html` (together with `dependencies` folder) and import it in your HTML. If your file structure is different, you might need to modify `stego.js`

```html
<script type="module" src="stego.js"></script>
```

## Features
+ new in 3.0: robust to image resize (upsampling, downsampling), translation, jittering, rotation etc.
+ robust to compression (JPEG, PNG, GIF).
+ new in 3.0: encoded image is visually equivalent to original image.


## Usage

This library provides 5 wrapper functions. Use `<script src="cryptostego.min.js"></script>` in your HTML to include this library.

### async function initCodecs()

Call this before any other functions.

### function isCodecsReady()

Tells if encoder / decoder is ready. If you initialized `initCodecs` but didn't wait for it, you may want to use this function.

### async function loadIMGtoCanvas(inputid, canvasid, maxsize = 0)

Load image from `inputid` (e.g. `input[type=file]`) to `canvasid` (e.g. `<canvas>`) and resize it to `maxsize` (in pixels). If `maxsize` is not specified, it will be the image size. Recommended value is 600. **The image should be at least 300 * 300 to be encoded properly.**

### async function writeMsgToCanvas(canvasid, msg, password = '', check_valid = true)

Write message `msg` to canvas `canvasid`. `msg` is a string. `password` is a string. If `password` is not specified, the message will be encrypted with password ''. `check_valid` is a boolean. If `check_valid` is true, the function will check if the encoded image can be decoded.

This function returns a boolean of whether the encoded image is valid. If check_valid is set to false, it will always return true.

### async function readMsgFromCanvas(canvasid, password = '')

Read message from canvas `canvasid`. `password` is a string. If `password` is not specified, the message will be decrypted with password ''.

## Minimum Coding Example

Refer to `example/` folder.

## Copyright
Jeffery Zhao

License: GNU **A**GPL v3.0 or later
