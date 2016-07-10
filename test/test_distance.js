var test = require('tape');

var board = require('../lib/board.js').board;

// Function under test
var distance = require('../lib/distance.js');

test('distance function', function (t) {

  var arr0 = [0, 1, 2];
  var arr1 = [1, -1, 2];
  t.equal(3, distance(arr0, arr1));
  t.end();
});

test('distance function on two identical boards', function (t) {

  t.equal(0, distance(board(3), board(3)));
  t.end();
});

