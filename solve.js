
as = require('./lib/astar.js');

var arr0 =
  [1, 0, 2,
    3, 4, 5,
    6, 7, 8];
var arr1 =
  [0, 1, 2,
    3, 4, 5,
    6, 7, 8];

console.log(as(arr0, arr1));