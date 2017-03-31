/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _display = __webpack_require__(1);

	var _display2 = _interopRequireDefault(_display);

	var _network = __webpack_require__(2);

	var _network2 = _interopRequireDefault(_network);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// var net = new Network([2, 4, 4, 2], 20)
	var net = new _network2.default([2, 1], 20);
	net.weights = net.randomWeights();
	// console.log(net.weights)
	// net.weights = [
	//   [
	//     [10, 10],
	//     [10, 10]
	//   ],
	//   [
	//     [0, 15, 10],
	//   ]
	// ]
	//
	// console.log(net.cost([
	//   [1, 1],
	//   [0, 0]
	// ], [
	//   [1],
	//   [0.5]
	// ]))
	//
	// console.log(net.propagate([0, 0]))

	// var testInputs = [
	//   [0, 0],
	//   [0, 1],
	//   [1, 0],
	//   [1, 1]
	// ]
	//
	// var testExpected = [
	//   [0, 1],
	//   [1, 0],
	//   [1, 1],
	//   [0, 0]
	// ]

	var testInputs = [[0, 0], [0, 1], [1, 0], [1, 1]];

	var testExpected = [[0], [0], [0], [1]];

	// net.logWeights()

	var lambda = 45;
	for (var i = 0; i < 50; i += 1) {
	  net.backPropagate(testInputs, testExpected, 0.3, lambda);
	  console.log(i, net._round(net.cost(testInputs, testExpected, lambda)));
	}

	console.log('---');

	console.log('cost', net._round(net.cost(testInputs, testExpected, lambda)));
	console.log(net.weights);

	console.log('---');

	net.informativeCost(testInputs, testExpected);
	net.logWeights();

	(0, _display2.default)(net.weights, 20, {
	  neuronSize: 20,
	  neuronGap: 70,
	  layerGap: 100,
	  weightWidth: 4
	});

	// var displayNet = new Network([2, 3, 3, 1], 10)
	// displayNet.weights = displayNet.randomWeights()
	// display(displayNet.weights, 20, {
	//   neuronSize: 20,
	//     neuronGap: 70,
	//     layerGap: 100,
	//     weightWidth: 4
	// })

	// cost(net, [
	//   {'case': [0, 0], 'expect': [0, 1]},
	//   {'case': [0, 1], 'expect': [1, 0]},
	//   {'case': [1, 0], 'expect': [1, 1]},
	//   {'case': [1, 1], 'expect': [0, 0]}
	// ])

	// cost(net, [
	//   {'case': [0, 0], 'expect': [0]},
	//   {'case': [0, 1], 'expect': [1]},
	//   {'case': [1, 0], 'expect': [1]},
	//   {'case': [1, 1], 'expect': [1]}
	// ])

	// console.log(Math.floor(net.propagate([0, 1]) * 100) / 100)
	//
	// function cost (neuralNet, cases) {
	//   var result = 0
	//   for (var i = 0; i < cases.length; i += 1) {
	//     let currentResult = neuralNet.propagate(cases[i].case)
	//     for (var n = 0; n < currentResult.length; n += 1) {
	//       result += Math.pow(cases[i].expect[n] - currentResult[n], 2)
	//     }
	//     console.log('for case', cases[i].case, 'expected', cases[i].expect, 'got', Math.floor(currentResult * 100) / 100)
	//   }
	//   console.log(result)
	// }

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = drawWeights;
	var canvas = document.querySelector('canvas');

	canvas.width = canvas.parentElement.offsetWidth / 2;

	console.log(canvas.parentElement);

	var context = canvas.getContext('2d');

	function drawWeights(weights, range, options) {
	  context.clearRect(0, 0, canvas.width, canvas.height);

	  for (var layer = 0; layer < weights.length; layer += 1) {
	    var lastBias = layer == weights.length - 1 ? 0 : 1;
	    for (var neuron = 0; neuron < weights[layer].length + lastBias; neuron += 1) {
	      var type = 'hidden';
	      if (layer == 0) type = 'input';
	      if (neuron == 0) type = 'bias';
	      if (layer == weights.length - 1) type = 'output';

	      if (layer != weights.length - 1) {
	        for (var nextNeuron = 0; nextNeuron < weights[layer + 1].length; nextNeuron += 1) {
	          drawLine(canvas.width / 2 + options.layerGap * layer - options.layerGap * weights.length / 2 + options.layerGap / 2, canvas.height / 2 + options.neuronGap * neuron - options.neuronGap * (weights[layer].length + 1 - (1 - lastBias)) / 2 + options.neuronGap / 2, canvas.width / 2 + options.layerGap * (layer + 1) - options.layerGap * weights.length / 2 + options.layerGap / 2, canvas.height / 2 + options.neuronGap * nextNeuron - options.neuronGap * (weights[layer + 1].length + 1 - (1 - lastBias)) / 2 + options.neuronGap / 2 + options.neuronGap - (layer != weights.length - 2 ? 0 : 1 * options.neuronGap / 2), weightColor(weights[layer + 1][nextNeuron][neuron], range), options.weightWidth);
	        }
	      }

	      drawNeuron(canvas.width / 2 + options.layerGap * layer - options.layerGap * weights.length / 2 + options.layerGap / 2, canvas.height / 2 + options.neuronGap * neuron - options.neuronGap * (weights[layer].length + 1 - (1 - lastBias)) / 2 + options.neuronGap / 2, type, options.neuronSize);
	    }
	  }
	}

	// drawNeuron(100, 100, 'input')
	// drawNeuron(100, 200, 'hidden')
	// drawNeuron(100, 400, 'bias')

	function drawNeuron(x, y, type, size) {
	  var color = '#000000';

	  switch (type) {
	    case 'input':
	      color = '#81C784';
	      break;
	    case 'hidden':
	      color = '#64B5F6';
	      break;
	    case 'output':
	      color = '#E57373';
	      break;
	    case 'bias':
	      color = '#FFF176';
	      break;
	  }

	  context.beginPath();
	  context.arc(x, y, size, 0, 2 * Math.PI, false);
	  context.fillStyle = color;
	  context.fill();
	  context.lineWidth = 3;
	  context.strokeStyle = colorChange(color, -10);
	  context.stroke();
	}

	function drawLine(x1, y1, x2, y2, color, width) {
	  context.beginPath();
	  context.moveTo(x1, y1);
	  context.lineTo(x2, y2);
	  context.strokeStyle = color;
	  context.lineWidth = width;
	  context.stroke();
	}

	function colorChange(col, amt) {
	  var usePound = false;
	  if (col[0] == "#") {
	    col = col.slice(1);
	    usePound = true;
	  }

	  var num = parseInt(col, 16);

	  var r = (num >> 16) + amt;

	  if (r > 255) r = 255;else if (r < 0) r = 0;

	  var b = (num >> 8 & 0x00FF) + amt;

	  if (b > 255) b = 255;else if (b < 0) b = 0;

	  var g = (num & 0x0000FF) + amt;

	  if (g > 255) g = 255;else if (g < 0) g = 0;

	  return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
	}

	function weightColor(weight, range) {
	  var col = Math.floor(255 / (2 * range) * (range + weight));
	  col = col.toString(16);
	  return '#' + col + col + col;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Network = function () {
	  function Network(structure, range) {
	    _classCallCheck(this, Network);

	    this.structure = structure;
	    this.range = range;
	    this.weights = [];
	  }

	  _createClass(Network, [{
	    key: 'propagate',
	    value: function propagate(inputs) {
	      var output = inputs;
	      for (var layer = 0; layer < this.structure.length; layer += 1) {
	        // console.log('layer', layer, 'with inputs', output)
	        var layerOutput = [];
	        for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
	          var weights = this.weights[layer][neuron];
	          var neuronOutput = weights[0];
	          // console.log('neuron', neuron, 'with inputs', output, 'weights', weights)
	          // console.log('input', 1, weights[0], weights[0])
	          for (var input = 0; input < output.length; input += 1) {
	            neuronOutput += output[input] * weights[input + 1];
	            // console.log('input', output[input], weights[input + 1], output[input] * weights[input + 1])
	          }
	          // console.log('pre calc', neuronOutput)
	          layerOutput[neuron] = layer == 0 ? output[neuron] : this._sigmoid(neuronOutput);
	          // console.log('neuron', neuron, 'gave output', layerOutput[neuron])
	        }
	        output = layerOutput;
	        // console.log('layer', layer, 'gave output', output)
	      }
	      return output;
	    }
	  }, {
	    key: 'cost',
	    value: function cost(input, expected, lambda) {
	      var cost = 0;
	      var count = 0;
	      for (var i = 0; i < input.length; i += 1) {
	        var results = this.propagate(input[i]);
	        for (var result = 0; result < results.length; result += 1) {
	          cost += Math.abs(results[result] - expected[i][result]);
	          count += 1;
	        }
	      }
	      cost *= 10;

	      var reg = 0;
	      for (var layer = 0; layer < this.structure.length; layer += 1) {
	        for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
	          for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
	            reg += Math.pow(this.weights[layer][neuron][weight], 2);
	          }
	        }
	      }
	      reg = reg * (1 / Math.pow(10, lambda / 10));

	      return cost + reg / count;
	    }
	  }, {
	    key: 'backPropagate',
	    value: function backPropagate(input, expected, learnRate, lambda) {
	      for (var layer = this.structure.length; layer > 0; layer -= 1) {
	        for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
	          for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
	            var originalWeight = this.weights[layer][neuron][weight];

	            this.weights[layer][neuron][weight] = originalWeight + learnRate;
	            var incCost = this.cost(input, expected, lambda);

	            this.weights[layer][neuron][weight] = originalWeight - learnRate;
	            var decCost = this.cost(input, expected, lambda);

	            this.weights[layer][neuron][weight] = originalWeight;

	            if (incCost > decCost) this.weights[layer][neuron][weight] -= learnRate;else if (incCost != decCost) this.weights[layer][neuron][weight] += learnRate;

	            if (Math.random() < 0.5) {
	              this.weights[layer][neuron][weight] = this._random(this.range, -this.range);
	              var randomCost = this.cost(input, expected, lambda);
	              if (randomCost > decCost && randomCost > incCost) this.weights[layer][neuron][weight] = originalWeight;
	              if (randomCost > decCost && randomCost > incCost) console.log('guess was better!');
	            }

	            // console.log('weight', originalWeight, 'inc cost', incCost, 'dec cost', decCost, 'result', (incCost > decCost) ? 'dec' : (incCost != decCost) ? 'inc' : 'same')

	            this.weights[layer][neuron][weight] = Math.max(-this.range * 2, Math.min(this.weights[layer][neuron][weight], this.range * 2));
	          }
	        }
	      }
	    }
	  }, {
	    key: 'randomWeights',
	    value: function randomWeights() {
	      var weights = [];
	      for (var i = 0; i < this.structure.length; i += 1) {
	        weights[i] = [];
	        if (i == 0) {
	          for (var neuron = 0; neuron < this.structure[i]; neuron += 1) {
	            weights[i][neuron] = [0, this._random(this.range, -this.range)];
	          }
	        } else {
	          for (var neuron = 0; neuron < this.structure[i]; neuron += 1) {
	            weights[i][neuron] = [];
	            for (var weight = 0; weight < this.structure[i - 1] + 1; weight += 1) {
	              weights[i][neuron][weight] = this._random(this.range, -this.range);
	            }
	          }
	        }
	      }
	      return weights;
	    }
	  }, {
	    key: 'informativeCost',
	    value: function informativeCost(input, expected) {
	      for (var i = 0; i < input.length; i += 1) {
	        var results = this.propagate(input[i]);
	        for (var n = 0; n < results.length; n += 1) {
	          results[n] = this._round(results[n]);
	        }
	        console.log('expected', expected[i], 'got', results);
	      }
	    }
	  }, {
	    key: 'logWeights',
	    value: function logWeights() {
	      for (var layer = 0; layer < this.structure.length; layer += 1) {
	        for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
	          for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
	            console.log(this.weights[layer][neuron][weight]);
	          }
	        }
	      }
	    }
	  }, {
	    key: '_random',
	    value: function _random(max, min) {
	      return Math.random() * (max - min) + min;
	    }
	  }, {
	    key: '_sigmoid',
	    value: function _sigmoid(num) {
	      return 1 / (1 + Math.exp(-num));
	    }
	  }, {
	    key: '_round',
	    value: function _round(num) {
	      return Math.floor(num * 1000) / 1000;
	    }
	  }]);

	  return Network;
	}();

	exports.default = Network;

/***/ }
/******/ ]);