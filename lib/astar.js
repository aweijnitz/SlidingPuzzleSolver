var SortedArray = require('sorted-array');
var SimpleHashTable = require('simple-hashtable');
var distance = require('./distance.js');
var possibleMoves = require('./board.js').possibleMoves;

/**
 * Calculate the f score used by the A* algorithm
 * @param current
 * @param startState
 * @param goalState
 * @returns {*}
 */
var fScore = function fScore(current, startState, goalState) {
  return distance(current, startState) + distance(current, goalState);
};

/**
 * Compare two nodes based on f score.
 * @param node0
 * @param node1
 * @returns {boolean}
 */
var comparator = function comparator(node0, node1) {
  return node0.f <= node1.f;
};

/**
 * Converts a board to node used for internal book keeping in A*
 * @param board
 * @param score
 * @returns {{path: Array, f: *, boardState: *}}
 */
var makeNode = function makeNode(board, parentNode, path, score) {
  return {
    path: path,
    f: score,
    parent: parentNode,
    boardState: board
  };
};

/**
 * Helper to construct a hashkey for a board
 * @param node
 * @returns {string|*}
 */
var getKey = function getKey(board) {
  return board.toString();
};

/**
 * Construct an array of all possible board states that can be reached from this state.
 * @param board
 */
var getChildren = function getChildren(board) {
  var moves = possibleMoves(board); // returns an array of move function
  var result = [];
  for (i = 0; i < moves.length; i++) {
    result.push({
      direction: moves[i].name,
      board: moves[i](board)
    });
  }
  return result;
};

/**
 * Check diff between given state and target. Return true if equal.
 * @param board
 * @param targetboardState
 * @returns {boolean}
 */
var isSolutionReached = function isSolutionReached(board, targetboardState) {
  return (0 == distance(board, targetboardState));
};

/**
 * Traverse the state tree from leaf to root and add all states in between.
 * @param node
 * @returns {Array}
 */
var toBoardArray = function toBoardArray(node, result) {
  if (node == null)
    return result;
  else {
    result.push(node.boardState);
    return toBoardArray(node.parent, result);
  }
};

var astar = function astar(startBoard, targetboardState) {
  var maxLoops = 2048;
  var loops = 0;

  var todos =
    new SortedArray([makeNode(startBoard, null, [],
      fScore(startBoard, startBoard, targetboardState))], comparator);
  var checked = new SimpleHashTable(); // visited nodes will be stored here

  while (todos.array.length > 0 && loops++ < maxLoops) {
    var currentNode = todos.array.shift();
    var childNodes = getChildren(currentNode.boardState);
    childNodes.forEach(function (brd) {
      if (!checked.containsKey(getKey(brd.board))) {
        // Prepare a node for this board state
        var p = currentNode.path;
        p.push(brd.direction);
        var node = makeNode(brd.board, currentNode, p, fScore(brd.board, startBoard, targetboardState));

        if (isSolutionReached(node.boardState, targetboardState)) {
          // We have a winner!
          return {
            moves: node.path,
            states: toBoardArray(node, [])
          };
        } else {
          todos.insert(node);
          checked.put(getKey(brd), brd);
        }
      }
    });
  } // end while

  var bestCandidate = todos.array.shift();
  return {
    err: 'Max iterations reached without solution found.',
    moves: bestCandidate.path,
    states: toBoardArray(bestCandidate, [])
  };
};

exports = module.exports = astar;
