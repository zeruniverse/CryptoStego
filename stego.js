// stego.js

import * as ort from './dependencies/onnxruntime-web-1.20.0/ort.webgpu.min.mjs';

let modelBytesEncoderV = null;
let modelBytesDecoderV = null;
let modelBytesEncoderR = null;
let modelBytesDecoderR = null;
let wasmModule = null;

// Define session options globally
const sessionOptions = { executionProviders: ['webgpu', 'wasm'] };

// Initialize Codecs
export async function initCodecs() {
    try {
        // Load the WASM module
        wasmModule = await createWasmModule();

        // Load all model bytes concurrently
        [modelBytesEncoderV, modelBytesDecoderV, modelBytesEncoderR, modelBytesDecoderR] = await Promise.all([
            loadModelBytes('./dependencies/models/visualencoder.onnx'),
            loadModelBytes('./dependencies/models/visualdecoder.onnx'),
            loadModelBytes('./dependencies/models/robustencoder.onnx'),
            loadModelBytes('./dependencies/models/robustdecoder.onnx')
        ]);
    } catch (e) {
        throw new Error('Error loading models or WASM module: ' + e.message);
    }
}

// Check if codecs are ready
export function isCodecsReady() {
    return modelBytesEncoderV !== null &&
           modelBytesDecoderV !== null &&
           modelBytesEncoderR !== null &&
           modelBytesDecoderR !== null &&
           wasmModule !== null;
}

// Load the Emscripten WASM module
async function createWasmModule() {
    try {
        const Module = await import('./dependencies/codecs.js');
        const instance = await Module.default();
        return instance;
    } catch (e) {
        throw new Error('Failed to load WASM module: ' + e.message);
    }
}

// Helper function to load model bytes
async function loadModelBytes(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load model from ${url}: ${response.status} ${response.statusText}`);
        }
        return await response.arrayBuffer();
    } catch (e) {
        throw new Error(`Error fetching model from ${url}: ${e.message}`);
    }
}

// Helper function to run model inference
async function runModel(modelBytes, feeds) {
    let session = null;
    try {
        session = await ort.InferenceSession.create(modelBytes, sessionOptions);
        const results = await session.run(feeds);
        return results;
    } catch (e) {
        throw new Error('Model inference failed: ' + e.message);
    } finally {
        if (session) {
            session.release();
        }
    }
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
                    height = Math.round(height * maxsize / width);
                    width = maxsize;
                } else {
                    width = Math.round(width * maxsize / height);
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
export async function writeMsgToCanvas(canvasid, msg, password = '', model_type = 0, check_valid = true) {
    try {
        if (!isCodecsReady()) {
            throw new Error('Codecs are not ready. Please initialize codecs first.');
        }

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
        if (msg.length < 1) throw new Error('No message to encode');
        let messageBytes = encoder.encode(msg);

        // You may add zlib compression here.

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

        // Select the appropriate model bytes based on model_type
        let modelBytes;
        if (model_type === 0) {
            modelBytes = modelBytesEncoderV;
        } else if (model_type === 1) {
            modelBytes = modelBytesEncoderR;
        } else {
            throw new Error('Invalid model_type. Must be 0 (visual) or 1 (robust).');
        }

        // Run encoder model
        const results = await runModel(modelBytes, feeds);
        const encodedImg = results['encoded_img'].data;

        // Draw encoded image back to canvas
        const outputImageData = ctx.createImageData(width, height);
        outputImageData.data.set(encodedImg);
        ctx.putImageData(outputImageData, 0, 0);

        if (check_valid) {
            // Read the message back to verify
            try {
                const decodedMsg = await readMsgFromCanvas(canvasid, password, model_type);
                if (decodedMsg !== msg) {
                    return false;
                }
            } catch(e) {
                return false; // unable to decode
            }
        }
        return true;
    } catch (e) {
        throw new Error('Error in writeMsgToCanvas: ' + e.message);
    }
}

// Read message from canvas
export async function readMsgFromCanvas(canvasid, password = '', model_type = 0) {
    try {
        if (!isCodecsReady()) {
            throw new Error('Codecs are not ready. Please initialize codecs first.');
        }

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

        // Select the appropriate model bytes based on model_type
        let modelBytes;
        if (model_type === 0) {
            modelBytes = modelBytesDecoderV;
        } else if (model_type === 1) {
            modelBytes = modelBytesDecoderR;
        } else {
            throw new Error('Invalid model_type. Must be 0 (visual) or 1 (robust).');
        }

        // Run decoder model
        const results = await runModel(modelBytes, feeds);
        const dataOutput = results['data'].data; // Assuming 'data' is the output tensor name

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
