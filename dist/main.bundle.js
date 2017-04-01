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

	var _network = __webpack_require__(1);

	var _network2 = _interopRequireDefault(_network);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// var net = new Network([3, 5, 5, 3], {
	//   'regParameter': 45,
	//   'learningRate': 0.3,
	//
	//   'weightRange': 40,
	//
	//   'train': [
	//     [[0, 0, 0], [0, 0, 1]],
	//     [[0, 0, 1], [0, 1, 0]],
	//     [[0, 1, 0], [0, 1, 1]],
	//     [[0, 1, 1], [1, 0, 0]],
	//
	//     [[1, 0, 0], [1, 0, 1]],
	//     [[1, 0, 1], [1, 1, 0]],
	//     [[1, 1, 0], [1, 1, 1]],
	//     [[1, 1, 1], [0, 0, 0]],
	//   ]
	// })

	// var net = new Network([3, 2, 1], {
	//   'regParameter': 45,
	//   'learningRate': 0.3,
	//   'weightRange': 40,
	//
	//   'train': [
	//     [[0, 0, 0], [0]],
	//     [[0, 0, 1], [0]],
	//     [[0, 1, 0], [0]],
	//     [[0, 1, 1], [1]],
	//     [[1, 0, 0], [0]],
	//     [[1, 0, 1], [0]],
	//     [[1, 1, 0], [0]],
	//     [[1, 1, 1], [1]],
	//   ]
	// })

	var net = new _network2.default([3, 4, 4, 4, 2], {
	  'regParameter': 45,
	  'learningRate': 0.3,
	  'weightRange': 40,

	  'train': [[[0, 0, 0], [0, 0]], [[0, 0, 1], [1, 0]], [[0, 1, 0], [1, 0]], [[0, 1, 1], [0, 1]], [[1, 0, 0], [1, 0]], [[1, 0, 1], [0, 1]], [[1, 1, 0], [0, 1]], [[1, 1, 1], [1, 1]]]
	});

	var trainingIterations = 100;

	net.weights = net.randomWeights();

	var app = angular.module('neural', []);

	app.controller('learning', function ($scope) {
	  $scope.iterations = trainingIterations;
	  $scope.range = net.range;
	  $scope.regParameter = net.regParameter;
	  $scope.learningRate = net.learningRate;

	  $scope.costHistory = net.costHistory;

	  $scope.trainNet = function () {
	    net.learn(trainingIterations);
	    net.display({
	      neuronSize: 20,
	      neuronGap: 70,
	      layerGap: 100,
	      weightWidth: 4
	    });
	  };
	});

	app.controller('data', function ($scope) {
	  $scope.trainingData = net.train;
	  $scope.outputs = net.outputs;
	});

	net.display({
	  neuronSize: 20,
	  neuronGap: 70,
	  layerGap: 100,
	  weightWidth: 4
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _display2 = __webpack_require__(2);

	var _display3 = _interopRequireDefault(_display2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Network = function () {
	  function Network(structure, options) {
	    _classCallCheck(this, Network);

	    this.structure = structure;
	    this.range = options.weightRange;
	    this.weights = [];

	    this.costHistory = [];
	    this.costCounter = 0;
	    this.outputs = [];

	    this.regParameter = options.regParameter;
	    this.learningRate = options.learningRate;
	    this.train = options.train;
	  }

	  _createClass(Network, [{
	    key: 'learn',
	    value: function learn(iterations) {
	      for (var i = 0; i < iterations; i += 1) {
	        this.backPropagate(this.train, this.learningRate, this.regParameter);
	        this.costHistory[i + this.costCounter] = [i + this.costCounter, this._round(this.cost(this.train, this.regParameter))];
	      }
	      this.costCounter += iterations;
	      this.informativeCost();
	    }
	  }, {
	    key: 'display',
	    value: function display(options) {
	      (0, _display3.default)(this.weights, this.range, options);
	    }
	  }, {
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
	    value: function cost(data, lambda) {
	      var cost = 0;
	      var count = 0;
	      for (var i = 0; i < data.length; i += 1) {
	        var results = this.propagate(data[i][0]);
	        for (var result = 0; result < results.length; result += 1) {
	          cost += Math.abs(results[result] - data[i][1][result]);
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
	    value: function backPropagate(data, learnRate, lambda) {
	      for (var layer = this.structure.length; layer > 0; layer -= 1) {
	        for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
	          for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
	            // console.log('-----')
	            // for (var d = -this.range; d < this.range; d += 2) {
	            //   this.weights[layer][neuron][weight] = d
	            //   console.log(d + ',', this.cost(input, expected, lambda))
	            // }

	            var originalWeight = this.weights[layer][neuron][weight];

	            this.weights[layer][neuron][weight] = originalWeight + learnRate;
	            var incCost = this.cost(data, lambda);

	            this.weights[layer][neuron][weight] = originalWeight - learnRate;
	            var decCost = this.cost(data, lambda);

	            this.weights[layer][neuron][weight] = originalWeight;

	            if (incCost > decCost) this.weights[layer][neuron][weight] -= learnRate;else if (incCost != decCost) this.weights[layer][neuron][weight] += learnRate;

	            if (Math.random() < 0.5) {
	              this.weights[layer][neuron][weight] = this._random(this.range, -this.range);
	              var randomCost = this.cost(data, lambda);
	              if (randomCost > decCost && randomCost > incCost) this.weights[layer][neuron][weight] = originalWeight;
	              if (randomCost < decCost && randomCost < incCost) console.log('new guess cost', randomCost, 'was better than old cost of', incCost);
	            }

	            // console.log('weight', originalWeight, 'inc cost', incCost, 'dec cost', decCost, 'result', (incCost > decCost) ? 'dec' : (incCost != decCost) ? 'inc' : 'same')

	            this.weights[layer][neuron][weight] = Math.max(-this.range, Math.min(this.weights[layer][neuron][weight], this.range));
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
	    value: function informativeCost() {
	      for (var i = 0; i < this.train.length; i += 1) {
	        var results = this.propagate(this.train[i][0]);
	        for (var n = 0; n < results.length; n += 1) {
	          // results[n] = (results[n] < 0.5) ? 0 : 1
	          results[n] = Math.floor(results[n] * 100) / 100;
	        }
	        this.outputs[i] = [this.train[i][0], results];
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = drawWeights;
	var canvas = document.querySelector('canvas');

	canvas.width = canvas.parentElement.offsetWidth * 0.5;
	canvas.height = canvas.parentElement.offsetHeight;

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

/***/ }
/******/ ]);