import display from './display.js'
import randomSeed from 'random-seed'

var rand = randomSeed.create()
rand.seed('hi')

export default class Network {
  constructor (structure, options) {
    this.structure = structure
    this.range = options.weightRange
    this.weights = []

    this.costHistory = []
    this.costCounter = 0
    this.outputs = []

    this.regParameter = options.regParameter
    this.learningRate = options.learningRate
    this.train = options.train

    this.lastCost = 0
  }

  learn (iterations) {
    for (var i = 0; i < iterations; i += 1) {
      this.backPropagate(this.train, this.learningRate, this.regParameter)
      this.costHistory[i + this.costCounter] = [i + this.costCounter, this._round(this.cost(this.train, this.regParameter))]
    }
    this.costCounter += iterations
    this.informativeCost()
  }

  display (options) {
    display(this.weights, this.range, options)
  }

  propagate (inputs) {
    var output = inputs
    for (var layer = 0; layer < this.structure.length; layer += 1) {
      // console.log('layer', layer, 'with inputs', output)
      var layerOutput = []
      for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
        var weights = this.weights[layer][neuron]
        var neuronOutput = weights[0]
        // console.log('neuron', neuron, 'with inputs', output, 'weights', weights)
        // console.log('input', 1, weights[0], weights[0])
        for (var input = 0; input < output.length; input += 1) {
          neuronOutput += output[input] * weights[input + 1]
          // console.log('input', output[input], weights[input + 1], output[input] * weights[input + 1])
        }
        // console.log('pre calc', neuronOutput)
        layerOutput[neuron] = (layer == 0) ? output[neuron] : this._sigmoid(neuronOutput)
        // console.log('neuron', neuron, 'gave output', layerOutput[neuron])
      }
      output = layerOutput
      // console.log('layer', layer, 'gave output', output)
    }
    return output
  }

  cost (data, lambda) {
    var cost = 0
    var count = 0
    for (var i = 0; i < data.length; i += 1) {
      var results = this.propagate(data[i][0])
      for (var result = 0; result < results.length; result += 1) {
        cost += Math.abs(results[result] - data[i][1][result])
        count += 1
      }
    }
    cost *= 10

    var reg = 0
    for (var layer = 0; layer < this.structure.length; layer += 1) {
      for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
        for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
          reg += Math.pow(this.weights[layer][neuron][weight], 2)
        }
      }
    }
    reg = reg * (1 / Math.pow(10, lambda / 10))

    return cost + (reg / count)
  }

  backPropagate (data, learnRate, lambda) {
    for (var layer = this.structure.length - 1; layer > -1; layer -= 1) {
      for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
        for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
          // console.log('-----')
          // for (var d = -this.range; d < this.range; d += 2) {
          //   this.weights[layer][neuron][weight] = d
          //   console.log(d + ',', this.cost(input, expected, lambda))
          // }

          var originalWeight = this.weights[layer][neuron][weight]

          this.weights[layer][neuron][weight] = originalWeight + learnRate
          var incCost = this.cost(data, lambda)

          this.weights[layer][neuron][weight] = originalWeight - learnRate
          var decCost = this.cost(data, lambda)

          this.weights[layer][neuron][weight] = originalWeight

          if (incCost > decCost) this.weights[layer][neuron][weight] -= learnRate
          else if (incCost != decCost) this.weights[layer][neuron][weight] += learnRate

          // if (Math.random() < 0.5) {
          //   this.weights[layer][neuron][weight] = this._random(this.range, -this.range)
          //   var randomCost = this.cost(data, lambda)
          //   if (randomCost > decCost && randomCost > incCost) this.weights[layer][neuron][weight] = originalWeight
          //   if (randomCost < decCost && randomCost < incCost) console.log('new guess cost', randomCost, 'was better than old cost of', incCost)
          // }

          // console.log('weight', originalWeight, 'inc cost', incCost, 'dec cost', decCost, 'result', (incCost > decCost) ? 'dec' : (incCost != decCost) ? 'inc' : 'same')

          this.weights[layer][neuron][weight] = Math.max(-this.range, Math.min(this.weights[layer][neuron][weight], this.range))
        }
      }
    }

    // if (this.lastCost == this._round(this.cost(data, lambda))) {
    //   for (var layer = this.structure.length; layer > 0; layer -= 1) {
    //     for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
    //       for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
    //         var bestWeight = 0
    //         for (var d = -this.range; d < this.range; d += 2) {
    //           this.weights[layer][neuron][weight] = d
    //           if (this.cost(data, lambda) < bestWeight) {
    //             bestWeight = this.weights[layer][neuron][weight]
    //           }
    //         }
    //         this.weights[layer][neuron][weight] = bestWeight
    //       }
    //     }
    //   }
    // }
    //
    // this.lastCost = this._round(this.cost(data, lambda))
  }

  randomWeights () {
    var weights = []
    for (var i = 0; i < this.structure.length; i += 1) {
      weights[i] = []
      if (i == 0) {
        for (var neuron = 0; neuron < this.structure[i]; neuron += 1) {
          weights[i][neuron] = [0, this._random(this.range, -this.range)]
        }
      }
      else {
        for (var neuron = 0; neuron < this.structure[i]; neuron += 1) {
          weights[i][neuron] = []
          for (var weight = 0; weight < (this.structure[i - 1] + 1); weight += 1) {
            weights[i][neuron][weight] = this._random(this.range, -this.range)
          }
        }
      }
    }
    return weights
  }

  informativeCost () {
    for (var i = 0; i < this.train.length; i += 1) {
      var results = this.propagate(this.train[i][0])
      for (var n = 0; n < results.length; n += 1) {
        // results[n] = (results[n] < 0.5) ? 0 : 1
        results[n] = Math.floor(results[n] * 100) / 100
      }
      this.outputs[i] = [this.train[i][0], results]
    }
  }

  logWeights () {
    for (var layer = 0; layer < this.structure.length; layer += 1) {
      for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
        for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
          console.log(this.weights[layer][neuron][weight])
        }
      }
    }
  }

  _random (max, min) {
    return rand.random() * (max - min) + min
  }

  _sigmoid (num) {
    return 1 / (1 + Math.exp(-num))
  }

  _round (num) {
    return Math.floor(num * 1000) / 1000
  }
}