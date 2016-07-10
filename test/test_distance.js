var test = require('tape');

var board = require('../lib/board.js').board;

// Function under test
var distance = require('../lib/distance.js');

test('distance function Y delta', function (t) {

  var arr0 =
    [3, 1, 2,
      0, 4, 5,
      6, 7, 8];
  var arr1 =
    [0, 1, 2,
      3, 4, 5,
      6, 7, 8];

  t.equal(distance(arr0, arr1), 2);
  t.end();
});

test('distance function X delta to sorted board', function (t) {

  var arr0 =
    [1, 0, 2,
      3, 4, 5,
      6, 7, 8];
  var arr1 =
    [0, 1, 2,
      3, 4, 5,
      6, 7, 8];

  t.equal(distance(arr0, arr1), 2);
  t.end();
});

test('distance function X and Y delta', function (t) {

  var arr0 =
    [1, 4, 2,
      3, 0, 5,
      6, 7, 8];
  var arr1 =
    [0, 1, 2,
      3, 4, 5,
      6, 7, 8];

  t.equal(distance(arr0, arr1), 4);
  t.end();
});


test('distance function on two identical boards', function (t) {

  t.equal(0, distance(board(3), board(3)));
  t.end();
});

