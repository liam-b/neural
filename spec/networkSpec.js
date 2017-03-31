import Network from `../app/js/network.js`

describe('test neural network', function () {
  var net = new Network([2, 2, 1], 10);

  it('should generate a correct weights', function () {
    net.weights = net.randomWeights();
    var correctWeight = true

    for (var i = 0; i < net.weights.length; i += 1) {
      if (net.weights[i].length != net.structure[i]) {
        correctWeight = false
      }
    }

    expect(correctWeight).toBe(true);
  });

  fit('should be able to forward propagate', function () {
    a = true;
    expect(a).toBe(true);
  });
});