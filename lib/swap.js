/**
 * Returns new array with elements at i0 and i1 swapped, or false, if move is not possible
 * @param arr
 * @param i0
 * @param i1
 */
var swap = function (arr, i0, i1) {
  if (!canSwap(arr, i0, i1))
    return false;
  var copy = arr.slice(0); // Clone the array (not deep cloning! But we don't need that here).
  var tmp = copy[i0];
  copy[i0] = copy[i1];
  copy[i1] = tmp;
  return copy;
};

var canSwap = function canSwap(arr, i0, i1) {
  return (i0 >= 0 && i0 < arr.length) && (i1 >= 0 && i1 < arr.length);
};

exports = module.exports.swap = swap;
exports = module.exports.canSwap = canSwap;