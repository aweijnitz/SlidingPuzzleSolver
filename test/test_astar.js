var test = require('tape');

// Function under test
var astar = require('../lib/astar.js');


test('astar no moves needed ', function (t) {

  var arr0 =
    [0, 1, 2,
      3, 4, 5,
      6, 7, 8];
  var arr1 =
    [0, 1, 2,
      3, 4, 5,
      6, 7, 8];

  t.equal(astar(arr0, arr1).path.length, 0);
  t.end();
});

test('astar one move needed ', function (t) {

  var arr0 =
    [1, 0, 2,
      3, 4, 5,
      6, 7, 8];
  var arr1 =
    [0, 1, 2,
      3, 4, 5,
      6, 7, 8];

  t.equal(astar(arr0, arr1).path.length, 1);
  t.end();
});