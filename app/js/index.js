import Network from './network.js'

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

var net = new Network([3, 4, 4, 4, 2], {
  'regParameter': 45,
  'learningRate': 0.3,
  'weightRange': 40,

  'train': [
    [[0, 0, 0], [0, 0]],
    [[0, 0, 1], [1, 0]],
    [[0, 1, 0], [1, 0]],
    [[0, 1, 1], [0, 1]],
    [[1, 0, 0], [1, 0]],
    [[1, 0, 1], [0, 1]],
    [[1, 1, 0], [0, 1]],
    [[1, 1, 1], [1, 1]],
  ]
})

var trainingIterations = 100

net.weights = net.randomWeights()

var app = angular.module('neural', [])

app.controller('learning', function ($scope) {
    $scope.iterations = trainingIterations
    $scope.range = net.range
    $scope.regParameter = net.regParameter
    $scope.learningRate = net.learningRate

    $scope.costHistory = net.costHistory

    $scope.trainNet = function () {
      net.learn(trainingIterations)
      net.display({
        neuronSize: 20,
        neuronGap: 70,
        layerGap: 100,
        weightWidth: 4
      })
    }
})

app.controller('data', function ($scope) {
    $scope.trainingData = net.train
    $scope.outputs = net.outputs
})

net.display({
  neuronSize: 20,
  neuronGap: 70,
  layerGap: 100,
  weightWidth: 4
})
