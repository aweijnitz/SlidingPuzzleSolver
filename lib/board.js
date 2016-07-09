var up = require('./moves.js').up;
var down = require('./moves.js').down;
var left = require('./moves.js').left;
var right = require('./moves.js').right;

var blank = 0; // The number that represents the free position (the hole)

/**
 * Create board given a certain dimension.
 * @param dim - The board side length. Minium 2.
 * @returns {Array}
 */
var board = function board(dim) {
  if (dim < 2)
    throw new Error('Board dimension must be at least 2!');

  var board = [];
  for (i = 0; i < dim * dim; i++)
    board.push(i);
  return board;
};

/**
 * Find the blank position ("The hole") on the board and return index
 * @param b
 */
var findBlank = function findBlank(b) {
  return b.indexOf(blank);
};

/**
 * Retrieve the number of possible moves to make in the given board
 * @param brd - Board to scan
 * @return array of possible move functions
 */
var possibleMoves = function possibleMoves(brd) {
  var result = [];

  if (!!up(brd))
    result.push(up);

  if (!!down(brd))
    result.push(down);

  if (!!left(brd))
    result.push(left);

  if (!!right(brd))
    result.push(right);

  return result;
};

/**
 * Create a new shuffled puzzle (arg is a number), or shuffle the given board.
 * @param b - a board to shuffle or a dimension for a new board (integer)
 */
var shuffle = function shuffle(b) {
  if (typeof b === 'number')
    b = board(b);

  var iterations = Math.floor(10 + 90 * Math.random());
  for (i = 0; i < iterations; i++) {
    var moves = possibleMoves(b);
    var move = Math.floor((moves.length) * Math.random());
    b = moves[move]();
  }
};


exports = module.exports.board = board;
exports = module.exports.shuffle = shuffle;
exports = module.exports.possibleMoves = possibleMoves;
exports = module.exports.findBlank = findBlank;
