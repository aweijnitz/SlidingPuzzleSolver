var swap = require('./swap.js').swap;
var canSwap = require('./swap.js').canSwap;

var findBlank = require('./board.js').findBlank;
var possibleMoves = require('./board.js').possibleMoves;
var brd = require('./board.js');

/**
 * Returns new board with the blank space moved up, or false.
 * @param boardArray
 * @returns {*}
 */
var up = function up (boardArray) {
  var boardDimension = Math.sqrt(boardArray.length);
  var fromIndex = brd.findBlank(boardArray);
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

  var fromIndex = brd.findBlank(boardArray);
  //var p = brd.possibleMoves(boardArray);
  var toIndex = fromIndex + boardDimension;
  return swap(boardArray, fromIndex, toIndex)
};

/**
 * Returns new board with the blank space moved left, or false.
 * @param boardArray
 * @returns {*}
 */
var left = function left (boardArray) {
  var fromIndex = brd.findBlank(boardArray);
  var toIndex = fromIndex - 1;
  return swap(boardArray, fromIndex, toIndex)
};

/**
 * Returns new board with the blank space moved right, or false.
 * @param boardArray
 * @returns {*}
 */
var right = function right (boardArray) {
  var fromIndex = brd.findBlank(boardArray);
  var toIndex = fromIndex + 1;
  return swap(boardArray, fromIndex, toIndex)
};


exports = module.exports.up = up;
exports = module.exports.down = down;
exports = module.exports.left = left;
exports = module.exports.right = right;


