import display from './display.js'
import Network from './network.js'

// var net = new Network([2, 4, 4, 2], 20)
var net = new Network([2, 1], 20)
net.weights = net.randomWeights()
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

var testInputs = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
]

var testExpected = [
  [0],
  [0],
  [0],
  [1]
]

// net.logWeights()

var lambda = 45
for (var i = 0; i < 50; i += 1) {
  net.backPropagate(testInputs, testExpected, 0.3, lambda)
  console.log(i, net._round(net.cost(testInputs, testExpected, lambda)))
}

console.log('---')

console.log('cost', net._round(net.cost(testInputs, testExpected, lambda)))
console.log(net.weights)

console.log('---')

net.informativeCost(testInputs, testExpected)
net.logWeights()

display(net.weights, 20, {
  neuronSize: 20,
  neuronGap: 70,
  layerGap: 100,
  weightWidth: 4
})

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
