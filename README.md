# CryptoStego
JS library for steganography with encryption - Hide text in an image with encryption and obfuscation using neural networks!

## Version
v3.0

## DEMO
[http://stego.js.org](http://stego.js.org)
**Note: Library needs HTML5 support!**

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

Load image from `inputid` (e.g. `input[type=file]`) to `canvasid` (e.g. `<canvas>`) and resize it to `maxsize` (in pixels). If `maxsize` is not specified, it will be the image size. Recommended value is 600.

### async function writeMsgToCanvas(canvasid, msg, password = '', check_valid = true)

Write message `msg` to canvas `canvasid`. `msg` is a string. `password` is a string. If `password` is not specified, the message will be encrypted with password ''. `check_valid` is a boolean. If `check_valid` is true, the function will check if the encoded image can be decoded.

This function returns a boolean of whether the encoded image is valid. If check_valid is set to false, it will always return true.

### async function readMsgFromCanvas(canvasid, password = '')

Read message from canvas `canvasid`. `password` is a string. If `password` is not specified, the message will be decrypted with password ''.

## Compression Robustness for DCT

### Raw image and data

You can download those images and try to decrypt them on [http://stego.js.org](http://stego.js.org). Leave the password cell empty.

### Image before steganography / post-stego (level 0) are same to human eyes (650.1KB in PNG format):

![maple](https://user-images.githubusercontent.com/4648756/87104009-84671b80-c20b-11ea-995b-72bc47d43766.png)

Data:
```
你好，世界！
HELLO WORLD!
¡HOLA MUNDO!
مرحبا بالعالم!
BONJOUR LE MONDE!
こんにちは世界！
ПРИВЕТ МИР!
```

The decryption results should be correct for all levels without compression. Above image is generated using level 0.

### Limit of Level 1 (Compression Ratio 15.8% - 102.6KB)

![maple](https://user-images.githubusercontent.com/4648756/87104394-a01ef180-c20c-11ea-9df8-0e06d805e71e.jpg)

Level 1-5 should all work at or above this compression ratio. Above image is generated using level 1 (very similar to original)

### Limit of Level 2 (Compression Ratio 11% - 71.6KB)

![maple](https://user-images.githubusercontent.com/4648756/87104741-b1b4c900-c20d-11ea-8389-052b59157139.jpg)

Level 2-5 should all work at or above this compression ratio. Above image is generated using level 2 (very similar to original with noticeable distortion)

### Limit of Level 3 (Compression Ratio 8.8% - 57.3KB)

![maple](https://user-images.githubusercontent.com/4648756/87105103-df4e4200-c20e-11ea-9eef-2533101cb461.jpg)

Level 3-5 should all work at or above this compression ratio. Above image is generated using level 3

**Level 3 should be safe for most compressions by social apps (reduced size image), including Messengers, WeChat etc.**

### Limit of Level 4 (Compression Ratio 5.4% - 35.0KB)

![maple](https://user-images.githubusercontent.com/4648756/87105846-e5ddb900-c210-11ea-9d06-b302b8d6af90.jpg)

Level 4-5 should all work at or above this compression ratio. Above image is generated using level 4

### Limit of Level 5 (Compression Ratio 2.7% - 17.7KB)

![maple](https://user-images.githubusercontent.com/4648756/87106397-3acdff00-c212-11ea-9c53-4eb39d28dba8.jpg)

Level 5 should work at or above this compression ratio. Above image is generated using level 5.

### Partial Decryption of level 5  (Compression Ratio 1.4% - 9.4KB)

![maple](https://user-images.githubusercontent.com/4648756/87106643-c34c9f80-c212-11ea-9f9f-e8c74bf79a0f.jpg)

At compression ratio 1.4% (< 10KB), the level 5 steganography (above image) still recovers most of the data

```
你好，世界Ａ
HELLO WOZLD!
¡HOLA MUNDO!
مرحبا بالعدلم!
BONJOUR LE OONDE!
こんにちね世畍！
ПРP鐒ѕЦ ИИР!
```

## Coding Example

Refer to `example/` folder.

## Copyright
Jeffery Zhao

License: GNU **A**GPL v3.0 or later
