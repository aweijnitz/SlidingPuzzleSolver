var findIndexPos = function findIndexPos(indexNr, board) {

  var found = -1;
  for (var i = 0; i < board.length; i++) {
    if (indexNr == board[i]) {
      found = i;
      break;
    }
    else
      continue;
  }
  return found;
};

/**
 * Given two board arrays, return the distance score between them.
 * @param boardState0
 * @param boardState1
 * @returns {*|Number|Null}
 */
var distance = function distance(boardState0, boardState1) {

  if (boardState0.length != boardState1.length)
    throw new RangeError('Array lengths not equal!');

  var width = Math.sqrt(boardState0.length); // Quadratic board dimensions are assumed in this sliding puzzle.

  // Use manhattan distance as scoring algorithm.
  var score = 0;
  var pos0 = 0;
  var pos1 = 0;
  for (var i = 0; i < boardState0.length; i++) {
    pos0 = findIndexPos(i, boardState0);
    pos1 = findIndexPos(i, boardState1);
    var x0 = pos0 % width;
    var x1 = pos1 % width;
    var y0 = Math.floor(pos0 / width);
    var y1 = Math.floor(pos1 / width);
    score += Math.abs(x1 - x0) + Math.abs(y1 - y0);
  }

  return score;
};

exports = module.exports = distance;
