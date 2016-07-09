var test = require('tape');

var board = require('../lib/board.js').board;
// Function under test
var up = require('../lib/moves.js').up;
var down = require('../lib/moves.js').down;
var left = require('../lib/moves.js').left;
var right = require('../lib/moves.js').right;


test('up function', function (t) {
  var dim = 3;
  var b = board(dim);
  t.deepEqual(up(down(b)),
    [0, 1, 2,
      3, 4, 5,
      6, 7, 8]);
  t.end();
});

test('down function', function (t) {
  var dim = 3;
  var b = board(dim);
  t.deepEqual(down(b),
    [3, 1, 2,
      0, 4, 5,
      6, 7, 8]);
  t.end();
});

test('left function', function (t) {
  var dim = 3;
  var b = board(dim);
  t.deepEqual(left(right(b)),
    [0, 1, 2,
      3, 4, 5,
      6, 7, 8]);
  t.end();
});

test('right function', function (t) {
  var dim = 3;
  var b = board(dim);
  t.deepEqual(right(b),
    [1, 0, 2,
      3, 4, 5,
      6, 7, 8]);
  t.end();
});
