export default class Network {
  constructor (structure, range) {
    this.structure = structure
    this.range = range
    this.weights = []
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

  cost (input, expected, lambda) {
    var cost = 0
    var count = 0
    for (var i = 0; i < input.length; i += 1) {
      var results = this.propagate(input[i])
      for (var result = 0; result < results.length; result += 1) {
        cost += Math.abs(results[result] - expected[i][result])
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

  backPropagate (input, expected, learnRate, lambda) {
    for (var layer = this.structure.length; layer > 0; layer -= 1) {
      for (var neuron = 0; neuron < this.structure[layer]; neuron += 1) {
        for (var weight = 0; weight < this.weights[layer][neuron].length; weight += 1) {
          var originalWeight = this.weights[layer][neuron][weight]

          this.weights[layer][neuron][weight] = originalWeight + learnRate
          var incCost = this.cost(input, expected, lambda)

          this.weights[layer][neuron][weight] = originalWeight - learnRate
          var decCost = this.cost(input, expected, lambda)

          this.weights[layer][neuron][weight] = originalWeight

          if (incCost > decCost) this.weights[layer][neuron][weight] -= learnRate
          else if (incCost != decCost) this.weights[layer][neuron][weight] += learnRate

          if (Math.random() < 0.5) {
            this.weights[layer][neuron][weight] = this._random(this.range, -this.range)
            var randomCost = this.cost(input, expected, lambda)
            if (randomCost > decCost && randomCost > incCost) this.weights[layer][neuron][weight] = originalWeight
            if (randomCost > decCost && randomCost > incCost) console.log('guess was better!')
          }

          // console.log('weight', originalWeight, 'inc cost', incCost, 'dec cost', decCost, 'result', (incCost > decCost) ? 'dec' : (incCost != decCost) ? 'inc' : 'same')

          this.weights[layer][neuron][weight] = Math.max(-this.range * 2, Math.min(this.weights[layer][neuron][weight], this.range * 2))
        }
      }
    }
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

  informativeCost (input, expected) {
    for (var i = 0; i < input.length; i += 1) {
      var results = this.propagate(input[i])
      for (var n = 0; n < results.length; n += 1) {
        results[n] = this._round(results[n])
      }
      console.log('expected', expected[i], 'got', results)
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
    return Math.random() * (max - min) + min
  }

  _sigmoid (num) {
    return 1 / (1 + Math.exp(-num))
  }

  _round (num) {
    return Math.floor(num * 1000) / 1000
  }
}