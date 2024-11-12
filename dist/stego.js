// stego.js

import * as ort from './dependencies/onnxruntime-web-1.20.0/ort.webgpu.min.mjs';

let encoderSession = null;
let decoderSession = null;
let wasmModule = null;

// Initialize Codecs
export async function initCodecs() {
    // Initialize ONNX Runtime with WebGPU provider if available
    const sessionOptions = { executionProviders: ['webgpu', 'wasm'] };

    // Load models
    try {
        wasmModule = await createWasmModule();
        encoderSession = await ort.InferenceSession.create('./dependencies/models/encoder.onnx', sessionOptions);
        decoderSession = await ort.InferenceSession.create('./dependencies/models/decoder.onnx', sessionOptions);
    } catch (e) {
        throw new Error('Error loading models or WASM module: ' + e.message);
    }
}

// Check if codecs are ready
export function isCodecsReady() {
    return encoderSession !== null && decoderSession !== null && wasmModule !== null;
}

// Load the Emscripten WASM module
async function createWasmModule() {
    const Module = await import('./dependencies/codecs.js');
    const instance = await Module.default();
    return instance;
}


// Load image to canvas
export async function loadIMGtoCanvas(inputid, canvasid, maxsize = 0) {
    return new Promise((resolve, reject) => {
        const inputElement = document.getElementById(inputid);
        if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
            reject(new Error('No file selected'));
            return;
        }

        const file = inputElement.files[0];
        const img = new Image();
        img.onload = function() {
            let canvas = document.getElementById(canvasid);
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.id = canvasid;
                document.body.appendChild(canvas);
            }
            let ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            if (maxsize > 0 && (width > maxsize || height > maxsize)) {
                if (width > height) {
                    height = height * maxsize / width;
                    width = maxsize;
                } else {
                    width = width * maxsize / height;
                    height = maxsize;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            resolve();
        };
        img.onerror = function() {
            reject(new Error('Error loading image'));
        };
        const reader = new FileReader();
        reader.onload = function(event) {
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// Write message to canvas
export async function writeMsgToCanvas(canvasid, msg, password = '', check_valid = true) {
    try {
        const canvas = document.getElementById(canvasid);
        if (!canvas) {
            throw new Error('Canvas not found');
        }
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const imageDataArray = new Uint8Array(imageData.data.buffer);

        // Encode message to bytes
        const encoder = new TextEncoder();
        if(msg.length < 1) throw new Error('No message to encode');
        let messageBytes = encoder.encode(msg);

        // Use the WASM module to encode message bytes to bits
        const data_bits = wasmModule.encodeToBits(messageBytes, password);
        if (data_bits === null || data_bits.byteLength === 0) {
            throw new Error('Encoding failed');
        }

        // Prepare inputs for encoder model
        const feeds = {
            'img': new ort.Tensor('uint8', imageDataArray, [imageDataArray.length]),
            'img_h': new ort.Tensor('int64', BigInt64Array.from([BigInt(height)]), [1]),
            'data': new ort.Tensor('uint8', data_bits, [65536]),
        };

        // Run encoder model
        const results = await encoderSession.run(feeds);
        const encodedImg = results['encoded_img'].data;

        // Draw encoded image back to canvas
        const outputImageData = ctx.createImageData(width, height);
        outputImageData.data.set(encodedImg);
        ctx.putImageData(outputImageData, 0, 0);

        if (check_valid) {
            // Read the message back to verify
            const decodedMsg = await readMsgFromCanvas(canvasid, password);
            if (decodedMsg !== msg) {
                return false;
            }
        }

        return true;
    } catch (e) {
        throw new Error('Error in writeMsgToCanvas: ' + e.message);
    }
}

// Read message from canvas
export async function readMsgFromCanvas(canvasid, password = '') {
    try {
        const canvas = document.getElementById(canvasid);
        if (!canvas) {
            throw new Error('Canvas not found');
        }
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Get image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const imageDataArray = new Uint8Array(imageData.data.buffer);

        // Prepare inputs for decoder model
        const feeds = {
            'img': new ort.Tensor('uint8', imageDataArray, [imageDataArray.length]),
            'img_h': new ort.Tensor('int64', BigInt64Array.from([BigInt(height)]), [1]),
        };

        // Run decoder model
        const results = await decoderSession.run(feeds);
        const dataOutput = results['data'].data; // Float32Array of length 65536

        // Use the WASM module to decode dataOutput to bytes
        const decodedBytes = wasmModule.decodeToBytes(dataOutput, password);
        if (decodedBytes === null || decodedBytes.byteLength === 0) {
            throw new Error('Decoding failed');
        }

        // Decode bytes to string
        const decoder = new TextDecoder();
        const message = decoder.decode(decodedBytes);

        if (!message || message.length === 0) {
            throw new Error('Decoded message is empty');
        }

        return message;
    } catch (e) {
        throw new Error('Error in readMsgFromCanvas: ' + e.message);
    }
}
