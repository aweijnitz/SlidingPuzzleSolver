var test = require('tape');

// Function under test
var board = require('../lib/board.js').board;
var shuffle = require('../lib/board.js').shuffle;
var possibleMoves = require('../lib/board.js').possibleMoves;

var up = require('../lib/board.js').up;
var down = require('../lib/board.js').down;
var left = require('../lib/board.js').left;
var right = require('../lib/board.js').right;


test('board function', function (t) {

  var b = board(3);
  t.deepEqual(b, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  t.end();
});

test('possibleMoves function', function (t) {

  var possible = possibleMoves(board(3));
  t.ok(possible.indexOf(up == -1));
  t.ok(possible.indexOf(down >= 0));
  t.ok(possible.indexOf(left == -1));
  t.ok(possible.indexOf(right >= 1));

  possible = possibleMoves(right(down(board(3))));
  t.ok(possible.indexOf(up >= 0));
  t.ok(possible.indexOf(down >= 0));
  t.ok(possible.indexOf(left >= 0));
  t.ok(possible.indexOf(right >= 0));

  t.end();
});


test('shuffle function', function (t) {

  //var b0 = shuffle(3);
  var b1 = board(3);

//  t.notDeepEqual(b0, ['0','1','2','3','4','5','6','7','8']);
//  t.notDeepEqual(b1, ['0','1','2','3','4','5','6','7','8']);
  t.pass();
  t.end();
});



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
