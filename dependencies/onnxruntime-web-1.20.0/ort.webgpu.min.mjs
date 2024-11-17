/*!
 * ONNX Runtime Web v1.20.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var hn=Object.defineProperty;var gu=Object.getOwnPropertyDescriptor;var yu=Object.getOwnPropertyNames;var bu=Object.prototype.hasOwnProperty;var gn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var k=(e,t)=>()=>(e&&(t=e(e=0)),t);var bt=(e,t)=>{for(var n in t)hn(e,n,{get:t[n],enumerable:!0})},wu=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of yu(t))!bu.call(e,o)&&o!==n&&hn(e,o,{get:()=>t[o],enumerable:!(r=gu(t,o))||r.enumerable});return e};var yn=e=>wu(hn({},"__esModule",{value:!0}),e);var wt,We,Ge,_u,_t,$t=k(()=>{"use strict";wt=new Map,We=[],Ge=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=wt.get(e);if(r===void 0)wt.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let o=We.indexOf(e);o!==-1&&We.splice(o,1);for(let i=0;i<We.length;i++)if(wt.get(We[i]).priority<=n){We.splice(i,0,e);return}We.push(e)}return}throw new TypeError("not a valid backend")},_u=async e=>{let t=wt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},_t=async e=>{let t=e.executionProviders||[],n=t.map(u=>typeof u=="string"?u:u.name),r=n.length===0?We:n,o,i=[],s=new Set;for(let u of r){let d=await _u(u);typeof d=="string"?i.push({name:u,err:d}):(o||(o=d),o===d&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let a=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(e,{get:(u,d)=>d==="executionProviders"?a:Reflect.get(u,d)})]}});var dr=k(()=>{"use strict";$t()});var lr,cr=k(()=>{"use strict";lr="1.20.0"});var pr,we,bn=k(()=>{"use strict";cr();pr="warning",we={wasm:{},webgl:{},webgpu:{},versions:{common:lr},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);pr=e}},get logLevel(){return pr}};Object.defineProperty(we,"logLevel",{enumerable:!0})});var ee,mr=k(()=>{"use strict";bn();ee=we});var fr,hr,gr=k(()=>{"use strict";fr=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",a=t?.norm,u,d;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?d=[0,0,0,0]:typeof a.bias=="number"?d=[a.bias,a.bias,a.bias,a.bias]:(d=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(d[3]=a.bias[3]));let l=i*o,c=0,p=l,h=l*2,m=-1;s==="RGBA"?(c=0,p=l,h=l*2,m=l*3):s==="RGB"?(c=0,p=l,h=l*2):s==="RBG"&&(c=0,h=l,p=l*2);for(let f=0;f<i;f++)for(let w=0;w<o;w++){let y=(e.data[c++]-d[0])*u[0],g=(e.data[p++]-d[1])*u[1],b=(e.data[h++]-d[2])*u[2],_=m===-1?255:(e.data[m++]-d[3])*u[3];r.fillStyle="rgba("+y+","+g+","+b+","+_+")",r.fillRect(w,f,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},hr=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let o,i,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],s=e.dims[3]):(o=e.dims[3],i=e.dims[2],s=e.dims[1]);let a=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,d,l;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?l=[0,0,0,0]:typeof u.bias=="number"?l=[u.bias,u.bias,u.bias,u.bias]:(l=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(l[3]=u.bias[3]));let c=i*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,h=0,m=1,f=2,w=3,y=0,g=c,b=c*2,_=-1;a==="RGBA"?(y=0,g=c,b=c*2,_=c*3):a==="RGB"?(y=0,g=c,b=c*2):a==="RBG"&&(y=0,b=c,g=c*2),r=n.createImageData(o,i);for(let $=0;$<i*o;h+=p,m+=p,f+=p,w+=p,$++)r.data[h]=(e.data[y++]-l[0])*d[0],r.data[m]=(e.data[g++]-l[1])*d[1],r.data[f]=(e.data[b++]-l[2])*d[2],r.data[w]=_===-1?255:(e.data[_++]-l[3])*d[3]}else throw new Error("Can not access image data");return r}});var wn,yr,br,wr,_r,$r,vr=k(()=>{"use strict";vt();wn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,o=t.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=n*r,l=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),c=4,p=0,h=1,m=2,f=3,w=0,y=d,g=d*2,b=-1;a==="RGB"&&(c=3,p=0,h=1,m=2,f=-1),u==="RGBA"?b=d*3:u==="RBG"?(w=0,g=d,y=d*2):u==="BGR"&&(g=0,y=d,w=d*2);for(let $=0;$<d;$++,p+=c,m+=c,h+=c,f+=c)l[w++]=(e[p]+s[0])/i[0],l[y++]=(e[h]+s[1])/i[1],l[g++]=(e[m]+s[2])/i[2],b!==-1&&f!==-1&&(l[b++]=(e[f]+s[3])/i[3]);return u==="RGBA"?new pe("float32",l,[1,4,n,r]):new pe("float32",l,[1,3,n,r])},yr=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",s,a=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=l=>typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||l instanceof OffscreenCanvas?l.getContext("2d"):null;if(n){let l=u();l.width=e.width,l.height=e.height;let c=d(l);if(c!=null){let p=e.height,h=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,h=t.resizedWidth),t!==void 0){if(a=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=p,a.width=h}else a.tensorFormat="RGBA",a.height=p,a.width=h;c.drawImage(e,0,0),s=c.getImageData(0,0,h,p).data}else throw new Error("Can not access image data")}else if(r){let l,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(l=t.resizedHeight,c=t.resizedWidth):(l=e.height,c=e.width),t!==void 0&&(a=t),a.format="RGBA",a.height=l,a.width=c,t!==void 0){let p=u();p.width=c,p.height=l;let h=d(p);if(h!=null)h.putImageData(e,0,0),s=h.getImageData(0,0,c,l).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let l=u();l.width=e.width,l.height=e.height;let c=d(l);if(c!=null){let p=e.height,h=e.width;return c.drawImage(e,0,0,h,p),s=c.getImageData(0,0,h,p).data,a.height=p,a.width=h,wn(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((l,c)=>{let p=u(),h=d(p);if(!e||!h)return c();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{p.width=m.width,p.height=m.height,h.drawImage(m,0,0,p.width,p.height);let f=h.getImageData(0,0,p.width,p.height);a.height=p.height,a.width=p.width,l(wn(f.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return wn(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},br=(e,t)=>{let{width:n,height:r,download:o,dispose:i}=t,s=[1,r,n,4];return new pe({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:i})},wr=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:i}=t;return new pe({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:o,dispose:i})},_r=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:i}=t;return new pe({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:o,dispose:i})},$r=(e,t,n)=>new pe({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})});var He,nt,xr,Sr,Ir=k(()=>{"use strict";He=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),nt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),xr=!1,Sr=()=>{if(!xr){xr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=typeof Float16Array<"u"&&Float16Array.from;e&&(He.set("int64",BigInt64Array),nt.set(BigInt64Array,"int64")),t&&(He.set("uint64",BigUint64Array),nt.set(BigUint64Array,"uint64")),n?(He.set("float16",Float16Array),nt.set(Float16Array,"float16")):He.set("float16",Uint16Array)}}});var Tr,Cr,Ar=k(()=>{"use strict";vt();Tr=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},Cr=(e,t)=>{switch(e.location){case"cpu":return new pe(e.type,e.data,t);case"cpu-pinned":return new pe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new pe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new pe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new pe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var pe,vt=k(()=>{"use strict";gr();vr();Ir();Ar();pe=class{constructor(t,n,r){Sr();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let a=He.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof t=="string")if(o=t,u=r,t==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");a=n}else{let d=He.get(t);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(n)){if(t==="float16"&&d===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${d.name} as data.`);t==="uint64"||t==="int64"?a=d.from(n,BigInt):a=d.from(n)}else if(n instanceof d)a=n;else if(n instanceof Uint8ClampedArray)if(t==="uint8")a=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${d}`)}else if(u=n,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof t[0];if(d==="string")o="string",a=t;else if(d==="boolean")o="bool",a=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(t);else{let d=nt.get(t.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=d,a=t}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=Tr(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(t,n){return yr(t,n)}static fromTexture(t,n){return br(t,n)}static fromGpuBuffer(t,n){return wr(t,n)}static fromMLTensor(t,n){return _r(t,n)}static fromPinnedBuffer(t,n,r){return $r(t,n,r)}toDataURL(t){return fr(this,t)}toImageData(t){return hr(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,t&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Cr(this,t)}}});var me,xt=k(()=>{"use strict";vt();me=pe});var St,kr,_e,ye,_n=k(()=>{"use strict";bn();St=(e,t)=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||console.timeStamp(`${e}::ORT::${t}`)},kr=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let o=0;o<n.length;o++){if(r&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),St("CPU",i);return}n[o].includes("TRACE_FUNC")&&(r=!0)}},_e=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||kr("BEGIN",e)},ye=e=>{(typeof we.trace>"u"?!we.wasm.trace:!we.trace)||kr("END",e)}});var It,Er=k(()=>{"use strict";$t();xt();_n();It=class e{constructor(t){this.handler=t}async run(t,n,r){_e();let o={},i={};if(typeof t!="object"||t===null||t instanceof me||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof me)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of n){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);o[d]=null}if(typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,l=Object.getOwnPropertyNames(n);for(let c of this.outputNames)if(l.indexOf(c)!==-1){let p=n[c];(p===null||p instanceof me)&&(d=!0,s=!1,o[c]=p)}if(d){if(typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)o[d]=null;let a=await this.handler.run(t,o,i),u={};for(let d in a)if(Object.hasOwnProperty.call(a,d)){let l=a[d];l instanceof me?u[d]=l:u[d]=new me(l.type,l.data,l.dims)}return ye(),u}async release(){return this.handler.dispose()}static async create(t,n,r,o){_e();let i,s={};if(typeof t=="string"){if(i=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let l=t,c=0,p=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(c=n,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=l.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${l.byteLength}).`);if(p=t.byteLength-c,typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>l.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${l.byteLength-c}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(l,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await _t(s),d=await a.createInferenceSessionHandler(i,u);return ye(),new e(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var $u,Pr=k(()=>{"use strict";Er();$u=It});var zr=k(()=>{"use strict"});var Br=k(()=>{"use strict"});var Dr=k(()=>{"use strict"});var Or=k(()=>{"use strict"});var vu,Tt,Rr=k(()=>{"use strict";$t();xt();vu="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Tt=class e{constructor(t,n,r){this.handler=t,this.hasOptimizerModel=n,this.hasEvalModel=r}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,n){let r=t.evalModel||"",o=t.optimizerModel||"",i=n||{},[s,a]=await _t(i);if(s.createTrainingSessionHandler){let u=await s.createTrainingSessionHandler(t.checkpointState,t.trainModel,r,o,a);return new e(u,!!t.optimizerModel,!!t.evalModel)}else throw new Error(vu)}typeNarrowingForRunStep(t,n,r,o,i){let s={},a={};if(typeof r!="object"||r===null||r instanceof me||Array.isArray(r))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof me)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let d of o){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(n.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);s[d]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,l=Object.getOwnPropertyNames(o);for(let c of n)if(l.indexOf(c)!==-1){let p=o[c];(p===null||p instanceof me)&&(d=!0,u=!1,s[c]=p)}if(d){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of t)if(typeof r[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(u)for(let d of n)s[d]=null;return[s,a]}convertHandlerReturnTypeToMapOfTensors(t){let n={};for(let r in t)if(Object.hasOwnProperty.call(t,r)){let o=t[r];o instanceof me?n[r]=o:n[r]=new me(o.type,o.data,o.dims)}return n}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,n,r){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,n,r),s=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,n,r){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,n,r),s=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,n=!0){let r=await this.getParametersSize(n);if(t.length!==4*r)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,n)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var xu,Mr=k(()=>{"use strict";Rr();xu=Tt});var $n={};bt($n,{InferenceSession:()=>$u,TRACE:()=>St,TRACE_FUNC_BEGIN:()=>_e,TRACE_FUNC_END:()=>ye,Tensor:()=>me,TrainingSession:()=>xu,env:()=>ee,registerBackend:()=>Ge});var Se=k(()=>{"use strict";dr();mr();Pr();xt();zr();Br();_n();Dr();Or();Mr()});var Ct=k(()=>{"use strict"});var Nr={};bt(Nr,{default:()=>Su});var Vr,Lr,Su,Wr=k(()=>{"use strict";vn();Le();rt();Vr="ort-wasm-proxy-worker",Lr=globalThis.self?.name===Vr;Lr&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":At(n.wasm).then(()=>{kt(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:o}=n;Et(o,r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:r}=n,o=ot(r);postMessage({type:t,out:o});break}case"create":{let{model:r,options:o}=n;Pt(r,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":zt(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:o,inputs:i,outputIndices:s,options:a}=n;Bt(r,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},Ot([...i,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":Dt(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}});Su=Lr?null:e=>new Worker(e??Ie,{type:"module",name:Vr})});var Ie,Iu,Hr,Tu,Cu,qr,Au,Gr,Fr,Kr,rt=k(()=>{"use strict";Ct();Ie=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Iu=!1||typeof location>"u"?void 0:location.origin,Hr=(e,t)=>{try{let n=t??Ie;return(n?new URL(e,n):new URL(e)).origin===Iu}catch{return!1}},Tu=(e,t)=>{let n=t??Ie;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Cu=(e,t)=>`${t??"./"}${e}`,qr=async e=>{let n=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},Au=async e=>(await import(/*webpackIgnore:true*/e)).default,Gr=(Wr(),yn(Nr)).default,Fr=async()=>{if(!Ie)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Hr(Ie))return[void 0,Gr()];let e=await qr(Ie);return[e,Gr(e)]},Kr=async(e,t,n)=>{{let r="ort-wasm-simd-threaded.jsep.mjs",o=e??Tu(r,t),i=!!1&&n&&o&&!Hr(o,t),s=i?await qr(o):o??Cu(r,t);return[i?s:void 0,await Au(s)]}}});var xn,Sn,Rt,jr,ku,Eu,At,se,Le=k(()=>{"use strict";rt();Sn=!1,Rt=!1,jr=!1,ku=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Eu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},At=async e=>{if(Sn)return Promise.resolve();if(Rt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(jr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Rt=!0;let t=e.initTimeout,n=e.numThreads;if(!Eu())throw new Error("WebAssembly SIMD is not supported in the current environment.");let r=ku();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,a=s?.href??s,u=o?.wasm,d=u?.href??u,l=e.wasmBinary,[c,p]=await Kr(a,i,n>1),h=!1,m=[];if(t>0&&m.push(new Promise(f=>{setTimeout(()=>{h=!0,f()},t)})),m.push(new Promise((f,w)=>{let y={numThreads:n};l?y.wasmBinary=l:(d||i)&&(y.locateFile=(g,b)=>d??(i??b)+g),p(y).then(g=>{Rt=!1,Sn=!0,xn=g,f(),c&&URL.revokeObjectURL(c)},g=>{Rt=!1,jr=!0,w(g)})})),await Promise.race(m),h)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},se=()=>{if(Sn&&xn)return xn;throw new Error("WebAssembly is not initialized yet.")}});var ue,it,oe,Mt=k(()=>{"use strict";Le();ue=(e,t)=>{let n=se(),r=n.lengthBytesUTF8(e)+1,o=n._malloc(r);return n.stringToUTF8(e,o,r),t.push(o),o},it=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([o,i])=>{let s=t?t+o:o;if(typeof i=="object")it(i,s+".",n,r);else if(typeof i=="string"||typeof i=="number")r(s,i.toString());else if(typeof i=="boolean")r(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},oe=e=>{let t=se(),n=t.stackSave();try{let r=t.stackAlloc(8);t._OrtGetLastError(r,r+4);let o=t.HEAP32[r/4],i=t.HEAPU32[r/4+1],s=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${o}, ERROR_MESSAGE: ${s}`)}finally{t.stackRestore(n)}}});var Xr,Zr=k(()=>{"use strict";Le();Mt();Xr=e=>{let t=se(),n=0,r=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=ue(e.tag,r)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&oe("Can't create run options."),e?.extra!==void 0&&it(e.extra,"",new WeakSet,(s,a)=>{let u=ue(s,r),d=ue(a,r);t._OrtAddRunConfigEntry(n,u,d)!==0&&oe(`Can't set a run config entry: ${s} - ${a}.`)}),[n,r]}catch(i){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),i}}});var Pu,zu,Bu,Du,Qr,Yr=k(()=>{"use strict";Le();Mt();Pu=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},zu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Bu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Du=(e,t,n)=>{for(let r of t){let o=typeof r=="string"?r:r.name;switch(o){case"webnn":if(o="WEBNN",typeof r!="string"){let a=r?.deviceType;if(a){let u=ue("deviceType",n),d=ue(a,n);se()._OrtAddSessionConfigEntry(e,u,d)!==0&&oe(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof r!="string"){let s=r;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=ue("preferredLayout",n),u=ue(s.preferredLayout,n);se()._OrtAddSessionConfigEntry(e,a,u)!==0&&oe(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=ue(o,n);se()._OrtAppendExecutionProvider(e,i)!==0&&oe(`Can't append execution provider: ${o}.`)}},Qr=e=>{let t=se(),n=0,r=[],o=e||{};Bu(o);try{let i=Pu(o.graphOptimizationLevel??"all"),s=zu(o.executionMode??"sequential"),a=typeof o.logId=="string"?ue(o.logId,r):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let d=o.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let l=typeof o.optimizedModelFilePath=="string"?ue(o.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,d,l),n===0&&oe("Can't create session options."),o.executionProviders&&Du(n,o.executionProviders,r),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=ue("enableGraphCapture",r),p=ue(o.enableGraphCapture.toString(),r);t._OrtAddSessionConfigEntry(n,c,p)!==0&&oe(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,p]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let h=ue(c,r);t._OrtAddFreeDimensionOverride(n,h,p)!==0&&oe(`Can't set a free dimension override: ${c} - ${p}.`)}return o.extra!==void 0&&it(o.extra,"",new WeakSet,(c,p)=>{let h=ue(c,r),m=ue(p,r);t._OrtAddSessionConfigEntry(n,h,m)!==0&&oe(`Can't set a session config entry: ${c} - ${p}.`)}),[n,r]}catch(i){throw n!==0&&t._OrtReleaseSessionOptions(n),r.forEach(s=>t._free(s)),i}}});var st,Ne,Fe,Ut,at,Vt,Lt,In,U=k(()=>{"use strict";st=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Ne=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Fe=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return n>0?Math.ceil(r*n):void 0},Ut=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},at=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Vt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Lt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool",In=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var ut,Tn=k(()=>{"use strict";Ct();ut=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=gn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=gn("node:fs"),r=n(e),o=[];for await(let i of r)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(r)}catch(a){if(a instanceof RangeError){let u=Math.ceil(r/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let d=u.byteLength;new Uint8Array(i,s,d).set(u),s+=d}return new Uint8Array(i,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Ou,Ru,Jr,eo,Nt,Mu,X,Ae=k(()=>{"use strict";U();Ou=["V","I","W","E","F"],Ru=(e,t)=>{console.log(`[${Ou[e]},${new Date().toISOString()}]${t}`)},Nt=(e,t)=>{Jr=e,eo=t},Mu=(e,t)=>{let n=at(e),r=at(Jr);n>=r&&Ru(n,typeof t=="function"?t():t)},X=(...e)=>{eo&&Mu(...e)}});var Wt,Cn=k(()=>{"use strict";U();Wt=(e,t)=>new(Ut(t))(e)});var Gt=k(()=>{"use strict"});var to,An,kn,Uu,Vu,no,Pn,En,oo,io=k(()=>{"use strict";Ae();Gt();to=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),An=[],kn=e=>Math.ceil(e/16)*16,Uu=e=>{for(let t=0;t<An.length;t++){let n=An[t];if(e<=n)return n}return Math.ceil(e/16)*16},Vu=1,no=()=>Vu++,Pn=async(e,t,n,r)=>{let o=kn(n),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(r){let u=r();return u.set(new Uint8Array(a,0,n)),u}else return new Uint8Array(a.slice(0,n))}finally{i.destroy()}},En=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of to)An.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[])}upload(t,n){let r=n.buffer,o=n.byteOffset,i=n.byteLength,s=kn(i),a=this.storageCache.get(t);if(!a)throw new Error("gpu data for uploading does not exist");if(a.originalSize!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=u.getMappedRange();new Uint8Array(d).set(new Uint8Array(r,o,i)),u.unmap();let l=this.backend.getCommandEncoder();this.backend.endComputePass(),l.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),X("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(u)}memcpy(t,n){let r=this.storageCache.get(t);if(!r)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=kn(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,n,r){let o;if(r){if(o=r[0],t===r[1])return X("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=no();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:n}),X("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),X("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Uu(t),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let d=(i?this.freeBuffers:this.freeUniformBuffers).get(r);d?d.length>0?o=d.pop():o=this.backend.device.createBuffer({size:r,usage:n}):o=this.backend.device.createBuffer({size:r,usage:n})}else o=this.backend.device.createBuffer({size:r,usage:n});let a={id:no(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:t}),X("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${a.id}`),a}get(t){return this.storageCache.get(t)?.gpuData}release(t){let n=this.storageCache.get(t);if(!n)throw new Error("releasing data does not exist");return X("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,n){let r=this.storageCache.get(t);if(!r)throw new Error("data does not exist");await Pn(this.backend,r.gpuData.buffer,r.originalSize,n)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let n=to.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let n of this.buffersPending)t.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(t){let n=this.capturedPendingBuffers.get(t);n&&(n.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(t))}},oo=(...e)=>new En(...e)});var zn,V,ae=k(()=>{"use strict";zn=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},V=e=>new zn(e)});var Bn,Ee,x,Ke,Ht,so,ao,N=k(()=>{"use strict";Bn=class{static calcMatMulShape(t,n){return t[1]!==n[0]?void 0:[t[0],n[1]]}},Ee=class{static calcShape(t,n,r=!1){let o=t.length,i=n.length;if(o===0)return n;if(i===0)return t;let s=Math.max(t.length,n.length),a=new Array(s);if(r){if(o<2||i<2)return;let u=Bn.calcMatMulShape([t[o-2],t[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=r?3:1;u<=s;u++){let d=o-u<0?1:t[o-u],l=i-u<0?1:n[i-u];if(d!==l&&d>1&&l>1)return;let c=Math.max(d,l);if(d&&l)a[s-u]=Math.max(d,l);else{if(c>1)return;a[s-u]=0}}return a}static isValidBroadcast(t,n){let r=t.length,o=n.length;if(r>o)return!1;for(let i=1;i<=r;i++)if(t[r-i]!==1&&t[r-i]!==n[o-i])return!1;return!0}},x=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let o=new Array(r),i=r-1;for(;i>=0;){if(t[i]%n===0){o[i]=t[i]/n;break}if(n%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let o=1;for(let i=n;i<r;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=t[i]}return o}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let o=n-3;o>=0;--o)r[o]=r[o+1]*t[o+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((o,i)=>o+n[i]+n[i+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,o)=>r===n[o])}},Ke=class e{static adjustPoolAttributes(t,n,r,o,i,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let a=0;a<n.length-2;a++)a>=r.length?r.push(n[a+2]):r[a]=n[a+2];for(let a=0;a<r.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<r.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<r.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<r.length;a++){if(r[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=r[a]||s[a+r.length]>=r[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,o,i,s,a){if(a){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(s?1:2)],n[u],r[u],o[u],i,u,u+t.length-2,a)}}static computePoolOutputShape(t,n,r,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return e.computeShapeHelper(t,n,u,r,o,i,s,a),u}static computeConvOutputShape(t,n,r,o,i,s,a){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],n[0]];return e.computeShapeHelper(!1,t,u,r,o,i,s,a),u}static computeShapeHelper(t,n,r,o,i,s,a,u){if(t)for(let d=0;d<n.length-2;d++)r.push(1);else for(let d=0;d<n.length-2;d++)r.push(e.adjustPadAndReturnShape(n[d+2],o[d],i[d],s[d],a,d,d+n.length-2,u))}static adjustPadAndReturnShape(t,n,r,o,i,s,a,u){let d=r*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((t-d)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+n-1)/n-1)*n+o-t;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((t+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[s]+i[a]-d)/n+1)}},Ht=class{static getShapeOfGemmResult(t,n,r,o,i){if(t.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=t[1],a=t[0]):(s=t[0],a=t[1]);let d=-1;if(o?(u=r[0],d=1):(u=r[1],d=0),r[d]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!Ee.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},so=-34028234663852886e22,ao=34028234663852886e22});var je,On,Y,de,A,te,Rn,Xe,ke,B,Mn,S,C,qt,Dn,uo,Ye,W=k(()=>{"use strict";U();N();je=64,On=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(e){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Y=(e,t=1)=>{let n=On(e,t);return typeof n=="string"?n:n[0]},de=(e,t=1)=>{let n=On(e,t);return typeof n=="string"?n:n[1]},A=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:x.computeStrides(n)})}),t},te=e=>e%4===0?4:e%2===0?2:1,Rn=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Xe=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,ke=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,B=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Mn=(e,t,n,r,o)=>{let i=typeof n=="number",s=i?n:n.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=On(t,o),l=typeof d=="string"?d:d[1],c=typeof d=="string"?d:d[0],p={indices:u,value:l,storage:c,tensor:t},h=E=>typeof E=="string"?E:`${E}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},f=i?"uniforms.":"",w=`${f}${e}_shape`,y=`${f}${e}_strides`,g="";for(let E=0;E<s-1;E++)g+=`
    let dim${E} = current / ${B(y,E,s)};
    let rest${E} = current % ${B(y,E,s)};
    indices[${E}] = dim${E};
    current = rest${E};
    `;g+=`indices[${s-1}] = current;`;let b=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,_=E=>(m.offsetToIndices=!0,s<2?E:`o2i_${e}(${E})`),$=[];if(s>=2)for(let E=s-1;E>=0;E--)$.push(`${B(y,E,s)} * (indices[${E}])`);let v=s<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${$.join("+")};
  }`,I=E=>(m.indicesToOffset=!0,s<2?E:`i2o_${e}(${E})`),T=(...E)=>s===0?"0u":`${p.indices}(${E.map(h).join(",")})`,P=(E,D)=>s<2?`${E}`:`${B(E,D,s)}`,z=(E,D,ne)=>s<2?`${E}=${ne};`:`${B(E,D,s)}=${ne};`,R={},Z=(E,D)=>{m.broadcastedIndicesToOffset=!0;let ne=`${D.name}broadcastedIndicesTo${e}Offset`;if(ne in R)return`${ne}(${E})`;let Ce=[];for(let fe=s-1;fe>=0;fe--){let Re=D.indicesGet("outputIndices",fe+D.rank-s);Ce.push(`${P(y,fe)} * (${Re} % ${P(w,fe)})`)}return R[ne]=`fn ${ne}(outputIndices: ${D.type.indices}) -> u32 {
             return ${Ce.length>0?Ce.join("+"):"0u"};
           }`,`${ne}(${E})`},G=(E,D)=>(()=>{if(p.storage===p.value)return`${e}[${E}]=${D};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${E}]=vec2<u32>(u32(${D}), select(0u, 0xFFFFFFFFu, ${D} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${E}]=vec2<u32>(u32(${D}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${E}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${D}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),K=E=>(()=>{if(p.storage===p.value)return`${e}[${E}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${E}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${E}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${E}] & 0xFFu), bool(${e}[${E}] & 0xFF00u), bool(${e}[${E}] & 0xFF0000u), bool(${e}[${E}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),ie=s<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${l} {
    return ${K(`i2o_${e}(indices)`)};
  }`,M=s<2?"":(()=>{let E=a.map(ne=>`d${ne}: u32`).join(", "),D=a.map(ne=>`d${ne}`).join(", ");return`
  fn get_${e}(${E}) -> ${l} {
    return get_${e}ByIndices(${T(D)});
  }`})(),Q=(...E)=>{if(E.length!==s)throw new Error(`indices length must be ${s}`);let D=E.map(h).join(",");return s===0?K("0u"):s===1?K(D[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${D})`)},re=E=>s<2?K(E):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${E})`),O=s<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${l}) {
    ${G(`i2o_${e}(indices)`,"value")}
  }`,j=s<2?"":(()=>{let E=a.map(ne=>`d${ne}: u32`).join(", "),D=a.map(ne=>`d${ne}`).join(", ");return`
  fn set_${e}(${E}, value: ${l}) {
    set_${e}ByIndices(${T(D)}, value);
  }`})();return{impl:()=>{let E=[],D=!1;return m.offsetToIndices&&(E.push(b),D=!0),m.indicesToOffset&&(E.push(v),D=!0),m.broadcastedIndicesToOffset&&(Object.values(R).forEach(ne=>E.push(ne)),D=!0),m.set&&(E.push(j),D=!0),m.setByIndices&&(E.push(O),D=!0),m.get&&(E.push(M),D=!0),m.getByIndices&&(E.push(ie),D=!0),!i&&D&&E.unshift(`const ${w} = ${p.indices}(${n.join(",")});`,`const ${y} = ${p.indices}(${x.computeStrides(n).join(",")});`),E.join(`
`)},type:p,offsetToIndices:_,indicesToOffset:I,broadcastedIndicesToOffset:Z,indices:T,indicesGet:P,indicesSet:z,set:(...E)=>{if(E.length!==s+1)throw new Error(`indices length must be ${s}`);let D=E[s];if(typeof D!="string")throw new Error("value must be string");let ne=E.slice(0,s).map(h).join(",");return s===0?G("0u",D):s===1?G(ne[0],D):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${ne}, ${D})`)},setByOffset:G,setByIndices:(E,D)=>s<2?G(E,D):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${E}, ${D});`),get:Q,getByOffset:K,getByIndices:re,usage:r,name:e,strides:y,shape:w,rank:s}},S=(e,t,n,r=1)=>Mn(e,t,n,"input",r),C=(e,t,n,r=1)=>Mn(e,t,n,"output",r),qt=(e,t,n,r=1)=>Mn(e,t,n,"internal",r),Dn=class{constructor(t,n){this.normalizedDispatchGroup=t;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=je){let n=typeof t=="number"?t:t[0],r=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(n>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*r*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*r*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${r}, ${o})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,n){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let r=t.usage==="input"?"read":"read_write",o=t.type.storage;return`@group(0) @binding(${n}) var<storage, ${r}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(t,n,r=1){return this.uniforms.push({name:t,type:n,length:r}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:n,type:r,length:o}of this.uniforms)if(o&&o>4)r==="f16"?t.push(`@align(16) ${n}:array<mat2x4<${r}>, ${Math.ceil(o/8)}>`):t.push(`${n}:array<vec4<${r}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?r:`vec${o}<${r}>`;t.push(`${n}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[t(n.type),n.length??1])}},uo=(e,t)=>new Dn(e,t),Ye=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;o++){let i=n-1-o,s=e[i]||1;(t[t.length-1-o]||1)>1&&s===1&&r.unshift(i)}return r}});var Lu,lo,Nu,Wu,Gu,le,co,po,Me=k(()=>{"use strict";U();N();ae();W();Lu=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},lo=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Nu=(e,t)=>x.sortBasedOnPerm(e,lo(e.length,t)),Wu=(e,t,n,r)=>{let o=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<t;++i)o+=n.indicesSet("a",e[i],`i[${i}]`);return o+="return a;}"},Gu=(e,t)=>{let n=[],r=[];for(let o=0;o<e.length;++o)e[o]!==1&&n.push(e[o]),e[t[o]]!==1&&r.push(t[o]);return{newShape:n,newPerm:r}},le=(e,t)=>{let n=e.dataType,r=e.dims.length,o=lo(r,t),i=Nu(e.dims,o),{newShape:s,newPerm:a}=Gu(e.dims,o),u=x.areEqual(a,[2,3,1]),d=x.areEqual(a,[3,1,2]),l=s.length===2&&a[0]>a[1]||u||d,c=l?s:e.dims,p=i;l&&(c=u?[s[0],s[1]*s[2]]:d?[s[0]*s[1],s[2]]:s,p=[c[1],c[0]]);let h=S("a",n,c.length),m=C("output",n,p.length),f=16,w;return l?w=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(h,m)}
  var<workgroup> tile : array<array<${m.type.value}, ${f+1}>, ${f}>;
  ${y.mainStart([f,f,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${f} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${f}u + local_id.x;
    let input_row = workgroup_id_x * ${f}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${h.getByIndices(`${h.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${f}u + local_id.x;
    let output_row = workgroup_id_y * ${f}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${m.setByIndices(`${m.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:w=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(h,m)}

  ${Wu(o,r,h,m)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",h.getByIndices("aIndices"))}
  }`,{name:l?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=x.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:l?{x:Math.ceil(p[1]/f),y:Math.ceil(p[0]/f)}:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...A(c,p)]}},getShaderSource:w}},co=(e,t)=>{Lu(e.inputs),e.compute(le(e.inputs[0],t.perm))},po=e=>V({perm:e.perm})});var Hu,qu,Fu,Ku,ju,Xu,Zu,Qu,Yu,Ju,Pe,mo,fo,ho,go,yo,bo,wo,_o,$o,vo,xo=k(()=>{"use strict";U();N();W();Ft();Me();Hu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},qu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Fu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ku={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},ju=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},Xu=(e,t)=>{let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);let o=t.map(i=>e[i]);return[n,o]},Zu=(e,t)=>{let n=e.length+t.length,r=[],o=0;for(let i=0;i<n;i++)t.indexOf(i)===-1?r.push(e[o++]):r.push(1);return r},Qu=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},Yu=(e,t)=>{let n=[];if(!Qu(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},Ju=(e,t,n,r,o,i,s)=>{let a=n[0].dims,u=x.size(i),d=x.size(s),l=S("_A",n[0].dataType,a),c=C("output",o,i),p=32,h=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `;return{name:e,shaderCache:t,getShaderSource:f=>`
        ${f.registerUniform("reduceSize","u32").declareVariables(l,c)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${f.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Fu[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${l.getByOffset("offset + k")});
           bestValue = ${Hu[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${qu[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${r==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Ku[r]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},Pe=(e,t,n,r)=>{let o=e.inputs.length===1?n:Un(e.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((h,m)=>m));let s=x.normalizeAxes(i,e.inputs[0].dims.length),a=s,u=e.inputs[0],d=Yu(a,e.inputs[0].dims.length);d.length>0&&(u=e.compute(le(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],a=ju(a.length,u.dims.length));let[l,c]=Xu(u.dims,a),p=l;o.keepDims&&(p=Zu(l,s)),e.compute(Ju(t,{hint:o.cacheKey,inputDependencies:["type"]},[u],r,e.inputs[0].dataType,p,c),{inputs:[u]})},mo=(e,t)=>{Pe(e,"ReduceMeanShared",t,"mean")},fo=(e,t)=>{Pe(e,"ReduceL1Shared",t,"l1")},ho=(e,t)=>{Pe(e,"ReduceL2Shared",t,"l2")},go=(e,t)=>{Pe(e,"ReduceLogSumExpShared",t,"logSumExp")},yo=(e,t)=>{Pe(e,"ReduceMaxShared",t,"max")},bo=(e,t)=>{Pe(e,"ReduceMinShared",t,"min")},wo=(e,t)=>{Pe(e,"ReduceProdShared",t,"prod")},_o=(e,t)=>{Pe(e,"ReduceSumShared",t,"sum")},$o=(e,t)=>{Pe(e,"ReduceSumSquareShared",t,"sumSquare")},vo=(e,t)=>{Pe(e,"ReduceLogSumShared",t,"logSum")}});var ze,ed,Kt,Un,Be,td,nd,rd,od,id,sd,ad,ud,dd,ld,De,So,Io,To,Co,Ao,ko,Eo,Po,zo,Bo,Ft=k(()=>{"use strict";U();N();ae();W();xo();ze=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ed=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Kt=(e,t,n,r,o,i,s=!1,a=!1)=>{let u=[],d=n[0].dims,l=d.length,c=x.normalizeAxes(o,l),p=!a&&c.length===0;d.forEach((w,y)=>{p||c.indexOf(y)>=0?s&&u.push(1):u.push(w)});let h=u.length,m=x.size(u);return{name:e,shaderCache:t,getShaderSource:w=>{let y=[],g=S("_A",n[0].dataType,l),b=C("output",i,h),_=r(g,b,c),$=_[2];for(let v=0,I=0;v<l;v++)p||c.indexOf(v)>=0?(s&&I++,$=`for(var j${v}: u32 = 0; j${v} < ${d[v]}; j${v}++) {
                  ${_[2].includes("last_index")?`let last_index = j${v};`:""}
                  ${g.indicesSet("input_indices",v,`j${v}`)}
                  ${$}
                }`):(y.push(`${g.indicesSet("input_indices",v,b.indicesGet("output_indices",I))};`),I++);return`

        ${w.registerUniform("output_size","u32").declareVariables(g,b)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${y.join(`
`)}
          ${_[0]}       // init ops for reduce max/min
          ${_[1]}
          ${$}
          ${_[3]}
          ${_.length===4?b.setByOffset("global_idx","value"):_.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...A(d,u)]})}},Un=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),V({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Be=(e,t,n,r)=>{let o=e.inputs,i=o.length===1?n:Un(o,n);e.compute(Kt(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?ed:r,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},td=(e,t)=>{ze(e.inputs),Be(e,"ReduceLogSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},nd=(e,t)=>{ze(e.inputs),Be(e,"ReduceL1",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},rd=(e,t)=>{ze(e.inputs),Be(e,"ReduceL2",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},od=(e,t)=>{ze(e.inputs),Be(e,"ReduceLogSumExp",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},id=(e,t)=>{ze(e.inputs),Be(e,"ReduceMax",t,(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(r.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},sd=(e,t)=>{ze(e.inputs),Be(e,"ReduceMean",t,(r,o,i)=>{let s=1;for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},ad=(e,t)=>{ze(e.inputs),Be(e,"ReduceMin",t,(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},ud=(e,t)=>{ze(e.inputs),Be(e,"ReduceProd",t,(r,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},dd=(e,t)=>{ze(e.inputs),Be(e,"ReduceSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ld=(e,t)=>{ze(e.inputs),Be(e,"ReduceSumSquare",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},De=(e,t,n)=>{if(t.length===0)return n;let r=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?r*=e[i]:o*=e[i];return o<32&&r>1024},So=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?sd(e,t):mo(e,t)},Io=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nd(e,t):fo(e,t)},To=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rd(e,t):ho(e,t)},Co=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?od(e,t):go(e,t)},Ao=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?id(e,t):yo(e,t)},ko=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ad(e,t):bo(e,t)},Eo=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ud(e,t):wo(e,t)},Po=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?dd(e,t):_o(e,t)},zo=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ld(e,t):$o(e,t)},Bo=(e,t)=>{De(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?td(e,t):vo(e,t)}});var Do,Oo,Ro,Vn,Mo=k(()=>{"use strict";U();ae();Ft();Do=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Oo=(e,t)=>{Do(e.inputs);let n=(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Kt("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Ro=(e,t)=>{Do(e.inputs);let n=(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Kt("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Vn=e=>V(e)});var cd,pd,md,fd,Je,hd,Uo,jt=k(()=>{"use strict";U();N();Gt();W();cd=(e,t)=>{let n=e[0],r=e[1],o=e[2],i=e[3],s=e[4],a=e[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],d=n.dims[1],l=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==l)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,p=c,h=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let b of t.qkvHiddenSizes)if(b%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}let m=d;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+p+h)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let f=0;if(s){if(p!==h)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(f=s.dims[3])}let w=m+f,y=-1,g=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==t.numHeads||a.dims[2]!==d||a.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:f,kvSequenceLength:m,totalSequenceLength:w,maxSequenceLength:y,inputHiddenSize:l,hiddenSize:c,vHiddenSize:h,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:g,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},pd=(e,t,n)=>{let r=te(n),o=64,i=n/r;i<o&&(o=32);let s=Math.ceil(n/r/o),a=[{type:1,data:1/n},{type:12,data:i},{type:12,data:s}],u=Y(e.dataType,r),d=de(1,r),l=["type"],c=p=>{let h=C("x",e.dataType,e.dims,r),m=de(e.dataType),f=[{name:"d_inv",type:"f32"},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${o}>;
  var<workgroup> thread_sum: array<f32, ${o}>;
  ${p.registerUniforms(f).declareVariables(h)}
  ${p.mainStart([o,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${o}) * uniforms.d_comp + local_offset;

    var thread_max_vector = ${d}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${d}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(r){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${r}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${o}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${d}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${d}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(r){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${r}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${o}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${h.type.value}(${m}(uniforms.d_inv));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${d}(x[offset + i]);
        x[offset + i] = ${h.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${o};${u};${r}`,inputDependencies:l},getShaderSource:c,getRunData:()=>({outputs:[],dispatchGroup:{x:t},programUniforms:a})}},md=(e,t,n,r,o,i,s,a)=>{let u=a+i.kvSequenceLength,d=[i.batchSize,i.numHeads,i.sequenceLength,u],l=i.kvNumHeads===void 0&&e>1&&r,c=l?[i.batchSize,i.numHeads,u,i.headSize]:void 0,p=s.scale===0?1/Math.sqrt(i.headSize):s.scale,h=te(i.headSize),m=i.headSize/h,f=12,w={x:Math.ceil(u/f),y:Math.ceil(i.sequenceLength/f),z:i.batchSize*i.numHeads},y=[{type:12,data:i.sequenceLength},{type:12,data:m},{type:12,data:u},{type:12,data:i.numHeads},{type:1,data:p},{type:12,data:a},{type:12,data:i.kvSequenceLength}],g=l&&r&&x.size(r.dims)>0,b=["type","type"];g&&b.push("type"),o&&b.push("type");let _=[{dims:d,dataType:t.dataType,gpuDataType:0}];l&&_.push({dims:c,dataType:t.dataType,gpuDataType:0});let $=v=>{let I=S("q",t.dataType,t.dims,h),T=S("key",n.dataType,n.dims,h),P=[I,T];if(g){let K=S("past_key",r.dataType,r.dims,h);P.push(K)}o&&P.push(S("attention_bias",o.dataType,o.dims));let z=C("output",t.dataType,d),R=[z];l&&R.push(C("present_key",t.dataType,c,h));let Z=de(1,h),G=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${f}u;

  var<workgroup> tileQ: array<${I.type.storage}, ${f*f}>;
  var<workgroup> tileK: array<${I.type.storage}, ${f*f}>;
  ${v.registerUniforms(G).declareVariables(...P,...R)}
  ${v.mainStart([f,f,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    ${(()=>g&&l?`
    let kOffset = uniforms.kv_sequence_length * uniforms.K * headIdx;
    let pastKeyOffset = uniforms.past_sequence_length * uniforms.K * headIdx;`:`
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;`)()}
    ${l?"let presentKeyOffset = headIdx * uniforms.N * uniforms.K;":""}
    var value = ${Z}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>g&&l?`
              if (n + local_id.y < uniforms.past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else {
                tileK[idx] =
                         key[kOffset + (n + local_id.y - uniforms.past_sequence_length) * uniforms.K + w + local_id.x];
              }`:"tileK[idx] = key[kOffset + local_id.y * uniforms.K + w + local_id.x];")()}
      ${l?"present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];":""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
        value += ${Z}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(h){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${h}`)}})()};
        output[outputIdx] = ${z.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${h};${o!==void 0};${r!==void 0};${e}`,inputDependencies:b},getRunData:()=>({outputs:_,dispatchGroup:w,programUniforms:y}),getShaderSource:$}},fd=(e,t,n,r,o,i)=>{let s=i+o.kvSequenceLength,a=o.nReps?o.nReps:1,u=o.vHiddenSize*a,d=o.kvNumHeads==null&&e>1&&r,l=d?[o.batchSize,o.numHeads,s,o.headSize]:void 0,c=[o.batchSize,o.sequenceLength,u],p=12,h={x:Math.ceil(o.vHeadSize/p),y:Math.ceil(o.sequenceLength/p),z:o.batchSize*o.numHeads},m=[{type:12,data:o.sequenceLength},{type:12,data:s},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:u},{type:12,data:i},{type:12,data:o.kvSequenceLength}],f=d&&r&&x.size(r.dims)>0,w=["type","type"];f&&w.push("type");let y=[{dims:c,dataType:t.dataType,gpuDataType:0}];d&&y.push({dims:l,dataType:t.dataType,gpuDataType:0});let g=b=>{let _=S("probs",t.dataType,t.dims),$=S("v",n.dataType,n.dims),v=[_,$];f&&v.push(S("past_value",r.dataType,r.dims));let T=[C("output",t.dataType,c)];d&&T.push(C("present_value",t.dataType,l));let P=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"}];return`
  const TILE_SIZE = ${p}u;
  var<workgroup> tileQ: array<${_.type.value}, ${p*p}>;
  var<workgroup> tileK: array<${_.type.value}, ${p*p}>;
  ${b.registerUniforms(P).declareVariables(...v,...T)}
  ${b.mainStart([p,p,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   ${(()=>f&&d?`
    let pastValueOffset = headIdx * uniforms.N * uniforms.past_sequence_length + n;
    let vOffset = headIdx * uniforms.N * uniforms.kv_sequence_length + n;
      `:`
   let offsetB = headIdx * uniforms.N * uniforms.K + n;
            `)()}
    ${d?"let presentValueOffset = headIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${_.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>f&&d?`
        if (w + local_id.y < uniforms.past_sequence_length) {
          tileK[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else {
          tileK[idx] = v[vOffset + (w + local_id.y - uniforms.past_sequence_length) * uniforms.N];
        }
      `:`
        tileK[idx] = v[offsetB + (w + local_id.y) * uniforms.N];
      `)()}
        ${d?"present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileK[idx];":""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let currentBatchHeadNumber = workgroup_id.z % uniforms.num_heads;
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + currentBatchHeadNumber * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:w},getRunData:()=>({outputs:y,dispatchGroup:h,programUniforms:m}),getShaderSource:g}},Je=(e,t,n,r,o,i,s,a,u,d,l)=>{let c=Math.min(e.outputCount,1+(s?1:0)+(a?1:0)),p=d.kvNumHeads!==void 0||c>1?d.pastSequenceLength:0,h=p+d.kvSequenceLength,m=u&&x.size(u.dims)>0?u:void 0,f=[t,n];d.kvNumHeads===void 0&&c>1&&s&&x.size(s.dims)>0&&f.push(s),m&&f.push(m);let w=e.compute(md(c,t,n,s,m,d,l,p),{inputs:f,outputs:d.kvNumHeads===void 0&&c>1?[-1,1]:[-1]})[0];e.compute(pd(w,d.batchSize*d.numHeads*d.sequenceLength,h),{inputs:[w],outputs:[]});let y=[w,r];d.kvNumHeads===void 0&&c>1&&a&&x.size(a.dims)>0&&y.push(a),e.compute(fd(c,w,r,a,d,p),{inputs:y,outputs:d.kvNumHeads===void 0&&c>1?[0,2]:[0]})},hd=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,s=12,a={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:r},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],l=c=>{let p=C("output_q",u[0].dataType,n),h=C("output_k",u[0].dataType,n),m=C("output_v",u[0].dataType,n),f=S("input",u[0].dataType,u[0].dims),w=S("weight",u[1].dataType,u[1].dims),y=S("bias",u[2].dataType,u[2].dims),g=f.type.storage,b=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${g}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${g}, ${s*s}>;
  var<workgroup> tileWeightK: array<${g}, ${s*s}>;
  var<workgroup> tileWeightV: array<${g}, ${s*s}>;
  ${c.registerUniforms(b).declareVariables(f,w,y,p,h,m)}
  ${c.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${g}(0);
    var valueK = ${g}(0);
    var valueV = ${g}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:d}),getShaderSource:l},{inputs:u,outputs:[-1,-1,-1]})},Uo=(e,t)=>{let n=cd(e.inputs,t),[r,o,i]=hd(e,n);return Je(e,r,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n,t)}});var gd,yd,bd,Vo,Lo=k(()=>{"use strict";Se();U();N();ae();W();gd=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,o,i)=>{let s=o.length;if(s!==r.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==r[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},yd=(e,t)=>{let{epsilon:n,spatial:r,format:o}=t,i=e[0].dims,s=r?te(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=x.size(i)/s,d=r,l=d?i.length:i,c=S("x",e[0].dataType,e[0].dims,s),p=S("scale",e[1].dataType,e[1].dims,a),h=S("bias",e[2].dataType,e[2].dims,a),m=S("inputMean",e[3].dataType,e[3].dims,a),f=S("inputVar",e[4].dataType,e[4].dims,a),w=C("y",e[0].dataType,l,s),y=()=>{let b="";if(r)b=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")b=`
            ${w.indicesSet("outputIndices","0","0")}
            let cOffset = ${w.indicesToOffset("outputIndices")};`;else{b=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let _=1;_<p.rank;_++)b+=`cIndices[${_}] = outputIndices[${_}];`;b+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return b},g=b=>`
  const epsilon = ${n};
  ${b.registerUniform("outputSize","u32").declareVariables(c,p,h,m,f,w)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${w.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${f.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${w.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...A(i)]:[{type:12,data:u}]})}},bd=e=>V(e),Vo=(e,t)=>{let{inputs:n,outputCount:r}=e,o=bd({...t,outputCount:r});if(ee.webgpu.validateInputContent&&gd(n,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(yd(n,o))}});var wd,_d,No,Wo=k(()=>{"use strict";N();W();wd=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},_d=e=>{let t=e[0].dims,n=e[0].dims[2],r=x.size(t)/4,o=e[0].dataType,i=S("input",o,t,4),s=S("bias",o,[n],4),a=S("residual",o,t,4),u=C("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:l=>`
  const channels = ${n}u / 4;
  ${l.declareVariables(i,s,a,u)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},No=e=>{wd(e.inputs),e.compute(_d(e.inputs))}});var $d,J,Go,Ho,qo,Fo,Ko,jo,Xo,Zo,Qo,vd,Yo,Jo,ei,ti,dt,ni,Xt,ri,oi,ii,si,ai,ui,di,li,ci,pi,mi,fi,hi,gi,yi,bi,wi,_i,Ln,Nn,$i,vi,xi,xd,Sd,Si,Zt=k(()=>{"use strict";U();N();ae();W();$d=(e,t,n,r,o,i,s)=>{let a=Math.ceil(t/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let d=S("inputData",n,[a],4),l=C("outputData",r,[a],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${e.registerUniforms(c).declareVariables(d,l)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx",u)}
  }`},J=(e,t,n,r,o,i=e.dataType,s,a)=>{let u=[{type:12,data:Math.ceil(x.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:d=>$d(d,x.size(e.dims),e.dataType,i,n,r,a),getRunData:d=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(x.size(d[0].dims)/64/4)},programUniforms:u})}},Go=e=>{e.compute(J(e.inputs[0],"Abs","abs"))},Ho=e=>{e.compute(J(e.inputs[0],"Acos","acos"))},qo=e=>{e.compute(J(e.inputs[0],"Acosh","acosh"))},Fo=e=>{e.compute(J(e.inputs[0],"Asin","asin"))},Ko=e=>{e.compute(J(e.inputs[0],"Asinh","asinh"))},jo=e=>{e.compute(J(e.inputs[0],"Atan","atan"))},Xo=e=>{e.compute(J(e.inputs[0],"Atanh","atanh"))},Zo=e=>V(e),Qo=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(J(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},vd=e=>{let t,n,r=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return V({min:t,max:n})},Yo=(e,t)=>{let n=t||vd(e.inputs),r=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Jo=e=>{e.compute(J(e.inputs[0],"Ceil","ceil"))},ei=e=>{e.compute(J(e.inputs[0],"Cos","cos"))},ti=e=>{e.compute(J(e.inputs[0],"Cosh","cosh"))},dt=e=>V(e),ni=(e,t)=>{let n=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Xt=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,ri=e=>{let t=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Xt(t)))},oi=e=>{e.compute(J(e.inputs[0],"Exp","exp"))},ii=e=>{e.compute(J(e.inputs[0],"Floor","floor"))},si=e=>{let t=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Xt(t)))},ai=(e,t)=>{let n=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},ui=e=>{e.compute(J(e.inputs[0],"Not",t=>`!${t}`))},di=e=>{e.compute(J(e.inputs[0],"Neg",t=>`-${t}`))},li=e=>{e.compute(J(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ci=e=>{let t=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},pi=e=>{e.compute(J(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},mi=e=>V(e),fi=(e,t)=>{let n=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},hi=e=>{e.compute(J(e.inputs[0],"Sin","sin"))},gi=e=>{e.compute(J(e.inputs[0],"Sinh","sinh"))},yi=e=>{e.compute(J(e.inputs[0],"Sqrt","sqrt"))},bi=e=>{e.compute(J(e.inputs[0],"Tan","tan"))},wi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,_i=e=>{e.compute(J(e.inputs[0],"Tanh",wi))},Ln=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${wi("v")};
}
`,Nn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,$i=e=>{let t=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"FastGelu",Nn,Ln(t),void 0,e.inputs[0].dataType))},vi=(e,t)=>{let n=de(e.inputs[0].dataType);return e.compute(J(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},xi=e=>{e.compute(J(e.inputs[0],"Log","log"))},xd=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Sd=e=>`quick_gelu_impl(${e})`,Si=(e,t)=>{let n=de(e.inputs[0].dataType);e.compute(J(e.inputs[0],"QuickGelu",Sd,xd(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Id,Td,Ti,Ci=k(()=>{"use strict";N();W();Zt();Id=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Td=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=S("input",e[0].dataType,e[0].dims,4),r=S("bias",e[0].dataType,[e[0].dims[2]],4),o=C("output",e[0].dataType,t,4),i=x.size(t)/4,s=Y(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(n,r,o)}

  ${Xt(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ti=e=>{Id(e.inputs),e.compute(Td(e.inputs))}});var Cd,Ad,Oe,Ai,ki,Ei,Pi,zi,Bi,Di,Oi,Ri,Mi,Ui=k(()=>{"use strict";U();N();W();Cd=(e,t,n,r,o,i,s,a,u,d,l,c)=>{let p,h;typeof a=="string"?p=h=(g,b)=>`${a}((${g}),(${b}))`:typeof a=="function"?p=h=a:(p=a.scalar,h=a.vector);let m=C("outputData",l,r.length,4),f=S("aData",u,t.length,4),w=S("bData",d,n.length,4),y;if(o)if(i){let g=x.size(t)===1,b=x.size(n)===1,_=t.length>0&&t[t.length-1]%4===0,$=n.length>0&&n[n.length-1]%4===0;g||b?y=m.setByOffset("global_idx",h(g?`${f.type.value}(${f.getByOffset("0")}.x)`:f.getByOffset("global_idx"),b?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"))):y=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${f.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${w.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",h(s||_?f.getByOffset("offsetA / 4u"):`${f.type.value}(${f.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||$?w.getByOffset("offsetB / 4u"):`${w.type.value}(${w.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",h(f.getByOffset("global_idx"),w.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(b,_,$="")=>{let v=`aData[indexA${_}][componentA${_}]`,I=`bData[indexB${_}][componentB${_}]`;return`
            let outputIndices${_} = ${m.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offsetA${_} = ${f.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
            let offsetB${_} = ${w.broadcastedIndicesToOffset(`outputIndices${_}`,m)};
            let indexA${_} = offsetA${_} / 4u;
            let indexB${_} = offsetB${_} / 4u;
            let componentA${_} = offsetA${_} % 4u;
            let componentB${_} = offsetB${_} % 4u;
            ${b}[${_}] = ${$}(${p(v,I)});
          `};l===9?y=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:y=`
            ${g("outputData[global_idx]",0)}
            ${g("outputData[global_idx]",1)}
            ${g("outputData[global_idx]",2)}
            ${g("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(f,w,m)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},Ad=(e,t,n,r,o,i,s=n.dataType)=>{let a=!x.areEqual(n.dims,r.dims),u=n.dims,d=x.size(n.dims),l=!1,c=!1,p=[a];if(a){let h=Ee.calcShape(n.dims,r.dims,!1);if(!h)throw new Error("Can't perform binary op on the given tensors");u=h,d=x.size(u);let m=x.size(n.dims)===1,f=x.size(r.dims)===1,w=n.dims.length>0&&n.dims[n.dims.length-1]%4===0,y=r.dims.length>0&&r.dims[r.dims.length-1]%4===0;p.push(m),p.push(f),p.push(w),p.push(y);let g=1;for(let b=1;b<u.length;b++){let _=n.dims[n.dims.length-b]??1,$=r.dims[r.dims.length-b]??1;if(_===$)g*=_;else break}g%4===0?(c=!0,l=!0):(m||f||w||y)&&(l=!0)}else l=!0;return p.push(l),{name:e,shaderCache:{hint:t+p.map(h=>h.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:h=>Cd(h,n.dims,r.dims,u,l,a,c,o,n.dataType,r.dataType,s,i),getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil(x.size(u)/4)},...A(n.dims,r.dims,u)]})}},Oe=(e,t,n,r,o,i)=>{e.compute(Ad(t,o??"",e.inputs[0],e.inputs[1],n,r,i))},Ai=e=>{Oe(e,"Add",(t,n)=>`${t}+${n}`)},ki=e=>{Oe(e,"Div",(t,n)=>`${t}/${n}`)},Ei=e=>{Oe(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Pi=e=>{Oe(e,"Mul",(t,n)=>`${t}*${n}`)},zi=e=>{let t=S("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Oe(e,"Pow",{scalar:(r,o)=>`pow_custom(${r},${o})`,vector:(r,o)=>`pow_vector_custom(${r},${o})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Bi=e=>{Oe(e,"Sub",(t,n)=>`${t}-${n}`)},Di=e=>{Oe(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Oi=e=>{Oe(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Ri=e=>{Oe(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Mi=e=>{Oe(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}});var Ed,Pd,zd,Bd,Vi,Li,Ni=k(()=>{"use strict";U();N();ae();W();Ed=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],o=r.dataType,i=r.dims.length;e.forEach((s,a)=>{if(a!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,d)=>{if(d!==t&&u!==r.dims[d])throw new Error("non concat dimensions must match")})}})},Pd=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,zd=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));n===1?r.push(i):o===0?r.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?r.push(`else { ${i} }`):r.push(`else if (inputIndex == ${o}) { ${i} }`)}return r.join(`
`)},Bd=(e,t,n,r)=>{let o=x.size(n),i=new Array(e.length),s=new Array(e.length),a=0,u=[],d=[],l=[{type:12,data:o}];for(let f=0;f<e.length;++f)a+=e[f].dims[t],i[f]=a,d.push(e[f].dims.length),s[f]=S(`input${f}`,r,d[f]),u.push("rank"),l.push({type:12,data:i[f]});for(let f=0;f<e.length;++f)l.push(...A(e[f].dims));l.push(...A(n));let c=C("output",r,n.length),p=c.indicesGet("indices",t),h=Array.from(Array(i.length).keys()).map(f=>`uniforms.sizeInConcatAxis${f}`).join(","),m=f=>`

  ${(()=>{f.registerUniform("outputSize","u32");for(let w=0;w<e.length;w++)f.registerUniform(`sizeInConcatAxis${w}`,"u32");return f.declareVariables(...s,c)})()}

  ${Pd(i.length,h)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${h});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${zd(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l}),getShaderSource:m}},Vi=(e,t)=>{let n=e.inputs,r=n[0].dims,o=x.normalizeAxis(t.axis,r.length);Ed(n,o);let i=r.slice();i[o]=n.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=n.filter(a=>x.size(a.dims)>0);e.compute(Bd(s,o,i,n[0].dataType),{inputs:s})},Li=e=>V({axis:e.axis})});var $e,ve,xe,Qt,Ue=k(()=>{"use strict";U();N();$e=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},ve=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},xe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Qt=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[so,ao];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}});var ce,Yt,lt=k(()=>{"use strict";ce=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Yt=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Jt,Wn=k(()=>{"use strict";Jt=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var Dd,Od,ct,Wi,Rd,pt,Md,en,mt=k(()=>{"use strict";U();N();W();Ue();lt();Dd=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Od=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,ct=(e,t,n="f32",r,o=!1,i=32,s=!1,a=32)=>{let u=t[1]*e[1],d=t[0]*e[0],l=o?u:i,c=o?i:u,p=l/t[0],h=i/t[1];if(!((o&&p===4&&e[1]===4||!o&&(p===3||p===4))&&l%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${l} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${n}>, ${l/p}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${d/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${p};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${h};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Dd(o,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Od(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Wi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Rd=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",pt=(e,t,n="f32",r,o=!1,i=32,s=!1,a=32,u=!1)=>{let d=e[1]*t[1],l=e[0]*t[0],c=o?d:i,p=o?i:d;if(!(p%t[1]===0&&c%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let h=p/t[1],m=c/t[0],f=i/t[1],w=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${l};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Wi(o,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${l}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${h};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${f};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Wi(o,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Rd(o)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${c}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${l}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${w}
  }
`},Md=(e,t,n,r,o,i=!1)=>{let[s,a,u]=o,[d,l,c,p]=r,h=Ye(s,u),m=Ye(a,u),f=Y(r[0].type.tensor),w=()=>{let b=l.rank,_=d.rank,$=`var aIndices: ${l.type.indices};`;for(let v=b-2-1,I=_-1;v>=0;v--,I--)$+=`
aIndices[${v}] = ${_>1?`batchIndices[${I}]`:"batchIndices"};`;return h.forEach(v=>{$+=`
aIndices[${v}] = 0;`}),$+=`
aIndices[${b-2}] = u32(row);
                   aIndices[${b-1}] = u32(colIn);`,$},y=()=>{let b=c.rank,_=d.rank,$=`var bIndices: ${c.type.indices};`;for(let v=b-2-1,I=_-1;v>=0;v--,I--)$+=`
bIndices[${v}] = ${_>1?`batchIndices[${I}]`:"batchIndices"};`;return m.forEach(v=>{$+=`
bIndices[${v}] = 0;`}),$+=`
bIndices[${b-2}] = u32(row);
                   bIndices[${b-1}] = u32(colIn);`,$};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${ce(e,f)} {
      var value = ${ce(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${w()}
        value = ${l.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${d.type.indices}) -> ${ce(e,f)} {
      var value = ${ce(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${y()}
        value = ${c.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ce(e,f)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${ce(e,f)}(bias[row])`};`:""}
        ${n}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},en=(e,t,n,r,o=!1,i)=>{let s=e[0].dims,a=e[1].dims,u=s.slice(0,-2),d=a.slice(0,-2),l=r?r.slice(0,-2):n.slice(0,-2),c=x.size(l),p=s[s.length-2],h=s[s.length-1],m=a[a.length-1],f=h%4===0&&m%4===0,w=p<=8?[4,1,1]:[4,4,1],y=[8,8,1],g=[Math.ceil(m/y[0]/w[0]),Math.ceil(p/y[1]/w[1]),Math.ceil(c/y[2]/w[2])],b=f?4:1,_=[...u,p,h/b],$=_.length,v=[...d,h,m/b],I=v.length,T=[c,p,m/b],P=[{type:6,data:p},{type:6,data:m},{type:6,data:h}];ve(t,P),P.push(...A(l,_,v));let z=["rank","rank"],R=e.length>2;R&&(P.push(...A(e[2].dims)),z.push("rank")),P.push(...A(T));let Z=G=>{let K=l.length,ie=qt("batchDims",e[0].dataType,K,1),M=Y(e[0].dataType),Q=S("a",e[0].dataType,$,b),re=S("b",e[1].dataType,I,b),O=C("result",e[0].dataType,T.length,b),j=[Q,re];if(R){let D=o?b:1;j.push(S("bias",e[2].dataType,e[2].dims.length,D))}let H=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];xe(t,H);let q=Y(O.type.tensor),F=$e(t,O.type.value,q),E=Md(b,R,F,[ie,Q,re,O],[u,d,l],o);return`
  ${G.registerUniforms(H).registerInternalVariables(ie).declareVariables(...j,O)}
  ${E}
  ${f?ct(w,y,M,ie):pt(w,y,M,ie)}
                   `};return{name:"MatMul",shaderCache:{hint:`${w};${t.activation};${f};${o}`,inputDependencies:z},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:P}),getShaderSource:Z}}});var Ud,Gi,Hi=k(()=>{"use strict";U();Ae();W();Ue();lt();Wn();mt();Ud=(e,t,n,r,o=!1,i,s=4,a=4,u=4,d="f32")=>{let l=z=>{switch(z){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${z} is not supported.`)}},c=z=>{switch(z){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${z} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",f=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",w=e?"row":"col",y=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${w} / outWidth;
    let outCol = ${w} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${ce(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${f}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${l(s)}
    }
    return resData;`,b=e?t&&r?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${ce(s,d)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${ce(s,d)}(0.0);`,_=`${c(a)}`,$=ce(u,d),v=e?ce(s,d):ce(a,d),I=e?ce(a,d):ce(s,d),T=$e(i,$,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${e?b:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?_:b}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${$}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${Yt(o)}
      ${T}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Gi=(e,t,n,r,o,i,s,a,u)=>{let d=t.format==="NHWC",l=d?e[0].dims[3]:e[0].dims[1],c=n[0],p=d?n[2]:n[3],h=d?n[1]:n[2],m=d?n[3]:n[1],f=d&&(l%4===0||l%3===0)&&m%4===0,w=d?m:p*h,y=d?p*h:m,g=[8,8,1],b=r<=8?[4,1,1]:[4,4,1],_=[Math.ceil(w/g[0]/b[0]),Math.ceil(y/g[1]/b[1]),Math.ceil(c/g[2]/b[2])];X("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${_}`);let $=f?d&&l%4!==0?3:4:1,v=g[1]*b[1],I=g[0]*b[0],T=Math.max(g[0]*$,g[1]),P=r%v===0,z=o%I===0,R=i%T===0,Z=f?[$,4,4]:[1,1,1],G=[{type:6,data:r},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];ve(t,G),G.push(...A(e[0].dims,e[1].dims));let K=["rank","rank"];s&&(G.push(...A(e[2].dims)),K.push("rank")),G.push(...A(n));let ie=M=>{let Q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];xe(t,Q);let re=f?4:1,O=Y(e[0].dataType),j=`
      fn setOutputAtIndex(flatIndex : i32, value : ${f?`vec4<${O}>`:O}) {
        result[flatIndex] = ${f?`vec4<${O}>`:O}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${f?`vec4<${O}>`:O}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${f?"/ 4":""}, value);
      }`,H=S("x",e[0].dataType,e[0].dims.length,$===3?1:$),q=S("w",e[1].dataType,e[1].dims.length,re),F=[H,q],E=C("result",e[0].dataType,n.length,re);if(s){let D=S("bias",e[2].dataType,e[2].dims.length,re);F.push(D),j+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${f?`vec4<${O}>`:O} {
          return bias[coords.${d?"w":"y"}${f?"/ 4":""}];
        }`}return`
        ${Jt("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${M.registerUniforms(Q).declareVariables(...F,E)}
        ${j}
        ${Ud(d,P,z,R,s,t,Z[0],Z[1],Z[2],O)}
        ${f?ct(b,g,O,void 0,!d,T):pt(b,g,O,void 0,!d,T,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${$};${f};${P};${z};${R};${v};${I};${T}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:e[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:G}),getShaderSource:ie}}});var Vd,qi,tn,Ld,Fi,Nd,Ki,ji,Xi=k(()=>{"use strict";U();Ae();N();W();Ue();lt();Vd=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},qi=e=>typeof e=="number"?[e,e,e]:e,tn=(e,t)=>t<=1?e:e+(e-1)*(t-1),Ld=(e,t,n,r=1)=>{let o=tn(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)},Fi=(e,t,n,r,o)=>{o==null&&(o=Ld(e,t[0],r[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(i[s]=Math.trunc((e[s]-t[s]+2*o)/r[s]+1));return i},Nd=(e,t,n,r,o,i,s,a,u,d)=>{let l,c,p,h;if(e==="VALID"&&(e=0),typeof e=="number"){l={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=Fi([t,n,r,1],[a,u,d],1,[o,i,s],e);c=m[0],p=m[1],h=m[2]}else if(Array.isArray(e)){if(!e.every((f,w,y)=>f===y[0]))throw Error(`Unsupported padding parameter: ${e}`);l={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=Fi([t,n,r,1],[a,u,d],1,[o,i,s],e[0]);c=m[0],p=m[1],h=m[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/o),p=Math.ceil(n/i),h=Math.ceil(r/s);let m=(c-1)*o+a-t,f=(p-1)*i+u-n,w=(h-1)*s+d-r,y=Math.floor(m/2),g=m-y,b=Math.floor(f/2),_=f-b,$=Math.floor(w/2),v=w-$;l={top:b,bottom:_,left:$,right:v,front:y,back:g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:l,outDepth:c,outHeight:p,outWidth:h}},Ki=(e,t,n,r,o,i=!1,s="channelsLast")=>{let a,u,d,l,c;if(s==="channelsLast")[a,u,d,l,c]=e;else if(s==="channelsFirst")[a,c,u,d,l]=e;else throw new Error(`Unknown dataFormat ${s}`);let[p,,h,m,f]=t,[w,y,g]=qi(n),[b,_,$]=qi(r),v=tn(h,b),I=tn(m,_),T=tn(f,$),{padInfo:P,outDepth:z,outHeight:R,outWidth:Z}=Nd(o,u,d,l,w,y,g,v,I,T),G=i?p*c:p,K=[0,0,0,0,0];return s==="channelsFirst"?K=[a,G,z,R,Z]:s==="channelsLast"&&(K=[a,z,R,Z,G]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:d,inWidth:l,inChannels:c,outDepth:z,outHeight:R,outWidth:Z,outChannels:G,padInfo:P,strideDepth:w,strideHeight:y,strideWidth:g,filterDepth:h,filterHeight:m,filterWidth:f,effectiveFilterDepth:v,effectiveFilterHeight:I,effectiveFilterWidth:T,dilationDepth:b,dilationHeight:_,dilationWidth:$,inShape:e,outShape:K,filterShape:t}},ji=(e,t,n,r,o,i)=>{let s=i==="channelsLast",a=s?e[0].dims[3]:e[0].dims[1],u=!1,d=[64,1,1],l={x:n.map((g,b)=>b)},c=[Math.ceil(Vd(l.x.map(g=>n[g]))/d[0]),1,1];X("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=u?s&&a%4!==0?3:4:1,h=x.size(n),m=[{type:12,data:h},{type:12,data:r},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];ve(t,m),m.push(...A(e[0].dims,e[1].dims));let f=["rank","rank"],w=e.length===3;w&&(m.push(...A(e[2].dims)),f.push("rank")),m.push(...A(n));let y=g=>{let b=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];xe(t,b);let _=u?4:1,$=Y(e[0].dataType),v=S("x",e[0].dataType,e[0].dims.length,p===3?1:p),I=S("W",e[1].dataType,e[1].dims.length,_),T=[v,I],P=C("result",e[0].dataType,n.length,_),z="";if(w){let G=S("bias",e[2].dataType,e[2].dims.length,_);T.push(G),z+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${$}>`:$} {
          return bias[${s?B("coords",4,5):B("coords",1,5)}${u?"/ 4":""}];
        }`}let R=ce(p,$),Z=$e(t,R,$);return`
            ${z}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${v.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${g.registerUniforms(b).declareVariables(...T,P)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${P.offsetToIndices("global_idx")};
              let batch = ${B("coords",0,v.rank)};
              let d2 = ${s?B("coords",v.rank-1,v.rank):B("coords",1,v.rank)};
              let xFRCCorner = vec3<u32>(${s?B("coords",1,v.rank):B("coords",2,v.rank)},
              ${s?B("coords",2,v.rank):B("coords",3,v.rank)},
              ${s?B("coords",3,v.rank):B("coords",4,v.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?B("uniforms.x_shape",1,v.rank):B("uniforms.x_shape",2,v.rank)};
              let xShapeZ = ${s?B("uniforms.x_shape",2,v.rank):B("uniforms.x_shape",3,v.rank)};
              let xShapeW = ${s?B("uniforms.x_shape",3,v.rank):B("uniforms.x_shape",4,v.rank)};
              let xShapeU = ${s?B("uniforms.x_shape",4,v.rank):B("uniforms.x_shape",1,v.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${w?"value = value + getBiasByOutputCoords(coords)":""};
              ${Z}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${p};${w}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:m}),getShaderSource:y}}});var Zi,Qi,Yi=k(()=>{"use strict";U();N();W();Ue();Zi=(e,t,n,r)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",s=e[0].dims,a=e[1].dims,u=t.format==="NHWC",d=u?n[3]:n[1],l=d/t.group,c=u&&l>=4?te(d):1,p=x.size(n)/c,h=[{type:12,data:p},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:l}];ve(t,h),h.push(...A(s,[a[0],a[1],a[2],a[3]/c]));let m=o?["rank","rank","rank"]:["rank","rank"];h.push(...A([n[0],n[1],n[2],n[3]/c]));let f=w=>{let y=C("output",e[0].dataType,n.length,c),g=Y(y.type.tensor),b=$e(t,y.type.value,g),_=S("x",e[0].dataType,s.length),$=S("w",e[1].dataType,a.length,c),v=[_,$];o&&v.push(S("b",e[2].dataType,e[2].dims,c));let I=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];xe(t,I);let T=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${_.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${$.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${_.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${$.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${w.registerUniforms(I).declareVariables(...v,y)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${y.type.value} = ${y.type.value}(0);
    ${T}
    ${i}
    ${b}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:h}),getShaderSource:f}},Qi=(e,t,n,r)=>{let o=e.length>2,i=te(n[3]),s=te(n[2]),a=x.size(n)/i/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],l=[n[0],n[1],n[2],n[3]/i],c=[{type:12,data:a},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];ve(t,c),c.push(...A(u,d,l));let p=(s-1)*t.strides[1]+d[1],h=m=>{let f=C("output",e[0].dataType,l.length,i),w=Y(f.type.tensor),y=$e(t,f.type.value,w),g=S("x",e[0].dataType,u.length,i),b=S("w",e[1].dataType,d.length,i),_=[g,b];o&&_.push(S("b",e[2].dataType,e[2].dims,i));let $=o?"value += b[output_channel];":"",v=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return xe(t,v),`
  ${m.registerUniforms(v).declareVariables(..._,f)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${g.type.value}, ${p}>;
    var values: array<${f.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${g.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${g.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${b.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${$}
      ${y}
      ${f.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${s};${p};${d[0]};${d[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:h}}});var Gn,Wd,Ji,Hn=k(()=>{"use strict";U();N();mt();W();Ue();Gn=(e,t,n,r,o=!1,i)=>{let s=e[0].dims,a=e[1].dims,u=s[s.length-2],d=a[a.length-1],l=s[s.length-1],c=te(d),p=te(l),h=te(u),m=x.size(n)/c/h,f=e.length>2,w=r?r.slice(0,-2):n.slice(0,-2),g=[x.size(w),u,d],b=[{type:12,data:m},{type:12,data:u},{type:12,data:d},{type:12,data:l}];ve(t,b),b.push(...A(w,s,a)),f&&b.push(...A(e[2].dims)),b.push(...A(g));let _=$=>{let v=qt("batch_dims",e[0].dataType,w.length),I=S("a",e[0].dataType,s.length,p),T=S("b",e[1].dataType,a.length,c),P=C("output",e[0].dataType,g.length,c),z=Y(P.type.tensor),R=$e(t,P.type.value,z),Z=[I,T],G="";if(f){let H=o?c:1;Z.push(S("bias",e[2].dataType,e[2].dims.length,H)),G=`${o?`value += bias[col / ${H}];`:`value += ${P.type.value}(bias[row + i]);`}`}let K=s.slice(0,-2),ie=a.slice(0,-2),M=Ye(K,w),Q=Ye(ie,w),re=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];xe(t,re);let O=(H,q)=>{let F=H.rank,E=H.name;if(F===2)return`var ${E}_indices = ${H.type.indices}(0u, 0u);`;let D=v.rank,ne=`var ${E}_indices: ${H.type.indices};`;for(let Ce=F-2-1,fe=D-1;Ce>=0;Ce--,fe--)ne+=`
${E}_indices[${Ce}] = ${D>1?`batch_indices[${fe}]`:"batch_indices"};`;return q.forEach(Ce=>{ne+=`
${E}_indices[${Ce}] = 0;`}),ne+=`${E}_indices[${F-2}] = 0u;
                     ${E}_indices[${F-1}] = 0u;`,ne},j=()=>{let H=`var a_data: ${I.type.value};`;for(let q=0;q<p;q++)H+=`
              let b_data${q} = b[(b_offset + (k + ${q}) * uniforms.N + col) / ${c}];`;for(let q=0;q<h;q++){H+=`a_data = a[(a_offset + (row + ${q}) * uniforms.K + k) / ${p}];`;for(let F=0;F<p;F++)H+=`
            values[${q}] = fma(${T.type.value}(a_data${p===1?"":`[${F}]`}), b_data${F}, values[${q}]);
`}return H};return`
  ${$.registerUniforms(re).registerInternalVariables(v).declareVariables(...Z,P)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${h};
    let row = (index1 % stride1) * ${h};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${v.offsetToIndices("batch")};`}
    ${O(I,M)}
    let a_offset = ${I.indicesToOffset("a_indices")};
    ${O(T,Q)}
    let b_offset = ${T.indicesToOffset("b_indices")};
    var values: array<${P.type.value}, ${h}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${j()}
    }
    for (var i = 0u; i < ${h}u; i++) {
      var value = values[i];
      ${G}
      ${R}
      let cur_indices = ${P.type.indices}(batch, row + i, col);
      let offset = ${P.indicesToOffset("cur_indices")};
      ${P.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${p};${h};${o}`,inputDependencies:f?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:_}},Wd=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Ji=e=>{Wd(e.inputs);let t=Ee.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];n<8&&r<8?e.compute(Gn(e.inputs,{activation:""},t)):e.compute(en(e.inputs,{activation:""},t))}});var Gd,qn,Hd,Fn,Kn,es,qd,Fd,jn,ts=k(()=>{"use strict";N();Hi();Xi();mt();Yi();Ue();Hn();Me();Gd=(e,t,n,r,o,i)=>{let s=e[0],a=e.slice(i?1:2,i?3:4),u=a.length,d=t[0],c=t.slice(2).map((m,f)=>m+(m-1)*(n[f]-1)),h=a.map((m,f)=>m+r[f]+r[f+u]).map((m,f)=>Math.floor((m-c[f]+o[f])/o[f]));return h.splice(0,0,s),h.splice(i?3:1,0,d),h},qn=[2,3,1,0],Hd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Fn=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let i=2;i<t[1].dims.length;++i)n[i-2]===0&&(n[i-2]=t[1].dims[i]);let r=e.pads.slice();Ke.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:r}),o},Kn=e=>{let t=Qt(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,s=e.kernel_shape,a=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:r,format:n,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},es=(e,t,n,r)=>{let o=n.format==="NHWC",i=Gd(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let v=[t[0]];if(o){let T=e.kernelCustomData.wT??e.compute(le(t[1],qn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=T),v.push(T)}else v.push(t[1]);t.length===3&&v.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Qi(v,n,i,r),{inputs:v}):e.compute(Zi(v,n,i,r),{inputs:v});return}let s=t.length===3,a=t[0].dims[o?1:2],u=t[0].dims[o?2:3],d=t[0].dims[o?3:1],l=t[1].dims[2],c=t[1].dims[3],p=i[o?1:2],h=i[o?2:3],m=i[o?3:1],f=o&&l===a&&c===u&&n.pads[0]===0&&n.pads[1]===0;if(f||l===1&&c===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let v=i[0],I,T,P,z=[];if(o){let G=e.kernelCustomData.wT??e.compute(le(t[1],qn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=G),f){let K=a*u*d;I=t[0].reshape([1,v,K]),T=G.reshape([1,K,m]),P=[1,v,m]}else I=t[0].reshape([v,a*u,d]),T=G.reshape([1,d,m]),P=[v,p*h,m];z.push(I),z.push(T)}else I=t[0].reshape([v,d,a*u]),T=t[1].reshape([1,m,d]),P=[v,m,p*h],z.push(T),z.push(I);s&&z.push(t[2]);let R=P[2],Z=z[0].dims[z[0].dims.length-1];R<8&&Z<8?e.compute(Gn(z,n,i,P,o,r),{inputs:z}):e.compute(en(z,n,i,P,o,r),{inputs:z});return}let w=!0,y=e.kernelCustomData.wT??e.compute(le(t[1],qn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let g=[t[0],y];s&&g.push(t[2]);let b=o?p*h:m,_=o?m:p*h,$=l*c*d;e.compute(Gi(g,n,i,b,_,$,s,w,r),{inputs:g})},qd=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),s=[1].concat(t.dilations),a=[1].concat(t.kernelShape),u=Fn({...t,pads:o,strides:i,dilations:s,kernelShape:a},r);es(e,r,u,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Fd=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",o=Fn(n,t),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Ki(t[0].dims,t[1].dims,n.strides,n.dilations,i,!1,r);e.compute(ji(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},jn=(e,t)=>{if(Hd(e.inputs,t),e.inputs[0].dims.length===3)qd(e,t);else if(e.inputs[0].dims.length===5)Fd(e,e.inputs,t);else{let n=Fn(t,e.inputs);es(e,e.inputs,n)}}});var Kd,ns,rs=k(()=>{"use strict";U();Ae();W();Ue();lt();Wn();mt();Kd=(e,t=!1,n,r,o=4)=>{let i=y=>{switch(y){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${r}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${y} is not supported.`)}},s=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,a=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,u=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",d=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",l=e?"row":"col",c=e?"col":"row",p=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${l} / outWidth;
      let outCol = ${l} % outWidth;

      let WRow = ${c} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${c} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${u}) || fract(xR) > 0.0) {
        return ${r}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${d}) || fract(xC) > 0.0) {
        return ${r}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${c} % inChannels;
      ${s}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,h=e?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${p}
      }
      return ${r}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${p}
      }
      return ${r}(0.0);`,m=`
      let col = colIn * ${o};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(o)}
      }
      return ${r}(0.0);
      `,f=$e(n,r);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${r} {
    ${e?h:m}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${r} {
    ${e?m:h}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${r}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${a}
      ${Yt(t)}
      ${f}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},ns=(e,t,n,r,o,i,s,a)=>{let u=t.format==="NHWC",d=u?e[0].dims[3]:e[0].dims[1],l=n[0],c=u?n[2]:n[3],p=u?n[1]:n[2],h=u?n[3]:n[1],m=u&&d%4===0&&d%3&&h%4===0,f=u?h:c*p,w=u?c*p:h,y=[8,8,1],g=r<=8?[4,1,1]:[4,4,1],b=[Math.ceil(f/y[0]/g[0]),Math.ceil(w/y[1]/g[1]),Math.ceil(l/y[2]/g[2])];X("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${b}`);let _=m?4:1,$=Math.max(y[0]*_,y[1]),v=m?4:1,I=[t.kernelShape[u?1:2],t.kernelShape[u?2:3]],T=[I[0]+(t.dilations[0]<=1?0:(I[0]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(I[1]-1)*(t.dilations[1]-1))],P=[T[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),T[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],z=[{type:6,data:r},{type:6,data:o},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:I},{type:6,data:P}];ve(t,z),z.push(...A(e[0].dims,e[1].dims));let R=["rank","rank"];s&&(z.push(...A(e[2].dims)),R.push("rank")),z.push(...A(n));let Z=G=>{let K=S("x",e[0].dataType,e[0].dims.length,v),ie=S("w",e[1].dataType,e[1].dims.length,1),M=C("result",e[0].dataType,n.length,v),Q=[K,ie],re="";if(s){let H=S("bias",e[2].dataType,e[2].dims.length,v);Q.push(H),re+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${H.type.value} {
            return bias[coords.${u?"w":"y"}${m?"/ 4":""}];
          }`}let O=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:I.length},{name:"pads",type:"i32",length:P.length}];xe(t,O);let j=Y(e[0].dataType,1);if(j!=="f16"&&j!=="f32")throw new Error(`elemType ${j} is not supported.`);return`
        ${Jt("uniforms.result_strides")}
        ${G.registerUniforms(O).declareVariables(...Q,M)};
        ${re}
        ${Kd(u,s,t,K.type.value,_)}
        ${m?ct(g,y,j,void 0,!u,$):pt(g,y,j,void 0,!u,$,!1,void 0,a)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${g};${y};${m}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:z}),getShaderSource:Z}}});var jd,Xn,os=k(()=>{"use strict";U();Ae();N();W();jd=(e,t,n,r,o,i=!1,s,a,u=!1)=>{let d=u?1:2,l=u?2:3,c=u?3:1,p=i?2:1,h=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${s}>`:s}) {
    result[flatIndex] = ${i?`vec4<${s}>`:s}(value);
  }`;r&&(h+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${s}>`:s} {
      return bias[coords.${u?"w":"y"}${i?"/ 4":""}];
    }`);let m=i?4:1,f=S("W",t[1].dataType,t[1].dims.length,m),w=S("Dy",t[0].dataType,t[0].dims.length,m),y=[w,f];r&&y.push(S("bias",t[2].dataType,[n[c]].length,m));let g=C("result",t[0].dataType,n.length,m),b=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${p};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${s}>, ${p}>;
        for (var i = 0; i < ${p}; i++) {
          dotProd[i] = vec4<${s}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${s}(dyCorner.x) + ${s}(wR)) / ${s}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${s}(dyCorner.y) + ${s}(wC)) / ${s}(uniforms.strides.y);
            let dyC2 = (${s}(dyCorner.y) + 1.0 + ${s}(wC)) / ${s}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${w.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${w.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${s}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${c}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${w.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${f.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${w.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${p}; i = i + 1) {
          let value = dotProd[i] + ${r?"bias[c+i]":`vec4<${s}>(0.0)`};
          ${g.set("batch","r","c + i","d1","value")};
        }
      }`,_=`
          let outputIndices = ${g.offsetToIndices("global_idx")};
          let batch = ${g.indicesGet("outputIndices",0)};
          let d1 = ${g.indicesGet("outputIndices",c)};
          let r = ${g.indicesGet("outputIndices",d)};
          let c = ${g.indicesGet("outputIndices",l)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${s}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${s}(dyRCorner) + ${s}(wR)) / ${s}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${d}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${s}(dyCCorner) + ${s}(wC)) / ${s}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${l}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${u?w.get("batch","idyR","idyC","inputChannel"):w.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${f.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${r?"bias[d1]":`${s}(0.0)`};
          ${g.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(a).declareVariables(...y,g)}
  ${h}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?b:_}}`},Xn=(e,t,n)=>{let r=e.length>2,o=t.outputShape,i=x.size(o),s=[Math.ceil(i/64),1,1];X("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let a=t.format==="NHWC",u=["rank","rank"],d=[t.strides[0],t.strides[1]],l=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],c=[t.dilations[0],t.dilations[1]],p=[l[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),l[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],h=[p[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),p[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],m=!1,f=t.group,w=e[1].dims,y=w[0]/f,g=w[1],b=[{type:12,data:i},{type:12,data:d},{type:12,data:l},{type:12,data:c},{type:12,data:p},{type:6,data:h},{type:12,data:y},{type:12,data:g},...A(e[0].dims,e[1].dims)];r&&(b.push(...A(e[2].dims)),u.push("rank")),b.push(...A(o));let _=s[1]===1&&s[2]===1,$=v=>{let I=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:d.length},{name:"filter_dims",type:"u32",length:l.length},{name:"dilations",type:"u32",length:l.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:h.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],T=Y(e[0].dataType);return`${jd(v,e,o,r,_,m,T,I,a)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:u},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:b}),getShaderSource:$}}});var Xd,Zd,Qd,is,ss,Yd,Jd,el,tl,as,us=k(()=>{"use strict";rs();os();Ue();Me();Xd=(e,t,n,r,o,i)=>(e-1)*t+n+(r-1)*o+1-i,Zd=(e,t,n,r,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=i,n[o]=e-i):t==="SAME_LOWER"&&(n[r]=e-i,n[o]=i)},Qd=(e,t,n,r,o,i,s,a,u,d)=>{let l=e.length-2,c=d.length===0;u.length<l&&u.push(...Array(l-u.length).fill(0));let p=e[0],h=t[a?3:1]*o;for(let m=0,f=e.length-l-(a?1:0);m<l;++m,++f){let w=e[f],y=c?w*s[m]:d[m],g=Xd(w,s[m],i[m],t[f],n[m],y);Zd(g,r,i,m,m+l),c&&d.push(s[m]*(w-1)+u[m]+(t[f]-1)*n[m]+1-i[m]-i[m+l])}d.splice(0,0,p),d.splice(a?3:1,0,h)},is=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,p)=>c*p,1)===0){n.length=0;for(let c=2;c<t[1].dims.length;++c)n.push(t[1].dims[c])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),s=e.outputPadding.slice(),a=t[0].dims,u=e.dilations.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;u=new Array(c).fill(1)}let d=e.strides.slice();if(d.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;d=new Array(c).fill(1)}Qd(a,n,u,e.autoPad,e.group,o,d,r,s,i);let l=Object.assign({},e);return Object.assign(l,{kernelShape:n,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:d}),l},ss=e=>{let t=Qt(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,s=e.kernelShape,a=e.pads,u=e.strides,d=e.wIsConst(),l=e.outputPadding,c=e.outputShape;return{autoPad:r,format:n,dilations:o,group:i,kernelShape:s,outputPadding:l,outputShape:c,pads:a,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Yd=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((l,c)=>l+c,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((l,c)=>l+c,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((l,c)=>l+c,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((l,c)=>l+c,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Jd=[2,3,1,0],el=(e,t,n)=>{let r=is(n,t),o=n.format==="NHWC",i=r.outputShape,s=i[o?3:1],a=t[0].dims[o?3:1];if(r.group!==1||s===1&&a===1){e.compute(Xn(t,r));return}let u=i[o?1:2],d=i[o?2:3],l=t[1].dims[2],c=t[1].dims[3],p=o?u*d:s,h=o?s:u*d,m=l*c*a,f=!0,w=e.kernelCustomData.wT??e.compute(le(t[1],Jd),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=w);let y=[t[0],w],g=t.length===3;g&&(!o&&t[2].dims.length===1?y.push(t[2].reshape([t[2].dims[0],1,1])):y.push(t[2])),e.compute(ns(y,r,i,p,h,m,g,f),{inputs:y})},tl=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=t.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=is({...t,pads:a,strides:s,dilations:i,kernelShape:o},r);e.compute(Xn(r,u,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]]))},as=(e,t)=>{Yd(e.inputs,t),e.inputs[0].dims.length===3?tl(e,t):el(e,e.inputs,t)}});var nl,ds,ls,cs=k(()=>{"use strict";U();N();ae();W();nl=(e,t,n,r)=>{let o=x.size(t),i=t.length,s=S("input",e,i),a=C("output",e,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),d=x.normalizeAxis(u,i),l=c=>{let p=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,h=B("uniforms.input_shape","uniforms.axis",i),m=r.reverse?p+(r.exclusive?" + 1":""):"0",f=r.reverse?h:p+(r.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${f};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:d},...A(t,t)]}),getShaderSource:l}},ds=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,o=e.inputs[1];e.compute(nl(r,n,o,t),{inputs:[0]})},ls=e=>{let t=e.exclusive===1,n=e.reverse===1;return V({exclusive:t,reverse:n})}});var rl,ol,il,ps,ms,fs=k(()=>{"use strict";U();N();ae();W();rl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ol=(e,t,n,r)=>{let o=[];o.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<t;++i)o.push(n.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},il=(e,t)=>{let n,r,o,i,s,a,u=t.format==="NHWC",d=t.blocksize,l=t.mode==="DCR";u?([n,r,o,i]=e.dims,s=l?[n,r,o,d,d,i/d**2]:[n,r,o,i/d**2,d,d],a=l?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=l?[n,d,d,i/d**2,r,o]:[n,i/d**2,d,d,r,o],a=l?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(s),p=c.dims.length,h=e.dataType,m=S("a",h,p),f=C("output",h,p),w=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,f)}

  ${ol(a,p,m,f)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${f.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${f.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:y=>{let g=u?[n,r*d,o*d,i/d**2]:[n,i/d**2,r*d,o*d],b=x.size(g),_=c.dims,$=x.sortBasedOnPerm(_,a);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...A(_,$)]}},getShaderSource:w}},ps=(e,t)=>{rl(e.inputs),e.compute(il(e.inputs[0],t))},ms=e=>V({blocksize:e.blocksize,mode:e.mode,format:e.format})});var Zn,nn,hs,sl,al,Qn,Yn,gs,ul,ys,bs,ws=k(()=>{"use strict";U();N();ae();W();Zn="[a-zA-Z]|\\.\\.\\.",nn="("+Zn+")+",hs="^"+nn+"$",sl="("+nn+",)*"+nn,al="^"+sl+"$",Qn=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,n){let r=this.symbolToIndices.get(t);r===void 0?r=[n]:r.push(n),this.symbolToIndices.set(t,r)}},Yn=class{constructor(t,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,o]=n.includes("->")?n.split("->",2):[n,""];if(!r.match(RegExp(al)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,u)=>{let d=t[u].dims.slice();if(!a.match(RegExp(hs)))throw new Error("Invalid LHS term");let l=this.processTerm(a,!0,d,u);this.lhs.push(l)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(nn)))throw new Error("Invalid RHS");o.match(RegExp(Zn,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,n,r){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(r)}else o={count:1,dimValue:n,inputIndices:[r]};this.symbolToInfo.set(t,o)}processTerm(t,n,r,o=-1){let i=r.length,s=!1,a=[],u=0;if(!t.match(RegExp(hs))&&!n&&t!=="")throw new Error("Invalid LHS term");let d=t.match(RegExp(Zn,"g")),l=new Qn(o);return d?.forEach((c,p)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let h=i-d.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(u,u+h),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<a.length;m++){let f=String.fromCharCode("0".charCodeAt(0)+m);l.addSymbol(f,p+m),this.addSymbol(f,r[u++],o)}}else l.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[u++],o)}),l}},gs=e=>e+"_max",ul=(e,t,n,r)=>{let i=e.map(l=>l.length).map((l,c)=>S(`input${c}`,t,l)),s=x.size(r),a=C("output",t,r.length),u=[...n.symbolToInfo.keys()].filter(l=>!n.rhs.symbolToIndices.has(l)),d=l=>{let c=[],p="var prod = 1.0;",h="var sum = 0.0;",m="sum += prod;",f=[],w=[],y=[],g=[],b=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach(($,v)=>{if(n.rhs.symbolToIndices.has(v)){let I=n.rhs.symbolToIndices.get(v)?.[0];I!==void 0&&n.lhs.forEach((T,P)=>{if($.inputIndices.includes(P)){let z=T.symbolToIndices.get(v);if(z===void 0)throw new Error("Invalid symbol error");z.forEach(R=>{c.push(`${i[P].indicesSet(`input${P}Indices`,R,a.indicesGet("outputIndices",I))}`)})}})}else n.lhs.forEach((I,T)=>{if($.inputIndices.includes(T)){let P=I.symbolToIndices.get(v);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(z=>{f.push(`${i[T].indicesSet(`input${T}Indices`,z,`${v}`)}`)}),g.push(`prod *= ${i[T].getByIndices(`input${T}Indices`)};`)}}),w.push(`for(var ${v}: u32 = 0; ${v} < uniforms.${gs(v)}; ${v}++) {`),y.push("}")});let _=b?[...c,`let sum = ${i.map(($,v)=>$.getByIndices(`input${v}Indices`)).join(" * ")};`]:[...c,h,...w,...f,p,...g,m,...y];return`
            ${l.registerUniforms(u.map($=>({name:`${gs($)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map(($,v)=>`var input${v}Indices: ${i[v].type.indices};`).join(`
`)}
            ${_.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let l=u.filter(p=>n.symbolToInfo.has(p)).map(p=>({type:12,data:n.symbolToInfo.get(p)?.dimValue||0}));l.push({type:12,data:s});let c=e.map((p,h)=>[...A(p)]).reduce((p,h)=>p.concat(h),l);return c.push(...A(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:d}},ys=(e,t)=>{let n=new Yn(e.inputs,t.equation),r=n.outputDims,o=e.inputs.map((i,s)=>i.dims);e.compute(ul(o,e.inputs[0].dataType,n,r))},bs=e=>{let t=e.equation.replace(/\s+/g,"");return V({equation:t})}});var dl,_s,ll,cl,$s,vs=k(()=>{"use strict";U();N();W();dl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;r<n.length&&o<t.length;++r,++o)if(n[r]!==t[o]&&n[r]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},_s=(e,t)=>{let n=e.length-t.length,r=[];for(let o=0;o<n;++o)r.push(e[o]);for(let o=0;o<t.length;++o)r.push(t[o]===1?e[o+n]:t[o]);return r},ll=(e,t)=>e.length>t.length?_s(e,t):_s(t,e),cl=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=ll(t,n),o=e[0].dataType,i=o===9?4:1,s=Math.ceil(x.size(r)/i),a=d=>{let l=S("input",o,t.length,i),c=C("output",o,r.length,i),p;if(o===9){let h=(m,f,w="")=>`
          let outputIndices${f} = ${c.offsetToIndices(`outputOffset + ${f}u`)};
          let offset${f} = ${l.broadcastedIndicesToOffset(`outputIndices${f}`,c)};
          let index${f} = offset${f} / 4u;
          let component${f} = offset${f} % 4u;
          ${m}[${f}] = ${w}(${l.getByOffset(`index${f}`)}[component${f}]);
        `;p=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${h("data",0,"u32")}
        ${h("data",1,"u32")}
        ${h("data",2,"u32")}
        ${h("data",3,"u32")}
        ${c.setByOffset("global_idx","data")}
      }`}else p=`
        let outputIndices = ${c.offsetToIndices("global_idx")};
        let inputOffset = ${l.broadcastedIndicesToOffset("outputIndices",c)};
        ${c.setByOffset("global_idx",l.getByOffset("inputOffset"))}
      }`;return`
    ${d.registerUniform("vec_size","u32").declareVariables(l,c)}
    ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${p}`},u=[{type:12,data:s},...A(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},$s=e=>{dl(e.inputs),e.compute(cl(e.inputs),{inputs:[0]})}});var pl,xs,Ss=k(()=>{"use strict";U();N();W();Zt();pl=e=>{let t=e[0].dataType,n=x.size(e[0].dims),r=x.size(e[1].dims),o=r%4===0,i=s=>{let a=S("x",t,[1],4),u=S("bias",t,[1],4),d=C("y",t,[1],4),l=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=h=>`
      let bias${h}_offset: u32 = (global_idx * 4 + ${h}) % uniforms.bias_size;
      let bias${h} = ${u.getByOffset(`bias${h}_offset / 4`)}[bias${h}_offset % 4];`,p=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(l).declareVariables(a,u,d)}

    ${Ln(de(t))}

    ${s.mainStart(je)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Nn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/je/4)}})}},xs=e=>{e.inputs.length<2||x.size(e.inputs[1].dims)===0?$i(e):e.compute(pl(e.inputs))}});var ml,fl,Is,Ts,Cs=k(()=>{"use strict";U();N();ae();W();ml=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},fl=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,i=x.normalizeAxis(t.axis,o),s=n.slice(0);s.splice(i,1,...r);let a=n[i],u=e[0].dataType===9?4:1,d=Math.ceil(x.size(s)/u),l=[{type:12,data:d},{type:6,data:a},{type:12,data:i},...A(e[0].dims,e[1].dims,s)],c=p=>{let h=S("data",e[0].dataType,e[0].dims.length,u),m=S("inputIndices",e[1].dataType,e[1].dims.length),f=C("output",e[0].dataType,s.length,u),w=g=>{let b=r.length,_=`var indicesIndices${g}  = ${m.type.indices}(0);`;for(let $=0;$<b;$++)_+=`${b>1?`indicesIndices${g}[${$}]`:`indicesIndices${g}`} = ${s.length>1?`outputIndices${g}[uniforms.axis + ${$}]`:`outputIndices${g}`};`;_+=`
          var idx${g} = ${m.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${h.type.indices};
        `;for(let $=0,v=0;$<o;$++)$===i?(_+=`${o>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = u32(idx${g});`,v+=b):(_+=`${o>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = ${s.length>1?`outputIndices${g}[${v}]`:`outputIndices${g}`};`,v++);return _},y;if(e[0].dataType===9){let g=(b,_,$="")=>`
          let outputIndices${_} = ${f.offsetToIndices(`outputOffset + ${_}u`)};
          ${w(_)};
          let offset${_} = ${h.indicesToOffset(`dataIndices${_}`)};
          let index${_} = offset${_} / 4u;
          let component${_} = offset${_} % 4u;
          ${b}[${_}] = ${$}(${h.getByOffset(`index${_}`)}[component${_}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${f.setByOffset("global_idx","value")}
      `}else y=`
      let outputIndices = ${f.offsetToIndices("global_idx")};
      ${w("")};
      let value = ${h.getByIndices("dataIndices")};
      ${f.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,f)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:c}},Is=e=>V({axis:e.axis}),Ts=(e,t)=>{let n=e.inputs;ml(n),e.compute(fl(e.inputs,t))}});var hl,gl,As,ks,Es=k(()=>{"use strict";U();N();ae();W();hl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=x.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,o=e[0],i=e[2],s=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===n?Math.ceil(a/r)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},gl=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,i=x.normalizeAxis(t.gatherAxis,o),s=x.normalizeAxis(t.quantizeAxis,o),a=n.slice(0);a.splice(i,1,...r);let u=x.size(a),d=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:t.blockSize},...A(...e.map((m,f)=>m.dims),a)],h=m=>{let f=S("data",e[0].dataType,e[0].dims.length),w=S("inputIndices",e[1].dataType,e[1].dims.length),y=S("scales",e[2].dataType,e[2].dims.length),g=e.length>3?S("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=C("output",d,a.length),_=[f,w,y];g&&_.push(g);let $=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${m.registerUniforms($).declareVariables(..._,b)}
        ${m.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${(()=>r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${f.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${f.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${f.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${f.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${f.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${f.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${y.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${y.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${y.getByIndices("scale_indices")};
        ${(()=>g?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${g.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${g.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${de(d)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((m,f)=>f!==1).map(m=>m.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(m,f)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:h}},As=(e,t)=>{let n=e.inputs;hl(n,t),e.compute(gl(e.inputs,t))},ks=e=>V({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var yl,bl,Ps,zs,Bs=k(()=>{"use strict";U();N();ae();W();yl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},bl=(e,t)=>{let n=e[0].dims,r=e[0].dataType,o=n.length,i=e[1].dims,s=e[1].dataType,a=x.normalizeAxis(t.axis,o),u=n[a],d=i.slice(0),l=x.size(d),c=S("input",r,o),p=S("indicesInput",s,i.length),h=C("output",r,d.length),m=[{type:12,data:l},{type:6,data:u},{type:12,data:a}];return m.push(...A(n,i,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:m}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,h)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${h.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${h.setByOffset("global_idx","value")};
  }`}},Ps=e=>V({axis:e.axis}),zs=(e,t)=>{let n=e.inputs;yl(n),e.compute(bl(e.inputs,t))}});var wl,_l,Ds,Os,Rs=k(()=>{"use strict";U();N();W();wl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},_l=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[o,i,s]=Ht.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=x.size(a),d=[{type:12,data:u},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],l=["type","type"];e.length===3&&(d.push(...A(e[2].dims)),l.push("rank")),d.push(...A(a));let c=p=>{let h="";t.transA&&t.transB?h="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?h="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?h="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(h="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let m=t.alpha===1?"":"value *= uniforms.alpha;",f=S("a",e[0].dataType,e[0].dims),w=S("b",e[1].dataType,e[1].dims),y=f.type.value,g=null,b=[f,w];e.length===3&&(g=S("c",e[2].dataType,e[2].dims.length),b.push(g));let _=C("output",e[0].dataType,a.length);b.push(_);let $=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${p.registerUniforms($).declareVariables(...b)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${y}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${h}
    }

    ${m}
    ${(()=>g!=null?`let cOffset = ${g.broadcastedIndicesToOffset("vec2(m, n)",_)}; value += ${y}(uniforms.beta) * ${g.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},Ds=e=>{let t=e.transA,n=e.transB,r=e.alpha,o=e.beta;return{transA:t,transB:n,alpha:r,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Os=(e,t)=>{wl(e.inputs),e.compute(_l(e.inputs,t))}});var be,xl,Us,Ms,Sl,ft,Vs,Jn=k(()=>{"use strict";U();N();ae();Gt();jt();W();Me();be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,xl=(e,t)=>{let n=e[0],r=be(e,1),o=be(e,2),i=be(e,3),s=be(e,4),a=be(e,5),u=be(e,6),d=be(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=n.dims[0],c=n.dims[1],p=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],h=c,m=0,f=0,w=Math.floor(p/t.numHeads);if(u&&d&&x.size(u.dims)&&x.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[3]!==w)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[3]!==w)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],f=u.dims[2]}else if(u&&x.size(u.dims)||d&&x.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(r&&x.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,h=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(i&&x.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=m+h,b=0;if(s&&x.size(s.dims)>0){b=8;let I=s.dims;throw I.length===1?I[0]===l?b=1:I[0]===3*l+2&&(b=3):I.length===2&&I[0]===l&&I[1]===g&&(b=5),b===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let _=!1,$=p;if(o&&x.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(h!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=o.dims[2]}else{if(h!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');$=o.dims[1]*o.dims[3],_=!0}}let v=!1;if(s&&x.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&x.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==l||a.dims[1]!==t.numHeads||a.dims[2]!==c||a.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:g,maxSequenceLength:f,inputHiddenSize:0,hiddenSize:p,vHiddenSize:$,headSize:w,vHeadSize:Math.floor($/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:v,passPastInKv:_,qkvFormat:y}},Us=e=>V({...e}),Ms=V({perm:[0,2,1,3]}),Sl=(e,t,n,r,o,i,s)=>{let a=[r,o,i],u=x.size(a),d=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],l=c=>{let p=C("qkv_with_bias",t.dataType,a),h=S("qkv",t.dataType,a),m=S("bias",n.dataType,a),f=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(f).declareVariables(h,m,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:l},{inputs:[t,n],outputs:[-1]})[0]},ft=(e,t,n,r,o,i,s,a)=>{let u=i;if(s&&x.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=Sl(e,i,s,t,r,n*o,a),u=u.reshape([t,r,n,o]),n===1||r===1?u:e.compute(le(u,Ms.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([t,r,n,o])),n===1||r===1?u:e.compute(le(u,Ms.perm),{inputs:[u],outputs:[-1]})[0]},Vs=(e,t)=>{let n=xl(e.inputs,t),r=e.inputs[0],o=be(e.inputs,1),i=be(e.inputs,2),s=be(e.inputs,3),a=be(e.inputs,4),u=be(e.inputs,5),d=be(e.inputs,6),l=be(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&i&&o.dims.length===4&&i.dims.length===4,p=ft(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(c)return Je(e,p,o,i,a,void 0,d,l,u,n,t);if(!o||!i)throw new Error("key and value must be provided");let h=ft(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),m=ft(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);Je(e,p,h,m,a,void 0,d,l,u,n,t)}});var Ls,Il,Tl,er,Ns,tr=k(()=>{"use strict";U();N();W();Ls=e=>Array.from(e.getBigInt64Array(),Number),Il=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ls(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Tl=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},er=(e,t)=>{let n=e[0].dims,r=t??Ls(e[1]),o=Tl(n,r),i=x.size(o),s=e[0].dataType,a=S("input",s,n.length),u=C("output",s,o.length),d=l=>`
      const inputShape = ${a.indices(...n)};
      ${l.registerUniform("output_size","u32").declareVariables(a,u)}
      ${l.mainStart()}
      ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...A(e[0].dims,o)]}),getShaderSource:d}},Ns=e=>{Il(e.inputs),e.compute(er(e.inputs),{inputs:[0]})}});var Cl,Ws,Hs,Al,Gs,qs,Fs=k(()=>{"use strict";U();N();ae();jt();W();Jn();tr();Me();Cl=(e,t)=>{let n=e[0],r=e[1],o=e[2],i=e[3],s=e[4];if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=n.dims[0],d=n.dims[1],l=n.dims.length===3?a?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],c=d,p=0,h=0,m=Math.floor(l/t.numHeads),f=i&&i.dims.length!==0,w=s&&s.dims.length!==0,y=!0;if(f&&w){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y?(p=i.dims[1],h=i.dims[1]):(p=i.dims[2],h=i.dims[2])}else if(f||w)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g;if(r){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');g=2,c=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');g=5,c=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=0,c=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let b=0,_=!1,$=l;if(o){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');$=o.dims[1]*o.dims[3],_=!0}}let v=p+c,I=!1;return{batchSize:u,sequenceLength:d,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:v,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:l,vHiddenSize:$,headSize:m,vHeadSize:Math.floor($/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:I,passPastInKv:_,qkvFormat:g,isPastkvBSNH:y}},Ws=(e,t,n,r)=>{let o=[r.batchSize,r.totalSequenceLength,r.kvNumHeads,r.headSize],i=4,s=x.size(o)/i,a=r.totalSequenceLength,u=C("present_kv",n,o.length,i),d=S("new_kv",e.dataType,e.dims.length,i),l=t?S("past_kv",t.dataType,t.dims.length,i):void 0,c=Math.ceil(r.headSize/i),p={x:a,y:e.dims[0],z:1},h=t?["rank","rank"]:["rank"],m=[{type:12,data:s},{type:12,data:r.pastSequenceLength},{type:12,data:r.kvSequenceLength},{type:12,data:r.totalSequenceLength}],f=[d];l?(m.push(...A(e.dims),...A(t.dims),...A(o)),f.push(l)):m.push(...A(e.dims),...A(o));let w=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],y=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,g=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,b=t?`if (s < past_seqlen) {
        ${y}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${g}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${g}
        }`,_=$=>`

  ${$.registerUniforms(w).declareVariables(...f,u)}
  ${$.mainStart([c,r.kvNumHeads,1])}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${u.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${r.kvNumHeads}u;
    let H = ${c}u;

    let present_seqlen = uniforms.present_seqlen;
    let present_batch_stride = present_seqlen * num_heads * H;
    var row_stride = H;
    let is_bsnh = ${r.isPastkvBSNH};

    if (is_bsnh) {
      row_stride = num_heads * H;
    }
    var present_head_stride = present_seqlen * H;
    if (is_bsnh) {
      present_head_stride = H;
    }

    let past_seqlen = uniforms.past_seqlen;

    let out_offset = b * present_batch_stride + s * row_stride + n * present_head_stride + h;
    ${b}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${r.kvNumHeads}${c}${!!t}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:p,programUniforms:m}),getShaderSource:_}},Hs=e=>V({...e}),Al=V({perm:[0,2,1,3]}),Gs=(e,t,n,r,o)=>{let i=t,s=r.kvNumHeads,a=r.nReps;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,s,r.headSize])),n?i=e.compute(Ws(i,n,i.dataType,r),{inputs:[i,n],outputs:[r.isPastkvBSNH?o:-1]})[0]:i=e.compute(Ws(i,void 0,i.dataType,r),{inputs:[i],outputs:[r.isPastkvBSNH?o:-1]})[0],a!==1&&(i=e.compute(er([i],[1,1,1,a]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([r.batchSize,r.totalSequenceLength,s*a,r.headSize])),e.compute(le(i,Al.perm),{inputs:[i],outputs:[-1]})[0]},qs=(e,t)=>{let n=Cl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=ft(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,e.inputs[0],void 0,0),o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,i=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,s=Gs(e,e.inputs[1],o,n,1),a=Gs(e,e.inputs[2],i,n,2);Je(e,r,s,a,void 0,void 0,void 0,void 0,void 0,n,t)}});var Ks,kl,El,js,Xs=k(()=>{"use strict";U();N();Me();W();Ks=(e,t,n,r,o,i,s,a)=>{let u=te(i),d=u===1?"f32":`vec${u}f`,l=u===1?"vec2f":`mat2x${u}f`,c=o*s,p=[o,s,i/u],h=[o,s,2],m=["rank","type","type"],f=[];f.push(...A(p,h));let w=y=>{let g=S("x",t.dataType,3,u),b=S("scale",n.dataType,n.dims),_=S("bias",r.dataType,r.dims),$=C("output",1,3,2),v=[g,b,_,$],I=64;return`
  var<workgroup> workgroup_shared : array<${l}, ${I}>;
  const workgroup_size = ${I}u;
  ${y.declareVariables(...v)}
  ${y.mainStart(I)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${g.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${l}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${ke("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${ke("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:h,dataType:1}],dispatchGroup:{x:c},programUniforms:f}),getShaderSource:w},{inputs:[t,n,r],outputs:[-1]})[0]},kl=(e,t,n)=>{let r=t[0].dims,o=r,i=2,s=r[0],a=r[1],u=x.sizeFromDimension(r,i),d=te(u),l=x.size(o)/d,c=Ks(e,t[0],t[1],t[2],s,u,a,n.epsilon),p=[s,a,u/d],h=[s,a],m=["type","none"],f=w=>{let y=S("x",t[0].dataType,p.length,d),g=S("scale_shift",1,h.length,2),b=C("output",t[0].dataType,p.length,d),_=[y,g,b];return`
  ${w.registerUniform("output_size","u32").declareVariables(..._)}
  ${w.mainStart()}
  ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${b.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${y.getByOffset("global_idx")} * ${b.type.value}(scale_shift.x) + ${b.type.value}(scale_shift.y);
      ${b.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:[{type:12,data:l},...A(p,h,p)]}),getShaderSource:f},{inputs:[t[0],c]})},El=(e,t,n)=>{let r=t[0].dims,o=r,i=r[0],s=r[r.length-1],a=x.sizeFromDimension(r,1)/s,u=te(s),d=x.size(o)/u,l=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],c=["type","type"],p=[0,r.length-1];for(let w=0;w<r.length-2;w++)p.push(w+1);let h=e.compute(le(e.inputs[0],p),{inputs:[e.inputs[0]],outputs:[-1]})[0],m=Ks(e,h,t[1],t[2],i,a,s,n.epsilon),f=w=>{let y=Y(t[0].dataType),g=u===1?"vec2f":`mat${u}x2f`,b=v=>{let I=v===0?"x":"y",T=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${y}(${T}(scale.${I}))`;case 2:return`vec2<${y}>(${T}(scale[0].${I}, scale[1].${I}))`;case 4:return`vec4<${y}>(${T}(scale[0].${I}, scale[1].${I}, scale[2].${I}, scale[3].${I}))`;default:throw new Error(`Not supported compoents ${u}`)}},_=S("input",t[0].dataType,t[0].dims,u),$=C("output",t[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${_.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${g}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${$.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${w.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${b(0)}, ${b(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}),getShaderSource:f},{inputs:[t[0],m]})},js=(e,t)=>{t.format==="NHWC"?El(e,e.inputs,t):kl(e,e.inputs,t)}});var Pl,zl,Zs,Qs=k(()=>{"use strict";U();N();W();Pl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},zl=(e,t,n)=>{let r=t.simplified,o=e[0].dims,i=e[1],s=!r&&e[2],a=o,u=x.normalizeAxis(t.axis,o.length),d=x.sizeToDimension(o,u),l=x.sizeFromDimension(o,u),c=x.size(i.dims),p=s?x.size(s.dims):0;if(c!==l||s&&p!==l)throw new Error(`Size of X.shape()[axis:] == ${l}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let h=[];for(let $=0;$<o.length;++$)$<u?h.push(o[$]):h.push(1);let m=te(l),f=["type","type"],w=[{type:12,data:d},{type:1,data:l},{type:12,data:Math.floor(l/m)},{type:1,data:t.epsilon}];s&&f.push("type");let y=n>1,g=n>2,b=$=>{let v=Y(e[0].dataType),I=[S("x",e[0].dataType,e[0].dims,m),S("scale",i.dataType,i.dims,m)];s&&I.push(S("bias",s.dataType,s.dims,m)),I.push(C("output",e[0].dataType,a,m)),y&&I.push(C("mean_data_output",1,h)),g&&I.push(C("inv_std_output",1,h));let T=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${$.registerUniforms(T).declareVariables(...I)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Rn("f32",m)};
    var mean_square_vector = ${Rn("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Xe(v,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${ke("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${ke("mean_square_vector",m)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Xe(v,m,"x[j + offset]")};
      let f32scale = ${Xe(v,m,"scale[j]")};
      output[j + offset] = ${I[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Xe(v,m,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},_=[{dims:a,dataType:e[0].dataType}];return y&&_.push({dims:h,dataType:1}),g&&_.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${n};${r}`,inputDependencies:f},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:w}),getShaderSource:b}},Zs=(e,t)=>{Pl(e.inputs),e.compute(zl(e.inputs,t,e.outputCount))}});var Bl,Dl,Ol,Ys,Js,ea=k(()=>{"use strict";U();N();ae();W();Bl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,s=e[1];if(!x.areEqual(s.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(x.size(u)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,c=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(x.size(l)!==c)throw new Error("zeroPoints input size error.")}},Dl=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],i=t.k,s=t.n,a=n.slice(0,r-2),u=x.size(a),l=e[1].dims[2]/4,c=e[0].dataType,p=te(t.k),h=te(l),m=te(s),f=a.concat([o,s]),w=o>1&&s/m%2===0?2:1,y=x.size(f)/m/w,g=64,b=[],_=[u,o,i/p],$=x.convertShape(e[1].dims).slice();$.splice(-1,1,l/h),b.push(...A(_)),b.push(...A($)),b.push(...A(e[2].dims)),e.length===4&&b.push(...A(x.convertShape(e[3].dims)));let v=[u,o,s/m];b.push(...A(v));let I=T=>{let P=_.length,z=S("a",e[0].dataType,P,p),R=S("b",12,$.length,h),Z=S("scales",e[2].dataType,e[2].dims.length),G=[z,R,Z],K=e.length===4?S("zero_points",12,e[3].dims.length):void 0;K&&G.push(K);let ie=v.length,M=C("output",e[0].dataType,ie,m),Q=Y(e[0].dataType),re=(()=>{switch(p){case 1:return`array<${Q}, 8>`;case 2:return`mat4x2<${Q}>`;case 4:return`mat2x4<${Q}>`;default:throw new Error(`${p}-component is not supported.`)}})(),O=()=>{let q=`
          // reuse a data
            var input_offset = ${z.indicesToOffset(`${z.type.indices}(batch, row, word_offset)`)};
            var a_data: ${re};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${z.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let F=0;F<m*w;F++)q+=`
            b_value = ${h===1?`b${F}_data`:`b${F}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${re}(${Array.from({length:4},(E,D)=>`${Q}(b_value_lower[${D}]), ${Q}(b_value_upper[${D}])`).join(", ")});
            b_dequantized_values = ${(()=>p===1?`${re}(${Array.from({length:8},(E,D)=>`(b_quantized_values[${D}] - ${K?`zero_point${F}`:"zero_point"}) * scale${F}`).join(", ")});`:`(b_quantized_values - ${re}(${Array(8).fill(`${K?`zero_point${F}`:"zero_point"}`).join(",")})) * scale${F};`)()};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(F/m)}]${m>1?`[${F%m}]`:""} += ${Array.from({length:8/p},(E,D)=>`${p===1?`a_data[${D}] * b_dequantized_values[${D}]`:`dot(a_data[${D}], b_dequantized_values[${D}])`}`).join(" + ")};
          `;return q},j=()=>{let q=`
            var col_index = col * ${m};
            ${K?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Q}(8);`}
            `;for(let F=0;F<m*w;F++)q+=`
            let scale${F} = ${Z.getByOffset("col_index * nBlocksPerCol + block")};
            ${K?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${K.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${F} = ${Q}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return q},H=()=>{let q=`col_index = col * ${m};`;for(let F=0;F<m*w;F++)q+=`
            let b${F}_data = ${R.getByIndices(`${R.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return q+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${re};
            var b_dequantized_values: ${re};`,q};return`
        var<workgroup> workgroup_shared: array<${M.type.value}, ${w*g}>;
        ${T.declareVariables(...G,M)}
        ${T.mainStart([g,1,1])}
          let output_indices = ${M.offsetToIndices(`(global_idx / ${g}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${j()}
            for (var word: u32 = 0; word < ${l}; word += ${h}) {
              ${H()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${O()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${M.type.value} = ${M.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${M.setByIndices(`${M.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${h};${m};${w};${g}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:f,dataType:c}],dispatchGroup:{x:y},programUniforms:b}),getShaderSource:I}},Ol=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],i=t.k,s=t.n,a=n.slice(0,r-2),u=x.size(a),l=e[1].dims[2]/4,c=e[0].dataType,p=te(t.k),h=te(l),m=a.concat([o,s]),f=128,w=s%8===0?8:s%4===0?4:1,y=f/w,g=y*h*8,b=g/p,_=g/t.blockSize,$=x.size(m)/w,v=[],I=[u,o,i/p],T=x.convertShape(e[1].dims).slice();T.splice(-1,1,l/h),v.push(...A(I)),v.push(...A(T)),v.push(...A(e[2].dims)),e.length===4&&v.push(...A(x.convertShape(e[3].dims)));let P=[u,o,s];v.push(...A(P));let z=R=>{let Z=I.length,G=S("a",e[0].dataType,Z,p),K=S("b",12,T.length,h),ie=S("scales",e[2].dataType,e[2].dims.length),M=[G,K,ie],Q=e.length===4?S("zero_points",12,e[3].dims.length):void 0;Q&&M.push(Q);let re=P.length,O=C("output",e[0].dataType,re),j=Y(e[0].dataType),H=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${G.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${O.type.value}, ${y}>, ${w}>;
        ${R.declareVariables(...M,O)}
        ${R.mainStart([y,w,1])}
          let output_indices = ${O.offsetToIndices(`workgroup_index * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${_} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${f})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${G.getByIndices(`${G.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${G.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${_} + local_id.x;
            ${Q?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${j}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${j}(8);`}
            let scale = ${ie.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${K.getByIndices(`${K.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${H()}
              let b_value = ${h===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${j}>(${Array.from({length:4},(q,F)=>`${j}(b_value_lower[${F}]), ${j}(b_value_upper[${F}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${j}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(q,F)=>`${`dot(a_data${F}, b_dequantized_values[${F}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${O.type.value} = ${O.type.value}(0);
            for (var b = 0u; b < ${y}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${O.setByIndices(`${O.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${h};${y};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x:$},programUniforms:v}),getShaderSource:z}},Ys=(e,t)=>{Bl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Ol(e.inputs,t)):e.compute(Dl(e.inputs,t))},Js=e=>V(e)});var Rl,Ml,Ul,Vl,Ll,Nl,Wl,Gl,ta,na=k(()=>{"use strict";U();N();W();Rl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Ml=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
            k = i32(${e.indicesGet("indices",o)}) - ${B("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${B("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${B("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},Ul=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${B("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${B("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${B("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${B("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Vl=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${B("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${B("uniforms.x_shape",o,t)})) {
                  k = i32(${B("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${B("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Ll=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${B("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${B("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${B("uniforms.x_shape",o,t)})) {
                  k -= i32(${B("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${B("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Nl=(e,t,n)=>{switch(n.mode){case 0:return Ml(e,t,n.pads.length);case 1:return Ul(e,t,n.pads.length);case 2:return Vl(e,t,n.pads.length);case 3:return Ll(e,t,n.pads.length);default:throw new Error("Invalid mode")}},Wl=(e,t)=>{let n=x.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,o=x.size(n),i=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&i.push({type:s?e[2].dataType:1,data:t.value}),i.push(...A(e[0].dims,n));let a=["rank"],u=d=>{let l=C("output",e[0].dataType,n.length),c=S("x",e[0].dataType,r.length),p=c.type.value,h=Nl(l,r.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:s?p:"f32"}),`
            ${d.registerUniforms(m).declareVariables(c,l)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${l.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${h}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(n)/64)},programUniforms:i}),getShaderSource:u}},Gl=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let a=e[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(n[u]),i[Number(a[u])+o]=Number(n[u+a.length])}else n.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:t.mode,value:r,pads:s}}else return t},ta=(e,t)=>{Rl(e.inputs);let n=Gl(e.inputs,t);e.compute(Wl(e.inputs,n),{inputs:[0]})}});var rn,ra,oa,ia,sa,Hl,ql,aa,ua,da,la,ca,pa,ma,fa,ha,ga,ya,ba,wa=k(()=>{"use strict";Se();U();N();W();rn=e=>{if(ee.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ra=(e,t,n)=>{let r=t.format==="NHWC",o=e.dims.slice();r&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),a=t.strides.slice(),u=i?t.dilations.slice():[],d=t.pads.slice();Ke.adjustPoolAttributes(n,o,s,a,u,d);let l=Ke.computePoolOutputShape(n,o,a,u,s,d,t.autoPad),c=Object.assign({},t);i?Object.assign(c,{kernelShape:s,strides:a,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:s,strides:a,pads:d,cacheKey:t.cacheKey});let p=l.slice();return p.push(p.splice(1,1)[0]),[c,r?p:l]},oa=(e,t)=>{let n=t.format==="NHWC",r=x.size(e),o=x.size(t.kernelShape),i=[{type:12,data:r},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let a=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],l=t.pads[t.pads.length-1],c=!!(d+l);i.push({type:12,data:a},{type:12,data:u},{type:12,data:d},{type:12,data:l}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){let h=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],f=t.pads[t.pads.length/2-2],w=t.pads[t.pads.length-2];p=!!(f+w),i.push({type:12,data:h},{type:12,data:m},{type:12,data:f},{type:12,data:w}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,c,p]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=x.computeStrides(t.kernelShape);i.push({type:12,data:a},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,l)=>d+l);return[i,s,!!u,!1,!1]}},ia=(e,t,n,r,o,i,s,a,u,d,l,c)=>{let p=o.format==="NHWC",h=t.type.value,m=C("output",t.type.tensor,r);if(o.kernelShape.length<=2){let f="",w="",y="",g=n-(p?2:1);if(l?f=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:f=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let _=n-(p?3:2);c?w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${_}] < 0 || xIndices[${_}] >= uniforms.x_shape[${_}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:w=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${h}(${a});
              var pad = 0;
              ${w}
              ${f}
              ${y}
              ${s}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let f=o.kernelShape.length,w=o.pads.length,y="";return d?y=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:y=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${f}>;

              var value = ${h}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${f-1}u; j++) {
                  offsets[j] = offset / ${B("uniforms.kernelStrides","j",f)};
                  offset -= offsets[j] * ${B("uniforms.kernelStrides","j",f)};
                }
                offsets[${f-1}] = offset;

                isPad = false;
                for (var j = ${n-f}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${B("uniforms.strides",`j - ${n-f}u`,f)}
                    + offsets[j - ${n-f}u] - ${B("uniforms.pads","j - 2u",w)};
                  ${y}
              }
              ${s}

              output[global_idx] = value;
            }`}},sa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Hl=e=>`${sa(e)};${e.countIncludePad}`,ql=e=>`${sa(e)};${e.storageOrder};${e.dilations}`,aa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ua=(e,t,n,r)=>{let[o,i]=ra(t,r,n),s=S("x",t.dataType,t.dims.length),a=s.type.value,u="value += x_val;",d="";o.countIncludePad?d+=`value /= ${a}(uniforms.kernelSize);`:d+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[l,c,p,h,m]=oa(i,o);l.push(...A(t.dims,i));let f=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${p};${h};${m}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(i)/64)},programUniforms:l}),getShaderSource:w=>ia(w,s,t.dims.length,i.length,o,u,d,0,c,p,h,m)}},da=e=>{let t=e.count_include_pad!==0,n=aa(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:Hl(r)}},la=(e,t)=>{rn(e.inputs),e.compute(ua("AveragePool",e.inputs[0],!1,t))},ca={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},pa=e=>{let t=e.format;return{format:t,...ca,cacheKey:t}},ma=(e,t)=>{rn(e.inputs),e.compute(ua("GlobalAveragePool",e.inputs[0],!0,t))},fa=(e,t,n,r)=>{let[o,i]=ra(t,r,n),s=`
      value = max(x_val, value);
    `,a="",u=S("x",t.dataType,t.dims.length),d=["rank"],[l,c,p,h,m]=oa(i,o);return l.push(...A(t.dims,i)),{name:e,shaderCache:{hint:`${r.cacheKey};${p};${h};${m}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(i)/64)},programUniforms:l}),getShaderSource:f=>ia(f,u,t.dims.length,i.length,o,s,a,t.dataType===10?-65504:-1e5,c,p,h,m)}},ha=(e,t)=>{rn(e.inputs),e.compute(fa("MaxPool",e.inputs[0],!1,t))},ga=e=>{let t=e.storage_order,n=e.dilations,r=aa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...r,cacheKey:""};return{...o,cacheKey:ql(o)}},ya=e=>{let t=e.format;return{format:t,...ca,cacheKey:t}},ba=(e,t)=>{rn(e.inputs),e.compute(fa("GlobalMaxPool",e.inputs[0],!0,t))}});var Kl,jl,_a,$a,va=k(()=>{"use strict";U();N();ae();W();Kl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},jl=(e,t)=>{let n=x.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,o=r===3,i=e[0].dims,s=e[1].dataType,a=x.size(i),u=r===3||r===2,d=u?[Math.ceil(x.size(e[0].dims)/4)]:e[0].dims,l=e[1].dims,c=e.length>2?e[2]:void 0,p=c?u?[Math.ceil(x.size(c.dims)/4)]:c.dims:void 0,h=l.length===0||l.length===1&&l[0]===1,m=h===!1&&l.length===1,f=te(a),w=h&&(!u||f===4),y=w?f:1,g=w&&!u?f:1,b=S("input",u?12:r,d.length,g),_=S("scale",s,l.length),$=c?S("zero_point",u?12:r,p.length):void 0,v=C("output",s,i.length,y),I=[b,_];$&&I.push($);let T=[d,l];c&&T.push(p);let P=[{type:12,data:a/y},{type:12,data:n},{type:12,data:t.blockSize},...A(...T,i)],z=R=>{let Z=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${R.registerUniforms(Z).declareVariables(...I,v)}
      ${R.mainStart()}
          ${R.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${v.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${b.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${b.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>h?`let scale_value= ${_.getByOffset("0")}`:m?`
            let scale_index = ${v.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${_.getByOffset("scale_index")};`:`
            var scale_indices: ${_.type.indices} = output_indices;
            let index = ${_.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${_.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${_.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>$?h?u?`
                let zero_point_input = ${$.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${$.getByOffset("0")}`:m?u?`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${$.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${$.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${_.indicesToOffset("scale_indices")};
                let zero_point_input = ${$.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${$.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":b.type.value}(0);`)()};
      // Compute and write output
      ${v.setByOffset("global_idx",`${v.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getShaderSource:z,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/y/64),y:1,z:1},programUniforms:P})}},_a=(e,t)=>{Kl(e.inputs,t),e.compute(jl(e.inputs,t))},$a=e=>V({axis:e.axis,blockSize:e.blockSize})});var Xl,Zl,xa,Sa=k(()=>{"use strict";Se();U();W();Xl=(e,t,n)=>{let r=e===t,o=e<t&&n<0,i=e>t&&n>0;if(r||o||i)throw new Error("Range these inputs' contents are invalid.")},Zl=(e,t,n,r)=>{let o=Math.abs(Math.ceil((t-e)/n)),i=[o],s=o,a=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...A(i)],u=d=>{let l=C("output",r,i.length),c=l.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${d.registerUniforms(p).declareVariables(l)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},xa=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),ee.webgpu.validateInputContent&&Xl(t,n,r),e.compute(Zl(t,n,r,e.inputs[0].dataType),{inputs:[]})}});var Ql,Yl,Jl,ec,tc,nc,rc,oc,ic,sc,ac,Ia,uc,dc,lc,cc,pc,Ta,Ca,Aa=k(()=>{"use strict";U();N();ae();W();Ql=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Yl=(e,t,n)=>{t.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((o,i)=>r[o]=e[i]),r},Jl=(e,t,n,r,o,i)=>{let[s,a,u]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(l=>i.push(l));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&e.length>a&&e[a].dims.length===1&&e[a].dims[0]>0){if(e[a].getFloat32Array().forEach(l=>r.push(l)),r.length!==0&&r.length!==d&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Ql(r,t),t.axes.length>0&&Yl(r,t.axes,d).forEach((l,c)=>r[c]=l)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(l=>o.push(Number(l))),o.length!==0&&o.length!==d&&n>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof o<"u"&&r.length>0&&o.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},ec=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`return ${t}(xResized) / ${t}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${t}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${t}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${t}(lengthResized - 1);
                    return whole + fract;
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",tc=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",nc=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),o=e.length===0?r:e.slice();return t.length>0?(t.forEach((i,s)=>{r[i]=o[s],r[s+n]=o[t.length+s]}),r):o},rc=(e,t,n,r)=>{let o=[];if(n.length>0)if(r.length>0){if(e.forEach(i=>o.push(i)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((i,s)=>o[i]=n[s])}else n.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,s)=>Math.round(i*t[s]))}return o},oc=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(i=>t[i]=r),n.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(r,0,t.length),o.forEach((i,s)=>o[s]=Math.round(i*t[s]))),o},ic=(e,t,n,r,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${B("uniforms.scales","i",r)};
        var roi_low = ${B("uniforms.roi","i",o)};
        var roi_hi = ${B("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${B("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${B("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,sc=(e,t,n,r,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${B("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${B("uniforms.roi","i",i)};
          var roi_hi = ${B("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${B("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${B("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,ac=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${B("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Ia=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",uc=(e,t,n,r,o)=>{let[s,a,u,d]=n.length===2?[-1,0,1,-1]:[0,2,3,1],l=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${l} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${Ia(e,d,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${l} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${l} = originalIndices[${a}];
      var col:${l} = originalIndices[${u}];
      ${r?`if (row < 0 || row > (${n[a]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[a]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${l} = getInputValue(batch, channel, row1, col1);
      var x12: ${l} = getInputValue(batch, channel, row1, col2);
      var x21: ${l} = getInputValue(batch, channel, row2, col1);
      var x22: ${l} = getInputValue(batch, channel, row2, col2);
      var dx1: ${l} = abs(row - ${l}(row1));
      var dx2: ${l} = abs(${l}(row2) - row);
      var dy1: ${l} = abs(col - ${l}(col1));
      var dy2: ${l} = abs(${l}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},dc=(e,t,n,r,o,i,s,a,u,d)=>{let l=n.length===2,c=!0,[p,h]=l?[0,1]:c?[2,3]:[1,2],m=e.type.value,f=w=>{let y=w===p?"row":"col";return`
      fn ${y}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",w)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[w]},
        ${r[w]}, ${n[w]}, ${i[w]}, ${i[w]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${n[w]} - 1))) {
          return ${u};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${y}: ${m} = originalIdx + ${m}(i);
          if (${y} < 0 || ${y} >= ${n[w]}) {
            ${(()=>d?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${y} = max(0, min(${y}, ${n[w]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",w,`u32(${y})`)};
          data[i + 1] = ${w===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(h)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},lc=(e,t,n,r,o)=>{let[s,a,u,d,l]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${n[d]} - 1))`)};
      ${Ia(e,l,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${d}];
      ${r?`if (depth < 0 || depth > (${n[a]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[d]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[a]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},cc=(e,t,n,r,o,i)=>{let s=e.dims,a=nc(i,t.axes,s.length),u=rc(s,r,o,t.axes),d=r.slice();r.length===0&&(d=s.map((g,b)=>g===0?1:u[b]/g),t.keepAspectRatioPolicy!=="stretch"&&(u=oc(s,d,t)));let l=C("output",e.dataType,u.length),c=S("input",e.dataType,s.length),p=x.size(u),h=s.length===u.length&&s.every((g,b)=>g===u[b]),m=t.coordinateTransformMode==="tf_crop_and_resize",f=t.extrapolationValue,w=c.type.value,y=g=>`
      ${h?"":`
      ${ec(t.coordinateTransformMode,w)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${ac(c,s)};
              ${tc(t.nearestMode,n,w)};
              ${sc(c,l,s,u,d.length,a.length,m)};
              `;case"linear":return`
              ${ic(l,s,u,d.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${uc(c,l,s,m,f)}`;if(s.length===3||s.length===5)return`${lc(c,l,s,m,f)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${dc(c,l,s,u,d,a,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",a.length).declareVariables(c,l)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${l.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${d.length>0?d:""}|${o.length>0?o:""}|${a.length>0?a:""}|${h}|${s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:d},{type:1,data:a},...A(s,u)]})}},pc=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Ta=(e,t)=>{let n=[],r=[],o=[],i=pc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Jl(e.inputs,t,i,n,r,o),e.compute(cc(e.inputs[0],t,i,n,r,o),{inputs:[0]})},Ca=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,s=e.extrapolationValue,a=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return V({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:d})}});var mc,fc,ka,Ea=k(()=>{"use strict";U();N();ae();W();mc=(e,t)=>{let[n,r,o,i]=e,{numHeads:s,rotaryEmbeddingDim:a}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!x.areEqual(r.dims,[])&&!x.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!x.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],d=n.dims[n.dims.length-2],l=o.dims[0],c=x.sizeFromDimension(n.dims,1)/d,p=a===0?o.dims[1]*2:c/s;if(a>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(u!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(d!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(p/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(d>l)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},fc=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:o,scale:i}=t,s=e[0].dims[0],a=x.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=a/u,l=e[2].dims[1],c=o===0?l*2:d/r,p=new Array(s,u,d/c,c-l),h=x.computeStrides(p),m=[{type:1,data:i},{type:12,data:p},{type:12,data:h},...e[0].dims.length===3?new Array({type:12,data:[a,d,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[a,c,u*c,1]}):[],...A(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],f=w=>{let y=S("input",e[0].dataType,e[0].dims.length),g=S("position_ids",e[1].dataType,e[1].dims.length),b=S("cos_cache",e[2].dataType,e[2].dims.length),_=S("sin_cache",e[3].dataType,e[3].dims.length),$=C("output",e[0].dataType,e[0].dims.length);return w.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${w.declareVariables(y,g,b,_,$)}

        ${w.mainStart(je)}
          let half_rotary_emb_dim = uniforms.${b.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",C("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${y.getByOffset("i")} * ${b.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${_.get("position_id","bsnh[3]")};
            ${$.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${_.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${b.get("position_id","bsnh[3]")};
            ${$.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${$.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:V({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(p)/je)},programUniforms:m})}},ka=(e,t)=>{mc(e.inputs,t),e.compute(fc(e.inputs,t))}});var hc,gc,Pa,za=k(()=>{"use strict";U();N();W();hc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},gc=(e,t,n,r)=>{let o=t.simplified,i=e[0].dims,s=x.size(i),a=i,u=s,d=i.slice(-1)[0],l=r?i.slice(0,-1).concat(1):[],c=!o&&e.length>3,p=e.length>4,h=r&&n>1,m=r&&n>2,f=n>3,w=64,y=te(d),g=[{type:12,data:u},{type:12,data:y},{type:12,data:d},{type:1,data:t.epsilon}],b=$=>{let v=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],I=[S("x",e[0].dataType,e[0].dims,y),S("skip",e[1].dataType,e[1].dims,y),S("gamma",e[2].dataType,e[2].dims,y)];c&&I.push(S("beta",e[3].dataType,e[3].dims,y)),p&&I.push(S("bias",e[4].dataType,e[4].dims,y)),I.push(C("output",e[0].dataType,a,y)),h&&I.push(C("mean_output",1,l)),m&&I.push(C("inv_std_output",1,l)),f&&I.push(C("input_skip_bias_sum",e[0].dataType,a,y));let T=Y(e[0].dataType),P=Y(1,y);return`

      ${$.registerUniforms(v).declareVariables(...I)}
      var<workgroup> sum_shared : array<${P}, ${w}>;
      var<workgroup> sum_squared_shared : array<${P}, ${w}>;

      ${$.mainStart([w,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${w};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${w};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${w-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p?"bias[offset1d + i]":T+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${f?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Xe(T,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${w};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${ke("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${ke("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${T}(mean)`}) *
            ${T}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},_=[{dims:a,dataType:e[0].dataType}];return n>1&&_.push({dims:l,dataType:1}),n>2&&_.push({dims:l,dataType:1}),n>3&&_.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${h};${m};${f}`,inputDependencies:e.map(($,v)=>"type")},getShaderSource:b,getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:g})}},Pa=(e,t)=>{hc(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(gc(e.inputs,t,e.outputCount,!1),{outputs:r})}});var yc,on,bc,Ba,wc,_c,Da,Oa,Ra=k(()=>{"use strict";U();N();ae();W();yc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},on=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},bc=(e,t)=>{if(e.length>1){let n=on(e,1),r=on(e,2),o=on(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),V({starts:n,ends:r,axes:o})}else return t},Ba=(e,t,n,r,o)=>{let i=e;return e<0&&(i+=n[r[t]]),o[t]<0?Math.max(0,Math.min(i,n[r[t]]-1)):Math.max(0,Math.min(i,n[r[t]]))},wc=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${B("uniforms.input_shape","i",n.length)};
            let steps_i = ${B("uniforms.steps","i",n.length)};
            let signs_i = ${B("uniforms.signs","i",n.length)};
            let starts_i = ${B("uniforms.starts","i",n.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,_c=(e,t)=>{let n=e[0].dims,r=x.size(n),o=t.axes.length>0?x.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],i=on(e,4);i.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=t.starts.map((y,g)=>Ba(y,g,n,o,i)),a=t.ends.map((y,g)=>Ba(y,g,n,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let y=0;y<n.length;++y)o.includes(y)||(s.splice(y,0,0),a.splice(y,0,n[y]),i.splice(y,0,1));let u=i.map(y=>Math.sign(y));i.forEach((y,g,b)=>{if(y<0){let _=(a[g]-s[g])/y,$=s[g],v=$+_*i[g];s[g]=v,a[g]=$,b[g]=-y}});let d=n.slice(0);o.forEach((y,g)=>{d[y]=Math.ceil((a[y]-s[y])/i[y])});let l={dims:d,dataType:e[0].dataType},c=C("output",e[0].dataType,d.length),p=S("input",e[0].dataType,e[0].dims.length),h=x.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],f=[{type:12,data:h},{type:12,data:s},{type:6,data:u},{type:12,data:i},...A(e[0].dims,d)],w=y=>`
      ${y.registerUniforms(m).declareVariables(p,c)}
        ${wc(p,c,n)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[l],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:f})}},Da=(e,t)=>{yc(e.inputs,t);let n=bc(e.inputs,t);e.compute(_c(e.inputs,n),{inputs:[0]})},Oa=e=>{let t=e.starts,n=e.ends,r=e.axes;return V({starts:t,ends:n,axes:r})}});var $c,vc,Ma,Ua,Va=k(()=>{"use strict";U();N();ae();Me();W();$c=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},vc=(e,t)=>{let n=e.inputs[0],r=n.dims,o=x.size(r),i=64,s=r.length,a=x.normalizeAxis(t.axis,s),u=a<r.length-1,d,l=[];u?(l=Array.from({length:s},(I,T)=>T),l[a]=s-1,l[s-1]=a,d=e.compute(le(n,l),{inputs:[n],outputs:[-1]})[0]):d=n;let c=d.dims,p=c[s-1],h=o/p,m=te(p),f=p/m,w=(I,T)=>T===4?`max(max(${I}.x, ${I}.y), max(${I}.z, ${I}.w))`:T===2?`max(${I}.x, ${I}.y)`:T===3?`max(max(${I}.x, ${I}.y), ${I}.z)`:I,y=S("x",d.dataType,d.dims,m),g=C("result",d.dataType,d.dims,m),b=y.type.value,_=Y(d.dataType)==="f32"?`var threadMax = ${b}(-3.402823e+38f);`:`var threadMax = ${b}(-65504.0h);`,$=I=>`
      var<workgroup> rowMaxShared : ${b};
      var<workgroup> rowSumShared : ${b};
      var<workgroup> threadShared : array<${b}, ${i}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${b} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${b}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${I.registerUniform("packedCols","i32").declareVariables(y,g)}
      ${I.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${i};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${_}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${b}(${w("threadShared[0]",m)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${b}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${b}(${ke("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,v=e.compute({name:"Softmax",shaderCache:{hint:`${m}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:d.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:f}]}),getShaderSource:$},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(le(v,l),{inputs:[v]})},Ma=(e,t)=>{$c(e.inputs),vc(e,t)},Ua=e=>V({axis:e.axis})});var xc,Sc,Ic,Tc,Cc,La,Na,Wa=k(()=>{"use strict";U();N();ae();W();xc=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Sc=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>n.push(Number(o))),r=n.length),V({numOutputs:r,axis:t.axis,splitSizes:n})},Ic=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${B("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Tc=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let o=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(o):r===0?n.push(`if (output_number == ${r}u) { ${o} }`):r===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${r}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Cc=(e,t)=>{let n=e[0].dims,r=x.size(n),o=e[0].dataType,i=x.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),a=S("input",o,n.length),u=new Array(t.numOutputs),d=[],l=[],c=0,p=[{type:12,data:r}];for(let m=0;m<t.numOutputs;m++){c+=t.splitSizes[m],u[m]=c;let f=n.slice();f[i]=t.splitSizes[m],l.push(f),s[m]=C(`output${m}`,o,f.length),d.push({dims:l[m],dataType:e[0].dataType})}p.push({type:12,data:u},...A(n,...l));let h=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${Ic(u.length)}
  ${Tc(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${B("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:p})}},La=(e,t)=>{xc(e.inputs);let n=e.inputs.length===1?t:Sc(e.inputs,t);e.compute(Cc(e.inputs,n),{inputs:[0]})},Na=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return V({axis:t,numOutputs:r,splitSizes:n})}});var Ac,kc,Ga,Ha=k(()=>{"use strict";U();N();W();Ac=(e,t,n,r,o)=>{let i=C("output_data",o,n.length,4),s=S("a_data",t[1].dataType,t[1].dims.length,4),a=S("b_data",t[2].dataType,t[2].dims.length,4),u=S("c_data",t[0].dataType,t[0].dims.length,4),d,l=(c,p,h)=>`select(${p}, ${c}, ${h})`;if(!r)d=i.setByOffset("global_idx",l(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(p,h,m="")=>{let f=`a_data[index_a${h}][component_a${h}]`,w=`b_data[index_b${h}][component_b${h}]`,y=`bool(c_data[index_c${h}] & (0xffu << (component_c${h} * 8)))`;return`
            let output_indices${h} = ${i.offsetToIndices(`global_idx * 4u + ${h}u`)};
            let offset_a${h} = ${s.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let offset_b${h} = ${a.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let offset_c${h} = ${u.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let index_a${h} = offset_a${h} / 4u;
            let index_b${h} = offset_b${h} / 4u;
            let index_c${h} = offset_c${h} / 4u;
            let component_a${h} = offset_a${h} % 4u;
            let component_b${h} = offset_b${h} % 4u;
            let component_c${h} = offset_c${h} % 4u;
            ${p}[${h}] = ${m}(${l(f,w,y)});
          `};o===9?d=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,a,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},kc=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,o=e[1].dataType,i=!(x.areEqual(t,n)&&x.areEqual(n,r)),s=t,a=x.size(t);if(i){let d=Ee.calcShape(Ee.calcShape(t,n,!1),r,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,a=x.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Ac(d,e,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...A(r,t,n,s)]})}},Ga=e=>{e.compute(kc(e.inputs))}});var qa,Fa=k(()=>{"use strict";Mo();jt();Lo();Wo();Ci();Ui();Ni();ts();us();cs();fs();ws();vs();Ss();Cs();Es();Bs();Rs();Fs();Xs();Qs();Hn();ea();Jn();na();wa();va();Sa();Ft();Aa();Ea();za();Ra();Va();Wa();tr();Me();Zt();Ha();qa=new Map([["Abs",[Go]],["Acos",[Ho]],["Acosh",[qo]],["Add",[Ai]],["ArgMax",[Ro,Vn]],["ArgMin",[Oo,Vn]],["Asin",[Fo]],["Asinh",[Ko]],["Atan",[jo]],["Atanh",[Xo]],["Attention",[Uo]],["AveragePool",[la,da]],["BatchNormalization",[Vo]],["BiasAdd",[No]],["BiasSplitGelu",[Ti]],["Cast",[Qo,Zo]],["Ceil",[Jo]],["Clip",[Yo]],["Concat",[Vi,Li]],["Conv",[jn,Kn]],["ConvTranspose",[as,ss]],["Cos",[ei]],["Cosh",[ti]],["CumSum",[ds,ls]],["DepthToSpace",[ps,ms]],["DequantizeLinear",[_a,$a]],["Div",[ki]],["Einsum",[ys,bs]],["Elu",[ni,dt]],["Equal",[Ei]],["Erf",[ri]],["Exp",[oi]],["Expand",[$s]],["FastGelu",[xs]],["Floor",[ii]],["FusedConv",[jn,Kn]],["Gather",[Ts,Is]],["GatherElements",[zs,Ps]],["GatherBlockQuantized",[As,ks]],["Gelu",[si]],["Gemm",[Os,Ds]],["GlobalAveragePool",[ma,pa]],["GlobalMaxPool",[ba,ya]],["Greater",[Di]],["GreaterOrEqual",[Ri]],["GroupQueryAttention",[qs,Hs]],["HardSigmoid",[fi,mi]],["InstanceNormalization",[js]],["LayerNormalization",[Zs]],["LeakyRelu",[ai,dt]],["Less",[Oi]],["LessOrEqual",[Mi]],["Log",[xi]],["MatMul",[Ji]],["MatMulNBits",[Ys,Js]],["MaxPool",[ha,ga]],["Mul",[Pi]],["MultiHeadAttention",[Vs,Us]],["Neg",[di]],["Not",[ui]],["Pad",[ta]],["Pow",[zi]],["QuickGelu",[Si,dt]],["Range",[xa]],["Reciprocal",[li]],["ReduceMin",[ko]],["ReduceMean",[So]],["ReduceMax",[Ao]],["ReduceSum",[Po]],["ReduceProd",[Eo]],["ReduceL1",[Io]],["ReduceL2",[To]],["ReduceLogSum",[Bo]],["ReduceLogSumExp",[Co]],["ReduceSumSquare",[zo]],["Relu",[ci]],["Resize",[Ta,Ca]],["RotaryEmbedding",[ka]],["Sigmoid",[pi]],["Sin",[hi]],["Sinh",[gi]],["Slice",[Da,Oa]],["SkipLayerNormalization",[Pa]],["Split",[La,Na]],["Sqrt",[yi]],["Softmax",[Ma,Ua]],["Sub",[Bi]],["Tan",[bi]],["Tanh",[_i]],["ThresholdedRelu",[vi,dt]],["Tile",[Ns]],["Transpose",[co,po]],["Where",[Ga]]])});var sn,Ka=k(()=>{"use strict";Se();Ae();W();sn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,n){this.repo.set(t,n)}run(t,n,r,o,i){_e(t.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let l of n)u.push({binding:u.length,resource:{buffer:l.buffer}});for(let l of r)u.push({binding:u.length,resource:{buffer:l.buffer}});i&&u.push({binding:u.length,resource:i});let d=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:u,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let l={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:d,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(l)}a.setPipeline(t.computePipeline),a.setBindGroup(0,d),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),ye(t.programInfo.name)}dispose(){}build(t,n){_e(t.name);let r=this.backend.device,o=[];r.features.has("shader-f16")&&o.push("enable f16;");let i=uo(n,this.backend.device.limits),s=t.getShaderSource(i),a=`${o.join(`
`)}
${i.additionalImplementations}
${s}`,u=r.createShaderModule({code:a,label:t.name});X("verbose",()=>`[WebGPU] ${t.name} shader code: ${a}`);let d=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:t.name});return ye(t.name),{programInfo:t,computePipeline:d,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(t){let n=typeof t=="number"?t:t.x,r=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&r<=i&&o<=i)return[n,r,o];let s=n*r*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var Ec,Pc,nr,an,ja=k(()=>{"use strict";Se();U();Ae();Cn();io();Fa();Ka();Ec=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let o=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=e[r].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=e[r].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},Pc=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Ec(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},nr=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},an=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,n){this.env=t;let r=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r};n.features.has("chromium-experimental-timestamp-query-inside-passes")?r.push("chromium-experimental-timestamp-query-inside-passes"):n.features.has("timestamp-query")&&r.push("timestamp-query"),n.features.has("shader-f16")&&r.push("shader-f16"),this.device=await n.requestDevice(o),this.adapterInfo=new nr(n.info||await n.requestAdapterInfo()),this.gpuDataManager=oo(this),this.programManager=new sn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Nt(t.logLevel,!!t.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;_e(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let o=0;o<n.length/2;o++){let i=r[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,d=a.kernelName,l=i.programName,c=i.inputTensorViews,p=i.outputTensorViews,h=n[o*2],m=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let f=Number(h-this.queryTimeBase),w=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(w))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(y=>({dims:y.dims,dataType:Ne(y.dataType)})),outputsMetadata:p.map(y=>({dims:y.dims,dataType:Ne(y.dataType)})),kernelId:s,kernelType:u,kernelName:d,programName:l,startTime:f,endTime:w});else{let y="";c.forEach((b,_)=>{y+=`input[${_}]: [${b.dims}] | ${Ne(b.dataType)}, `});let g="";p.forEach((b,_)=>{g+=`output[${_}]: [${b.dims}] | ${Ne(b.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${d}|${l}" ${y}${g}execution time: ${w-f} ns`)}St("GPU",`${l}::${h}::${m}`)}t.unmap(),this.pendingQueries.delete(t)}),ye()}run(t,n,r,o,i,s){_e(t.name);let a=[];for(let b=0;b<n.length;++b){let _=n[b].data;if(_===0)continue;let $=this.gpuDataManager.get(_);if(!$)throw new Error(`no GPU data for input: ${_}`);a.push($)}let{outputs:u,dispatchGroup:d,programUniforms:l}=t.getRunData(n),c=r.length===0?u.map((b,_)=>_):r;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let p=[],h=[];for(let b=0;b<u.length;++b){if(!Number.isInteger(c[b])||c[b]<-3||c[b]>=s)throw new Error(`Invalid output index: ${c[b]}`);if(c[b]===-3)continue;let _=c[b]===-1,$=c[b]===-2,v=_||$?i(u[b].dataType,u[b].dims):o(c[b],u[b].dataType,u[b].dims);if(p.push(v),v.data===0)continue;let I=this.gpuDataManager.get(v.data);if(!I)throw new Error(`no GPU data for output: ${v.data}`);if(_&&this.temporaryData.push(I),$){let T=this.kernelPersistentData.get(this.currentKernelId);T||(T=[],this.kernelPersistentData.set(this.currentKernelId,T)),T.push(I)}h.push(I)}if(a.length!==n.length||h.length!==p.length){if(h.length===0)return ye(t.name),p;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(l){let b=0,_=[];l.forEach(T=>{let P=typeof T.data=="number"?[T.data]:T.data;if(P.length===0)return;let z=T.type===10?2:4,R,Z;T.type===10?(Z=P.length>4?16:P.length>2?8:P.length*z,R=P.length>4?16:z*P.length):(Z=P.length<=2?P.length*z:16,R=16),b=Math.ceil(b/Z)*Z,_.push(b);let G=T.type===10?8:4;b+=P.length>4?Math.ceil(P.length/G)*R:P.length*z});let $=16;b=Math.ceil(b/$)*$;let v=new ArrayBuffer(b);l.forEach((T,P)=>{let z=_[P],R=typeof T.data=="number"?[T.data]:T.data;if(T.type===6)new Int32Array(v,z,R.length).set(R);else if(T.type===12)new Uint32Array(v,z,R.length).set(R);else if(T.type===10)new Uint16Array(v,z,R.length).set(R);else if(T.type===1)new Float32Array(v,z,R.length).set(R);else throw new Error(`Unsupported uniform type: ${Ne(T.type)}`)});let I=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(I.buffer,0,v,0,b),this.gpuDataManager.release(I.id),m={offset:0,size:b,buffer:I.buffer}}let f=this.programManager.normalizeDispatchGroupSize(d),w=f[1]===1&&f[2]===1,y=Pc(t,n,w),g=this.programManager.getArtifact(y);if(g||(g=this.programManager.build(t,f),this.programManager.setArtifact(y,g),X("info",()=>`[artifact] key: ${y}, programName: ${t.name}`)),l&&g.uniformVariablesInfo){if(l.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${l.length} in program "${g.programInfo.name}".`);for(let b=0;b<l.length;b++){let _=l[b],$=_.type,v=typeof _.data=="number"?1:_.data.length,[I,T]=g.uniformVariablesInfo[b];if($!==I||v!==T)throw new Error(`Uniform variable ${b} mismatch: expect type ${I} with size ${T}, got type ${$} with size ${v} in program "${g.programInfo.name}".`)}}if(X("info",()=>`[ProgramManager] run "${t.name}" (key=${y}) with ${f[0]}x${f[1]}x${f[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:n,outputTensorViews:p};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(g,a,h,f,m),ye(t.name),p}upload(t,n){this.gpuDataManager.upload(t,n)}memcpy(t,n){this.gpuDataManager.memcpy(t,n)}async download(t,n){await this.gpuDataManager.download(t,n)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,n,r,o){let i=qa.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(n,s)}releaseKernel(t){let n=this.kernelPersistentData.get(t);if(n){for(let r of n)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,n,r){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),X("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),a(n,u[1]),0}catch(l){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${l}`)),1}finally{d&&r.push(this.device.popErrorScope().then(l=>l?`GPU validation error for kernel "[${i}] ${s}": ${l.message}`:null));for(let l of this.temporaryData)this.gpuDataManager.release(l.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,n,r,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let s=i.get(n),a=this.gpuDataManager.registerExternalBuffer(r,o,s);return i.set(n,[a,r]),a}unregisterBuffers(t){let n=this.sessionExternalDataMapping.get(t);n&&(n.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let n=this.gpuDataManager.get(t);if(!n)throw new Error(`no GPU data for buffer: ${t}`);return n.buffer}createDownloader(t,n,r){return async()=>{let o=await Pn(this,t,n);return Wt(o.buffer,r)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){X("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){X("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){X("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let o=0;o<r;o++){let i=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var zc,Xa,un,rr,Za,Qa=k(()=>{"use strict";Ae();zc=1,Xa=()=>zc++,un=class{constructor(t,n){this.mlContext=t;this.tensorEntry=n,this.tensorCache=n?[n]:[]}get tensor(){return this.tensorEntry?.[0]}get context(){if(!this.mlContext)throw new Error("MLContext has not been set.");return this.mlContext}set context(t){if(this.mlContext&&this.mlContext!==t)throw new Error("MLTensor in use in a different MLContext.");this.mlContext=t}destroy(){for(let[t]of this.tensorCache)t.destroy();this.tensorCache=[],this.tensorEntry=void 0}trySelectTensor(t,n){for(let[r,o,i]of this.tensorCache)if(n===r){if(this.context!==t)throw new Error("MLTensor cannot be registered with a different MLContext.");return this.tensorEntry=[r,o,i],!0}return!1}async ensureTensor(t,n,r){if(this.tensorEntry){let[s,a,u]=this.tensorEntry;if(a===t&&u.every((d,l)=>d===n[l]))return s}for(let[s,a,u]of this.tensorCache)if(a===t&&u.every((d,l)=>d===n[l])){if(r&&this.tensorEntry){X("verbose",()=>`[WebNN] Slowdown may occur, having to copy existing tensor {dataType: ${t}, shape: ${n}}`);let d=await this.context.readTensor(this.tensorEntry[0]);this.context.writeTensor(s,d)}return this.tensorEntry=[s,a,u],s}X("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${n}}`);let o=MLTensorUsage.READ|MLTensorUsage.WRITE,i=await this.context.createTensor({dataType:t,shape:n,dimensions:n,usage:o});return this.tensorEntry=[i,t,n],this.tensorCache.push(this.tensorEntry),this.activeUpload&&(this.mlContext?.writeTensor(i,this.activeUpload),this.activeUpload=void 0),i}upload(t){if(!this.tensorEntry){this.activeUpload=new Uint8Array(t);return}this.mlContext?.writeTensor(this.tensorEntry[0],t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.tensorEntry)throw new Error("Tensor has not been created.");return t?this.context.readTensor(this.tensorEntry[0],t):this.context.readTensor(this.tensorEntry[0])}},rr=class{constructor(t){this.backend=t;this.tensorsById=new Map;this.tensorIdsByContext=new Map}reserveTensorId(){let t=Xa();return this.tensorsById.set(t,new un),t}releaseTensorId(t){let n=this.tensorsById.get(t);if(n){n.destroy(),this.tensorsById.delete(t);for(let[r,o]of this.tensorIdsByContext)if(o.has(t)){o.delete(t),o.size===0&&this.tensorIdsByContext.delete(r);break}}}async ensureTensor(t,n,r,o){X("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${o}}`);let i=this.tensorsById.get(t);if(!i)throw new Error("Tensor not found.");return i.context=this.backend.currentContext,this.tensorIdsByContext.has(this.backend.currentContext)||this.tensorIdsByContext.set(this.backend.currentContext,new Set),this.tensorIdsByContext.get(this.backend.currentContext)?.add(t),i.ensureTensor(n,r,o)}upload(t,n){this.tensorsById.get(t).upload(n)}async download(t,n){return X("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${n?.byteLength}}`),this.tensorsById.get(t).download(n)}releaseTensorsForContext(t){let n=this.tensorIdsByContext.get(t);if(n){for(let r of n)this.tensorsById.get(r).destroy(),this.tensorsById.delete(r);this.tensorIdsByContext.delete(t)}}registerTensor(t,n,r,o){for(let[a,u]of this.tensorsById)if(u.trySelectTensor(t,n))return a;let i=Xa();this.tensorsById.set(i,new un(t,[n,r,o]));let s=this.tensorIdsByContext.get(t);return s||(s=new Set,this.tensorIdsByContext.set(t,s)),s.add(i),i}},Za=(...e)=>new rr(...e)});var Ya,dn,Ja=k(()=>{"use strict";U();Le();Cn();Qa();Ae();Ya=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),dn=class{constructor(t){this.tensorManager=Za(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;Nt(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,n){this.mlContextBySessionId.set(t,n);let r=this.sessionIdsByMLContext.get(n);r||(r=new Set,this.sessionIdsByMLContext.set(n,r)),r.add(t)}onReleaseSession(t){let n=this.mlContextBySessionId.get(t);if(!n)return;this.mlContextBySessionId.delete(t);let r=this.sessionIdsByMLContext.get(n);r.delete(t),r.size===0&&(this.sessionIdsByMLContext.delete(n),this.tensorManager.releaseTensorsForContext(n))}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){X("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,n,r,o){let i=Ya.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(t,i,r,o)}uploadTensor(t,n){if(!se().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");X("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${n.byteLength}}`),this.tensorManager.upload(t,n)}async downloadTensor(t,n){return this.tensorManager.download(t,n)}createMLTensorDownloader(t,n){return async()=>{let r=await this.tensorManager.download(t);return Wt(r,n)}}registerMLTensor(t,n,r){let o=Ya.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,r);return X("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${r}} -> {tensorId: ${i}}`),i}flush(){}}});var eu={};bt(eu,{init:()=>Bc});var ht,or,Bc,tu=k(()=>{"use strict";U();ja();Ae();N();Ja();ht=class e{constructor(t,n,r,o){this.module=t;this.dataType=n;this.data=r;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(x.size(t)!==x.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},or=class{constructor(t,n,r){this.module=t;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=t.HEAPU32,i=r>>>2;this.opKernelContext=o[i++];let s=o[i++];this.outputCount=o[i++],this.customDataOffset=o[i++],this.customDataSize=o[i++];let a=[];for(let u=0;u<s;u++){let d=o[i++],l=o[i++],c=o[i++],p=[];for(let h=0;h<c;h++)p.push(o[i++]);a.push(new ht(t,d,l,p))}this.inputs=a}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,n){let r=n?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=n?.outputs??[],i=(a,u,d)=>new ht(this.module,u,this.output(a,d),d),s=(a,u)=>{let d=Fe(a,u);if(!d)throw new Error(`Unsupported data type: ${a}`);let l=d>0?this.backend.gpuDataManager.create(d).id:0;return new ht(this.module,a,l,u)};return this.backend.run(t,r,o,i,s,this.outputCount)}output(t,n){let r=this.module.stackSave();try{let o=this.module.stackAlloc((1+n.length)*4),i=o>>2;this.module.HEAPU32[i++]=n.length;for(let s=0;s<n.length;s++)this.module.HEAPU32[i++]=n[s];return this.module._JsepOutput(this.opKernelContext,t,o)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(r)}}},Bc=async(e,t,n,r)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new an;await i.initialize(n,r),o("webgpu",[i,s=>i.alloc(s),s=>i.free(s),(s,a,u,d=!1)=>{if(d)X("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${s}, dst=${a}, size=${u}`),i.memcpy(s,a);else{X("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${s}, gpuDataId=${a}, size=${u}`);let l=t.HEAPU8.subarray(s>>>0,(s>>>0)+u);i.upload(a,l)}},async(s,a,u)=>{X("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(s,()=>t.HEAPU8.subarray(a>>>0,(a>>>0)+u))},(s,a,u)=>i.createKernel(s,a,u,t.UTF8ToString(t._JsepGetNodeName(a))),s=>i.releaseKernel(s),(s,a,u,d)=>{X("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let l=new or(t,i,a);return i.computeKernel(s,l,d)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new dn(n);o("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,a,u,d)=>i.ensureTensor(s,a,u,d),(s,a)=>{i.uploadTensor(s,a)},async(s,a)=>i.downloadTensor(s,a)])}}});var Dc,kt,Et,Ze,Oc,ot,Pt,zt,nu,Bt,Dt,Ot,vn=k(()=>{"use strict";Zr();Yr();U();Le();Mt();Tn();Dc=(e,t)=>{se()._OrtInit(e,t)!==0&&oe("Can't initialize onnxruntime.")},kt=async e=>{Dc(e.wasm.numThreads,at(e.logLevel))},Et=async(e,t)=>{{let n=(tu(),yn(eu)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let r=e.webgpu.adapter;if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",se(),e,r)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",se(),e)}}},Ze=new Map,Oc=e=>{let t=se(),n=t.stackSave();try{let r=t.stackAlloc(8);return t._OrtGetInputOutputCount(e,r,r+4)!==0&&oe("Can't get session input/output count."),[t.HEAP32[r/4],t.HEAP32[r/4+1]]}finally{t.stackRestore(n)}},ot=e=>{let t=se(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},Pt=async(e,t)=>{let n,r,o=se();Array.isArray(e)?[n,r]=e:e.buffer===o.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=ot(e);let i=0,s=0,a=0,u=[],d=[],l=[];try{if([s,u]=Qr(t),t?.externalData&&o.mountExternalData){let g=[];for(let b of t.externalData){let _=typeof b=="string"?b:b.path;g.push(ut(typeof b=="string"?b:b.data).then($=>{o.mountExternalData(_,$)}))}await Promise.all(g)}for(let g of t?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof g!="string"){let _=g,$=_?.context,v=_?.gpuDevice,I=_?.deviceType,T=_?.numThreads,P=_?.powerPreference;$?o.currentContext=$:v?o.currentContext=await navigator.ml.createContext(v):o.currentContext=await navigator.ml.createContext({deviceType:I,numThreads:T,powerPreference:P})}else o.currentContext=await navigator.ml.createContext();break}i=await o._OrtCreateSession(n,r,s),i===0&&oe("Can't create a session."),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[c,p]=Oc(i),h=!!t?.enableGraphCapture,m=[],f=[],w=[];for(let g=0;g<c;g++){let b=o._OrtGetInputName(i,g);b===0&&oe("Can't get an input name."),d.push(b),m.push(o.UTF8ToString(b))}for(let g=0;g<p;g++){let b=o._OrtGetOutputName(i,g);b===0&&oe("Can't get an output name."),l.push(b);let _=o.UTF8ToString(b);f.push(_);{if(h&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let $=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[_]??"cpu";if($!=="cpu"&&$!=="cpu-pinned"&&$!=="gpu-buffer"&&$!=="ml-tensor")throw new Error(`Not supported preferred output location: ${$}.`);if(h&&$!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${$}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push($)}}let y=null;return w.some(g=>g==="gpu-buffer"||g==="ml-tensor")&&(a=o._OrtCreateBinding(i),a===0&&oe("Can't create IO binding."),y={handle:a,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(g=>In(g))}),Ze.set(i,[i,d,l,y,h,!1]),[i,m,f]}catch(c){throw d.forEach(p=>o._OrtFree(p)),l.forEach(p=>o._OrtFree(p)),a!==0&&o._OrtReleaseBinding(a),i!==0&&o._OrtReleaseSession(i),c}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s),u.forEach(c=>o._free(c)),o.unmountExternalData?.()}},zt=e=>{let t=se(),n=Ze.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,o,i,s,a]=n;s&&(a&&t._OrtClearBoundOutputs(s.handle),t._OrtReleaseBinding(s.handle)),t.jsepOnReleaseSession?.(e),o.forEach(u=>t._OrtFree(u)),i.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(r),Ze.delete(e)},nu=(e,t,n,r,o,i=!1)=>{if(!e){t.push(0);return}let s=se(),a=e[0],u=e[1],d=e[3],l,c;if(a==="string"&&(d==="gpu-buffer"||d==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&d!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(d==="gpu-buffer"){let m=e[2].gpuBuffer;c=Fe(st(a),u);let f=s.jsepRegisterBuffer;if(!f)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');l=f(r,o,m,c)}else if(d==="ml-tensor"){let m=e[2].mlTensor;c=Fe(st(a),u);let f=s.jsepRegisterMLTensor;if(!f)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');l=f(m,st(a),u)}else{let m=e[2];if(Array.isArray(m)){c=4*m.length,l=s._malloc(c),n.push(l);let f=l/4;for(let w=0;w<m.length;w++){if(typeof m[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);s.HEAPU32[f++]=ue(m[w],n)}}else c=m.byteLength,l=s._malloc(c),n.push(l),s.HEAPU8.set(new Uint8Array(m.buffer,m.byteOffset,c),l)}let p=s.stackSave(),h=s.stackAlloc(4*u.length);try{let m=h/4;u.forEach(w=>s.HEAP32[m++]=w);let f=s._OrtCreateTensor(st(a),l,c,h,u.length,In(d));f===0&&oe(`Can't create tensor for input/output. session=${r}, index=${o}.`),t.push(f)}finally{s.stackRestore(p)}},Bt=async(e,t,n,r,o,i)=>{let s=se(),a=Ze.get(e);if(!a)throw new Error(`cannot run inference. invalid session id: ${e}`);let u=a[0],d=a[1],l=a[2],c=a[3],p=a[4],h=a[5],m=t.length,f=r.length,w=0,y=[],g=[],b=[],_=[],$=s.stackSave(),v=s.stackAlloc(m*4),I=s.stackAlloc(m*4),T=s.stackAlloc(f*4),P=s.stackAlloc(f*4);try{s.jsepOnRunStart?.(u),[w,y]=Xr(i);for(let M=0;M<m;M++)nu(n[M],g,_,e,t[M],p);for(let M=0;M<f;M++)nu(o[M],b,_,e,m+r[M],p);let z=v/4,R=I/4,Z=T/4,G=P/4;for(let M=0;M<m;M++)s.HEAPU32[z++]=g[M],s.HEAPU32[R++]=d[t[M]];for(let M=0;M<f;M++)s.HEAPU32[Z++]=b[M],s.HEAPU32[G++]=l[r[M]];if(c&&!h){let{handle:M,outputPreferredLocations:Q,outputPreferredLocationsEncoded:re}=c;if(d.length!==m)throw new Error(`input count from feeds (${m}) is expected to be always equal to model's input count (${d.length}).`);for(let O=0;O<m;O++){let j=t[O];await s._OrtBindInput(M,d[j],g[O])!==0&&oe(`Can't bind input[${O}] for session=${e}.`)}for(let O=0;O<f;O++){let j=r[O];o[O]?.[3]?s._OrtBindOutput(M,l[j],b[O],0)!==0&&oe(`Can't bind pre-allocated output[${O}] for session=${e}.`):s._OrtBindOutput(M,l[j],0,re[j])!==0&&oe(`Can't bind output[${O}] to ${Q[O]} for session=${e}.`)}Ze.set(e,[u,d,l,c,p,!0])}let K;c?K=await s._OrtRunWithBinding(u,c.handle,f,T,w):K=await s._OrtRun(u,I,v,m,P,f,T,w),K!==0&&oe("failed to call OrtRun().");let ie=[];for(let M=0;M<f;M++){let Q=s.HEAPU32[T/4+M];if(Q===b[M]){ie.push(o[M]);continue}let re=s.stackSave(),O=s.stackAlloc(4*4),j=!1,H,q=0;try{s._OrtGetTensorData(Q,O,O+4,O+8,O+12)!==0&&oe(`Can't access output tensor data on index ${M}.`);let E=O/4,D=s.HEAPU32[E++];q=s.HEAPU32[E++];let ne=s.HEAPU32[E++],Ce=s.HEAPU32[E++],fe=[];for(let he=0;he<Ce;he++)fe.push(s.HEAPU32[ne/4+he]);s._OrtFree(ne);let Re=fe.reduce((he,ge)=>he*ge,1);H=Ne(D);let yt=c?.outputPreferredLocations[r[M]];if(H==="string"){if(yt==="gpu-buffer"||yt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let he=[],ge=q/4;for(let Ve=0;Ve<Re;Ve++){let ur=s.HEAPU32[ge++],hu=Ve===Re-1?void 0:s.HEAPU32[ge]-ur;he.push(s.UTF8ToString(ur,hu))}ie.push([H,fe,he,"cpu"])}else if(yt==="gpu-buffer"&&Re>0){let he=s.jsepGetBuffer;if(!he)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ge=he(q),Ve=Fe(D,Re);if(Ve===void 0||!Vt(H))throw new Error(`Unsupported data type: ${H}`);j=!0,ie.push([H,fe,{gpuBuffer:ge,download:s.jsepCreateDownloader(ge,Ve,H),dispose:()=>{s._OrtReleaseTensor(Q)}},"gpu-buffer"])}else if(yt==="ml-tensor"&&Re>0){let he=s.jsepEnsureTensor;if(!he)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Fe(D,Re)===void 0||!Lt(H))throw new Error(`Unsupported data type: ${H}`);let Ve=await he(q,D,fe,!1);j=!0,ie.push([H,fe,{mlTensor:Ve,download:s.jsepCreateMLTensorDownloader(q,H),dispose:()=>{s.jsepReleaseTensorId(q),s._OrtReleaseTensor(Q)}},"ml-tensor"])}else{let he=Ut(H),ge=new he(Re);new Uint8Array(ge.buffer,ge.byteOffset,ge.byteLength).set(s.HEAPU8.subarray(q,q+ge.byteLength)),ie.push([H,fe,ge,"cpu"])}}finally{s.stackRestore(re),H==="string"&&q&&s._free(q),j||s._OrtReleaseTensor(Q)}}return c&&!p&&(s._OrtClearBoundOutputs(c.handle),Ze.set(e,[u,d,l,c,p,!1])),ie}finally{s.stackRestore($),g.forEach(z=>s._OrtReleaseTensor(z)),b.forEach(z=>s._OrtReleaseTensor(z)),_.forEach(z=>s._free(z)),w!==0&&s._OrtReleaseRunOptions(w),y.forEach(z=>s._free(z))}},Dt=e=>{let t=se(),n=Ze.get(e);if(!n)throw new Error("invalid session id");let r=n[0],o=t._OrtEndProfiling(r);o===0&&oe("Can't get an profile file name."),t._OrtFree(o)},Ot=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}});var Qe,Te,gt,cn,pn,ln,ir,sr,et,tt,Mc,ru,ou,iu,su,au,uu,du,ar=k(()=>{"use strict";Se();vn();Le();rt();Qe=()=>!!ee.wasm.proxy&&typeof document<"u",gt=!1,cn=!1,pn=!1,sr=new Map,et=(e,t)=>{let n=sr.get(e);n?n.push(t):sr.set(e,[t])},tt=()=>{if(gt||!cn||pn||!Te)throw new Error("worker not ready")},Mc=e=>{switch(e.data.type){case"init-wasm":gt=!1,e.data.err?(pn=!0,ir[1](e.data.err)):(cn=!0,ir[0]()),ln&&(URL.revokeObjectURL(ln),ln=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=sr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},ru=async()=>{if(!cn){if(gt)throw new Error("multiple calls to 'initWasm()' detected.");if(pn)throw new Error("previous call to 'initWasm()' failed.");if(gt=!0,Qe())return new Promise((e,t)=>{Te?.terminate(),Fr().then(([n,r])=>{try{Te=r,Te.onerror=i=>t(i),Te.onmessage=Mc,ir=[e,t];let o={type:"init-wasm",in:ee};Te.postMessage(o),ln=n}catch(o){t(o)}},t)});try{await At(ee.wasm),await kt(ee),cn=!0}catch(e){throw pn=!0,e}finally{gt=!1}}},ou=async e=>{if(Qe())return tt(),new Promise((t,n)=>{et("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:ee}};Te.postMessage(r)});await Et(ee,e)},iu=async e=>Qe()?(tt(),new Promise((t,n)=>{et("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};Te.postMessage(r,[e.buffer])})):ot(e),su=async(e,t)=>{if(Qe()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return tt(),new Promise((n,r)=>{et("create",[n,r]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Te.postMessage(o,i)})}else return Pt(e,t)},au=async e=>{if(Qe())return tt(),new Promise((t,n)=>{et("release",[t,n]);let r={type:"release",in:e};Te.postMessage(r)});zt(e)},uu=async(e,t,n,r,o,i)=>{if(Qe()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return tt(),new Promise((s,a)=>{et("run",[s,a]);let u=n,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:r,options:i}};Te.postMessage(d,Ot(u))})}else return Bt(e,t,n,r,o,i)},du=async e=>{if(Qe())return tt(),new Promise((t,n)=>{et("end-profiling",[t,n]);let r={type:"end-profiling",in:e};Te.postMessage(r)});Dt(e)}});var lu,Uc,mn,cu=k(()=>{"use strict";Se();ar();U();Ct();Tn();lu=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Uc=e=>{switch(e[3]){case"cpu":return new me(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Vt(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:o}=e[2];return me.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:o})}case"ml-tensor":{let t=e[0];if(!Lt(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:o}=e[2];return me.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},mn=class{async fetchModelAndCopyToWasmMemory(t){return iu(await ut(t))}async loadModel(t,n){_e();let r;typeof t=="string"?!1?r=await ut(t):r=await this.fetchModelAndCopyToWasmMemory(t):r=t,[this.sessionId,this.inputNames,this.outputNames]=await su(r,n),ye()}async dispose(){return au(this.sessionId)}async run(t,n,r){_e();let o=[],i=[];Object.entries(t).forEach(p=>{let h=p[0],m=p[1],f=this.inputNames.indexOf(h);if(f===-1)throw new Error(`invalid input '${h}'`);o.push(m),i.push(f)});let s=[],a=[];Object.entries(n).forEach(p=>{let h=p[0],m=p[1],f=this.outputNames.indexOf(h);if(f===-1)throw new Error(`invalid output '${h}'`);s.push(m),a.push(f)});let u=o.map((p,h)=>lu(p,()=>`input "${this.inputNames[i[h]]}"`)),d=s.map((p,h)=>p?lu(p,()=>`output "${this.outputNames[a[h]]}"`):null),l=await uu(this.sessionId,i,u,a,d,r),c={};for(let p=0;p<l.length;p++)c[this.outputNames[a[p]]]=s[p]??Uc(l[p]);return ye(),c}startProfiling(){}endProfiling(){du(this.sessionId)}}});var mu={};bt(mu,{OnnxruntimeWebAssemblyBackend:()=>fn,initializeFlags:()=>pu,wasmBackend:()=>Vc});var pu,fn,Vc,fu=k(()=>{"use strict";Se();ar();cu();rt();pu=()=>{if((typeof ee.wasm.initTimeout!="number"||ee.wasm.initTimeout<0)&&(ee.wasm.initTimeout=0),ee.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ee.wasm.proxy!="boolean"&&(ee.wasm.proxy=!1),typeof ee.wasm.trace!="boolean"&&(ee.wasm.trace=!1),typeof ee.wasm.numThreads!="number"||!Number.isInteger(ee.wasm.numThreads)||ee.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ee.wasm.numThreads=1;else{let e=typeof navigator>"u"?gn("node:os").cpus().length:navigator.hardwareConcurrency;ee.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}ee.wasm.wasmPaths===void 0&&Ie&&Ie.indexOf("blob:")!==0&&(ee.wasm.wasmPaths=Ie.substring(0,Ie.lastIndexOf("/")+1))},fn=class{async init(t){pu(),await ru(),await ou(t)}async createInferenceSessionHandler(t,n){let r=new mn;return await r.loadModel(t,n),Promise.resolve(r)}},Vc=new fn});Se();Se();Se();var Ur="1.20.0";var B$=$n;{let e=(fu(),yn(mu)).wasmBackend;Ge("webgpu",e,5),Ge("webnn",e,5),Ge("cpu",e,10),Ge("wasm",e,10)}Object.defineProperty(ee.versions,"web",{value:Ur,enumerable:!0});export{$u as InferenceSession,St as TRACE,_e as TRACE_FUNC_BEGIN,ye as TRACE_FUNC_END,me as Tensor,xu as TrainingSession,B$ as default,ee as env,Ge as registerBackend};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
//# sourceMappingURL=ort.webgpu.min.mjs.map
