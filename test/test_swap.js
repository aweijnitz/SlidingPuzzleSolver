var test = require('tape');

// Function under test
var swap = require('../lib/swap.js').swap;
var canSwap = require('../lib/swap.js').canSwap;


test('canSwap function', function (t) {

  var arr = ['a', 'b', 'c'];
  t.ok(arr, 1, 2);
  t.notOk(canSwap(arr, -1, 2));
  t.notOk(canSwap(arr, 0, arr.length));
  t.notOk(canSwap(arr, -1, -2));

  t.end();
});

test('swap function', function (t) {

  var arr = ['a', 'b', 'c'];
  t.deepEqual(['a', 'c', 'b'], swap(arr, 1, 2));
  t.deepEqual(arr, ['a', 'b', 'c']); // Expect original array to be unmodified

  var arr = ['a', 'b', 'c'];
  t.deepEqual(['c', 'b', 'a'], swap(arr, 0, 2));

  t.notOk(swap(arr, -1, 0));
  t.notOk(swap(arr, arr.length - 1, arr.length));

  t.end();
});

