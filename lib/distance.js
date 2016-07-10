var manhattan = require( 'compute-manhattan-distance' );

/**
 * Given two board arrays, return the distance score between them.
 * @param boardState0
 * @param boardState1
 * @returns {*|Number|Null}
 */
var distance = function distance (boardState0, boardState1) {

  // Use manhattan distance as scoring algorithm.
  return manhattan( boardState0, boardState1 );
};

exports = module.exports = distance;
