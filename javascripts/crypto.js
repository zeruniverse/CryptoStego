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



//fast Fourier based on http://www.ituring.com.cn/article/121428 
//ifft2() written by Jeffery.
function imageFFT(dataArray, width, height, isIfft) {
    isIfft=(isIfft===undefined)?false:isIfft;
	function fft(dataArray) {
		this.mul = function(a, b) {
			if (typeof(a) !== 'object') {
				a = {
					real: a,
					imag: 0
				}
			}
			if (typeof(b) !== 'object') {
				b = {
					real: b,
					imag: 0
				}
			}
			return {
				real: a.real * b.real - a.imag * b.imag,
				imag: a.real * b.imag + a.imag * b.real
			};
		};
		this.add = function(a, b) {
			if (typeof(a) !== 'object') {
				a = {
					real: a,
					imag: 0
				}
			}
			if (typeof(b) !== 'object') {
				b = {
					real: b,
					imag: 0
				}
			}
			return {
				real: a.real + b.real,
				imag: a.imag + b.imag
			};
		};
		this.sub = function(a, b) {
			if (typeof(a) !== 'object') {
				a = {
					real: a,
					imag: 0
				}
			}
			if (typeof(b) !== 'object') {
				b = {
					real: b,
					imag: 0
				}
			}
			return {
				real: a.real - b.real,
				imag: a.imag - b.imag
			};
		};
		this.sort = function(data, r) {
			if (data.length <= 2) {
				return data;
			}
			var index = [0, 1];
			for (var i = 0; i < r - 1; i++) {
				var tempIndex = [];
				for (var j = 0; j < index.length; j++) {
					tempIndex[j] = index[j] * 2;
					tempIndex[j + index.length] = index[j] * 2 + 1;
				}
				index = tempIndex;
			}
			var datatemp = [];
			for (var i = 0; i < index.length; i++) {
				datatemp.push(data[index[i]]);
			}
			return datatemp;
		};
		var dataLen = dataArray.length;
		var r = 1;
		var i = 1;
		while (i * 2 < dataLen) {
			i *= 2;
			r++;
		}
		var count = 1 << r;
		for (var i = dataLen; i < count; i++) {
			dataArray[i] = 0;
		}
		dataArray = this.sort(dataArray, r);
		var w = [];
		for (var i = 0; i < count / 2; i++) {
			var angle = -i * Math.PI * 2 / count;
			w.push({
				real: Math.cos(angle),
				imag: Math.sin(angle)
			});
		}
		for (var i = 0; i < r; i++) {
			var group = 1 << (r - 1 - i);
			var distance = 1 << i;
			var unit = 1 << i;
			for (var j = 0; j < group; j++) {
				var step = 2 * distance * j;
				for (var k = 0; k < unit; k++) {
					var temp = this.mul(dataArray[step + k + distance], w[count * k / 2 / distance]);
					dataArray[step + k + distance] = this.sub(dataArray[step + k], temp);
					dataArray[step + k] = this.add(dataArray[step + k], temp);
				}
			}
		}
		return dataArray;
	}

	function fft2(dataArray, width, height) {
		var r = 1;
		var i = 1;
		while (i * 2 < width) {
			i *= 2;
			r++;
		}
		var width2 = 1 << r;
		var r = 1;
		var i = 1;
		while (i * 2 < height) {
			i *= 2;
			r++;
		}
		var height2 = 1 << r;

		var dataArrayTemp = [];
		for (var i = 0; i < height2; i++) {
			for (var j = 0; j < width2; j++) {
				if (i >= height || j >= width) {
					dataArrayTemp.push(0);
				} else {
					dataArrayTemp.push(dataArray[i * width + j]);
				}
			}
		}

		dataArray = dataArrayTemp;
		width = width2;
		height = height2;

		var dataTemp = [];
		var dataArray2 = [];
		for (var i = 0; i < height; i++) {
			dataTemp = [];
			for (var j = 0; j < width; j++) {
				dataTemp.push(dataArray[i * width + j]);
			}
			dataTemp = fft(dataTemp);
			for (var j = 0; j < width; j++) {
				dataArray2.push(dataTemp[j]);
			}
		}
		dataArray = dataArray2;
		dataArray2 = [];
		for (var i = 0; i < width; i++) {
			var dataTemp = [];
			for (var j = 0; j < height; j++) {
				dataTemp.push(dataArray[j * width + i]);
			}
			dataTemp = fft(dataTemp);
			for (var j = 0; j < height; j++) {
				dataArray2.push(dataTemp[j]);
			}
		}
		dataArray = [];
		for (var i = 0; i < height; i++) {
			for (var j = 0; j < width; j++) {
				dataArray[j * height + i] = dataArray2[i * width + j];
			}
		}
        return dataArray;
	}

	function ifft(dataArray) {
		for (var i = 0, dataLen = dataArray.length; i < dataLen; i++) {
			if (typeof(dataArray[i]) != 'object') {
				dataArray[i] = {
					real: dataArray[i],
					imag: 0
				}
			}
			dataArray[i].imag *= -1;
		}
		dataArray = fft(dataArray);
		for (var i = 0, dataLen = dataArray.length; i < dataLen; i++) {
			dataArray[i].real *= 1 / dataLen;
			dataArray[i].imag *= -1 / dataLen;
		}
		return dataArray;
	}

	function ifft2(dataArray, width, height) {
		var r = 1;
		var i = 1;
		while (i * 2 < width) {
			i *= 2;
			r++;
		}
		var width2 = 1 << r;
		var r = 1;
		var i = 1;
		while (i * 2 < height) {
			i *= 2;
			r++;
		}
		var height2 = 1 << r;

		var dataArrayTemp = [];
		for (var i = 0; i < height2; i++) {
			for (var j = 0; j < width2; j++) {
				if (i >= height || j >= width) {
					dataArrayTemp.push(0);
				} else {
					dataArrayTemp.push(dataArray[i * width + j]);
				}
			}
		}

		dataArray = dataArrayTemp;
		width = width2;
		height = height2;

		var dataTemp = [];
		var dataArray2 = [];
		for (var i = 0; i < width; i++) {
			dataTemp = [];
			for (var j = 0; j < height; j++) {
				dataTemp.push(dataArray[j * width + i]);
			}
			dataTemp = ifft(dataTemp);
			for (var j = 0; j < height; j++) {
				dataArray2.push(dataTemp[j]);
			}
		}
		dataArray = [];
		for (var i = 0; i < height; i++) {
			for (var j = 0; j < width; j++) {
				dataArray[j * height + i] = dataArray2[i * width + j];
			}
		}

		dataArray2 = [];
		for (var i = 0; i < height; i++) {
			dataTemp = [];
			for (var j = 0; j < width; j++) {
				dataTemp.push(dataArray[i * width + j]);
			}
			dataTemp = ifft(dataTemp);
			for (var j = 0; j < width; j++) {
				dataArray2.push(dataTemp[j]);
			}
		}
		dataArray = dataArray2;
        return dataArray;
	}
	return (isIfft) ? ifft2(dataArray, width, height) : fft2(dataArray, width, height);
}

