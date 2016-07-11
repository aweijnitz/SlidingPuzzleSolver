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
 * @returns {number}
 */
var comparator = function comparator(node0, node1) {
  return node0.f - node1.f;
};

/**
 * Converts a board to node used for internal book keeping in A*
 * @param board
 * @param score
 * @returns {{path: Array, f: *, boardState: *}}
 */
var makeNode = function makeNode(board, parentNode, path, g, h) {
  return {
    path: path,
    f: g + h,
    g: g,
    h: h,
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

/**
 * Traverse the state tree from leaf to root and add all states in between.
 * @param node
 * @returns {Array}
 */
var toNodeArray = function toNodeArray(node, result) {
  if (node == null)
    return result;
  else {
    result.push(node);
    return toNodeArray(node.parent, result);
  }
};

var astar = function astar(startBoard, targetboardState) {
  var maxLoops = 4096;
  var loops = 0;
  var rootNode = makeNode(startBoard, null, [], 0, distance(startBoard, targetboardState));
  var toBeProcessed = new SortedArray([rootNode], comparator);
  var visitedNodes = new SimpleHashTable();

  while (toBeProcessed.array.length > 0 && loops++ < maxLoops) {
    var currentBest = toBeProcessed.array.shift();
    var children = getChildren(currentBest.boardState);
    children.forEach(function (child) {
      if (!visitedNodes.containsKey(getKey(child.board))) {
        // Prepare a node for this board state
        var nodePath = currentBest.path.slice(0); // clone array
        nodePath.push(child.direction);
        var node = makeNode(child.board, currentBest, nodePath, currentBest.g + 1, distance(child.board, targetboardState));

        if (isSolutionReached(node.boardState, targetboardState)) {
          // We have a winner!
          return {
            moves: node.path,
            states: toBoardArray(node, [])
          };
        } else {
          toBeProcessed.insert(node);
        }
      }
    }); // end for each
    visitedNodes.put(getKey(currentBest.boardState), currentBest);
  } // end while

  var bestCandidate = toBeProcessed.array.shift();
  return {
    err: 'Max iterations reached without solution found.',
    moves: ['No José'], //bestCandidate.path,
    states: toBoardArray(bestCandidate, [])
  };
};

exports = module.exports = astar;
