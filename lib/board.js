var swap = require('./swap.js').swap;

var blank = 0; // The number that represents the free position (the hole)

/**
 * Return a board, given a certain dimension.
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


/**
 * Returns new board with the blank space moved up, or false.
 * @param boardArray
 * @returns {*}
 */
var up = function up (boardArray) {
  var boardDimension = Math.sqrt(boardArray.length);
  var fromIndex = findBlank(boardArray);
  var toIndex = fromIndex - boardDimension;
  return swap(boardArray, fromIndex, toIndex)
};

/**
 * Returns new board with the blank space moved down, or false.
 * @param boardArray
 * @returns {*}
 */
var down = function down (boardArray) {
  var boardDimension = Math.sqrt(boardArray.length);
  //var fromIndex = boardArray.indexOf(0);

  var fromIndex = findBlank(boardArray);
  var toIndex = fromIndex + boardDimension;
  return swap(boardArray, fromIndex, toIndex)
};

/**
 * Returns new board with the blank space moved left, or false.
 * @param boardArray
 * @returns {*}
 */
var left = function left (boardArray) {
  var fromIndex = findBlank(boardArray);
  var toIndex = fromIndex - 1;
  return swap(boardArray, fromIndex, toIndex)
};

/**
 * Returns new board with the blank space moved right, or false.
 * @param boardArray
 * @returns {*}
 */
var right = function right (boardArray) {
  var fromIndex = findBlank(boardArray);
  var toIndex = fromIndex + 1;
  return swap(boardArray, fromIndex, toIndex)
};


exports = module.exports.up = up;
exports = module.exports.down = down;
exports = module.exports.left = left;
exports = module.exports.right = right;

exports = module.exports.board = board;
exports = module.exports.shuffle = shuffle;
exports = module.exports.possibleMoves = possibleMoves;
exports = module.exports.findBlank = findBlank;