function fftconvert(imgData,width,height,blocksizepow){
    var blocksize= 1 << blocksizepow;
    var w_ite=Math.floor(width/blocksize);
    var h_ite=Math.floor(height/blocksize);
    var result=Array();
    for(var chann=0;chann<3;chann++)
        for(var h=0;h<h_ite;h++)
            for(var w=0;w<w_ite;w++)
            {
                var tmp=Array();
                for(var i=0;i<blocksize;i++) for(var j=0;j<blocksize;j++){
                    tmp.push(imgData[((h*blocksize+i)*width+w*blocksize+j)*4+chann]);
                }
                result.push(imageFFT(tmp, blocksize, blocksize));
            }
    return result;
}

function fastSUM(imgData,width,height,blocksizepow){
    var blocksize= 1 << blocksizepow;
    var w_ite=Math.floor(width/blocksize);
    var h_ite=Math.floor(height/blocksize);
    var result=Array();
    for(var chann=0;chann<3;chann++)
        for(var h=0;h<h_ite;h++)
            for(var w=0;w<w_ite;w++)
            {
                var tmp=0;
                for(var i=0;i<blocksize;i++) for(var j=0;j<blocksize;j++){
                    tmp=tmp+imgData[((h*blocksize+i)*width+w*blocksize+j)*4+chann];
                }
                result.push(tmp);
            }
    return result;
}