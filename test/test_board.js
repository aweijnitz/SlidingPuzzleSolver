var test = require('tape');

var up = require('../lib/moves.js').up;
var down = require('../lib/moves.js').down;
var left = require('../lib/moves.js').left;
var right = require('../lib/moves.js').right;

// Function under test
var board = require('../lib/board.js').board;
var shuffle = require('../lib/board.js').shuffle;
var possibleMoves = require('../lib/board.js').possibleMoves;


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


