var canvas = document.querySelector('canvas')

canvas.width = canvas.parentElement.offsetWidth / 2;

console.log(canvas.parentElement)

var context = canvas.getContext('2d')

export default function drawWeights (weights, range, options) {
  context.clearRect(0, 0, canvas.width, canvas.height)

  for (var layer = 0; layer < weights.length; layer += 1) {
    var lastBias = (layer == weights.length - 1) ? 0 : 1
    for (var neuron = 0; neuron < weights[layer].length + lastBias; neuron += 1) {
      let type = 'hidden'
      if (layer == 0) type = 'input'
      if (neuron == 0) type = 'bias'
      if (layer == weights.length - 1) type = 'output'

      if (layer != weights.length - 1) {
        for (var nextNeuron = 0; nextNeuron < weights[layer + 1].length; nextNeuron += 1) {
          drawLine(
            ((canvas.width / 2) + (options.layerGap * layer)) - (options.layerGap * weights.length / 2) + (options.layerGap / 2),
            ((canvas.height / 2) + (options.neuronGap * neuron)) - (options.neuronGap * (weights[layer].length + 1 - (1 - lastBias)) / 2) + (options.neuronGap / 2),

            ((canvas.width / 2) + (options.layerGap * (layer + 1))) - (options.layerGap * weights.length / 2) + (options.layerGap / 2),
            ((canvas.height / 2) + (options.neuronGap * nextNeuron)) - (options.neuronGap * (weights[layer + 1].length + 1 - (1 - lastBias)) / 2) + (options.neuronGap / 2) + options.neuronGap - ((layer != weights.length - 2) ? 0 : 1 * options.neuronGap / 2),

            weightColor(weights[layer + 1][nextNeuron][neuron], range), options.weightWidth
          )
        }
      }

      drawNeuron(((canvas.width / 2) + (options.layerGap * layer)) - (options.layerGap * weights.length / 2) + (options.layerGap / 2), ((canvas.height / 2) + (options.neuronGap * neuron)) - (options.neuronGap * (weights[layer].length + 1 - (1 - lastBias)) / 2) + (options.neuronGap / 2), type, options.neuronSize)
    }
  }
}

// drawNeuron(100, 100, 'input')
// drawNeuron(100, 200, 'hidden')
// drawNeuron(100, 400, 'bias')

function drawNeuron (x, y, type, size) {
  var color = '#000000'

  switch (type) {
    case 'input':
      color = '#81C784'
      break;
    case 'hidden':
      color = '#64B5F6'
      break;
    case 'output':
      color = '#E57373'
      break;
    case 'bias':
      color = '#FFF176'
      break;
  }

  context.beginPath()
  context.arc(x, y, size, 0, 2 * Math.PI, false)
  context.fillStyle = color
  context.fill()
  context.lineWidth = 3
  context.strokeStyle = colorChange(color, -10)
  context.stroke()
}

function drawLine (x1, y1, x2, y2, color, width) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.strokeStyle = color
  context.lineWidth = width
  context.stroke()
}

function colorChange(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

function weightColor (weight, range) {
  var col = Math.floor((255 / (2 * range)) * (range + weight))
  col = col.toString(16)
  return '#' + col + col + col
}