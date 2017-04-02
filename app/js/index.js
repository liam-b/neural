import Chart from 'chart.js'
import Network from './network.js'

var costGraph = document.querySelector('#costGraph')

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
  'regParameter': 46,
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

// var net = new Network([9, 5, 5, 5, 5, 1], {
//   'regParameter': 47,
//   'learningRate': 0.3,
//   'weightRange': 40,
//
//   'train': data
// })

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
      // net.logWeights()

      // var data = []
      // for (var i = 0; i < net.costHistory.length; i += 1) {
      //   console.log(net.costHistory[i])
      //   data.push({x: net.costHistory[i][0], y: net.costHistory[i][1]})
      // }
      // var myChart = new Chart(costGraph, {
      //   type: 'line',
      //   data: {
      //     labels: ['time'],
      //     datasets: [{
      //       label: 'cost',
      //       data: data,
      //       backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      //       borderColor: ['rgba(255,99,132,1)'],
      //       borderWidth: 1
      //     }]
      //   },
      //   options: {
      //     responsive: true,
      //     maintainAspectRatio: false,
      //     scales: {
      //       yAxes: [{
      //         ticks: {
      //           beginAtZero: true
      //         }
      //       }],
      //       xAxes: [{
      //         // beginAtZero: true,
      //         type: 'linear',
      //         display: true,
      //         position: 'bottom'
      //       }]
      //     }
      //   }
      // })
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
