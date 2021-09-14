const readline = require("readline");

class Step {
  constructor(pos, prevPos, direction) {
    this.pos = pos;
    this.prevPos = prevPos;
    // Number, 1 means from the start, -1 means from the end pos.
    this.direction = direction;
  }
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLUMNS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const VALID_RULE = /[a-hA-H][1-8]/;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The async function to read a line from user's input.
const getLine = (function () {
  const getLineGen = (async function* () {
    for await (const line of rl) {
      yield line;
    }
  })();
  return async () => (await getLineGen.next()).value;
})();

async function main() {
  let start = "";
  // Get the start position
  while (!VALID_RULE.test(start)) {
    console.log(
      'Please input start position(A1-H8) or input "test" to see the test result:'
    );
    start = await getLine();
    if (start === "test") {
      test();
      process.exit();
    }
  }
  let end = "";
  // Get the end position
  while (!VALID_RULE.test(end)) {
    console.log("Please input end position(A1-H8):");
    end = await getLine();
  }
  const path = findShortestPathOfKnight(start.toUpperCase(), end.toUpperCase());
  console.log(path.join(" "));
  process.exit(0);
}

/**
 * Find the shortest path from the start position to the end position.
 * @param {*} startPos start position
 * @param {*} endPos end position
 * @returns The array of the path
 */
function findShortestPathOfKnight(startPos, endPos) {
  if (startPos === endPos) {
    return [startPos];
  }
  // For recording all the history points.
  const footprints = new Map();
  const start = new Step(startPos, null, 1);
  footprints.set(start.pos, start);
  const end = new Step(endPos, null, -1);
  footprints.set(end.pos, end);
  // A queue for the next available moves
  const workingQueue = [start, end];
  let found = false;
  // The result
  const path = [];
  while (!found && workingQueue.length > 0) {
    // Get the first position from queue
    const tmpStart = workingQueue.shift();
    // Find all the possible move from the tmpStart position
    const nextPositions = getPossibleMovesOfKnight(tmpStart.pos);
    if (nextPositions.length > 0) {
      for (let i = 0; i < nextPositions.length; i++) {
        const tmpPos = nextPositions[i];
        // Find the tmpPos from the history
        const markedPos = footprints.get(tmpPos);
        // If the history has this position and the direction is different
        if (markedPos && markedPos.direction !== tmpStart.direction) {
          found = true;
          // Push all the path into the path
          path.push(...getSteps(tmpStart, markedPos));
          break;
        } else if (!markedPos) {
          // If not found, create a new step
          const tmpStep = new Step(tmpPos, tmpStart, tmpStart.direction);
          // Add this position into history
          footprints.set(tmpPos, tmpStep);
          // Push the tmpPos into working queue.
          workingQueue.push(tmpStep);
        }
      }
    }
  }
  return path;
}

/**
 * Get the possible move of the
 * @param {Position} postion
 */
function getPossibleMovesOfKnight(position) {
  position = position.toUpperCase();
  const availableMoves = [];
  let xIndex = ROWS.indexOf(position.charAt(0));
  let yIndex = COLUMNS.indexOf(position.charAt(1));
  // possible position: (x+1, y+2)
  if (xIndex + 1 < ROWS.length && yIndex + 2 < COLUMNS.length) {
    availableMoves.push(ROWS[xIndex + 1] + COLUMNS[yIndex + 2]);
  }
  // possible position: (x+1, y-2)
  if (xIndex + 1 < ROWS.length && yIndex - 2 >= 0) {
    availableMoves.push(ROWS[xIndex + 1] + COLUMNS[yIndex - 2]);
  }
  // possible position: (x+2, y+1)
  if (xIndex + 2 < ROWS.length && yIndex + 1 < COLUMNS.length) {
    availableMoves.push(ROWS[xIndex + 2] + COLUMNS[yIndex + 1]);
  }
  // possible position: (x+2, y-1)
  if (xIndex + 2 < ROWS.length && yIndex - 1 >= 0) {
    availableMoves.push(ROWS[xIndex + 2] + COLUMNS[yIndex - 1]);
  }
  // possible position: (x-1, y+2)
  if (xIndex - 1 >= 0 && yIndex + 2 < COLUMNS.length) {
    availableMoves.push(ROWS[xIndex - 1] + COLUMNS[yIndex + 2]);
  }
  // possible position: (x-1, y-2)
  if (xIndex - 1 >= 0 && yIndex - 2 >= 0) {
    availableMoves.push(ROWS[xIndex - 1] + COLUMNS[yIndex - 2]);
  }
  // possible position: (x-2, y+1)
  if (xIndex - 2 >= 0 && yIndex + 1 < COLUMNS.length) {
    availableMoves.push(ROWS[xIndex - 2] + COLUMNS[yIndex + 1]);
  }
  // possible position: (x-2, y-1)
  if (xIndex - 2 >= 0 && yIndex - 1 >= 0) {
    availableMoves.push(ROWS[xIndex - 2] + COLUMNS[yIndex - 1]);
  }
  return availableMoves;
}

/**
 * Get the path by the middle points
 * @param  {...any} points
 * @returns
 */
function getSteps(...points) {
  const path = [];
  points.forEach((point) => {
    while (point) {
      // If the direction is 1, it point will add to the head of the arrey,
      // otherwise, it will be pushed to the tail.
      point.direction > 0 ? path.unshift(point.pos) : path.push(point.pos);
      point = point.prevPos;
    }
  });
  return path;
}

/**
 * The test function, it will print all the possible paths.
 */
function test() {
  const possiblePoints = [];
  for (let i = 0; i < ROWS.length; i++) {
    for (let j = 0; j < COLUMNS.length; j++) {
      possiblePoints.push(ROWS[i] + COLUMNS[j]);
    }
  }
  for (let i = 0; i < possiblePoints.length; i++) {
    for (let j = 0; j < possiblePoints.length; j++) {
      const path = findShortestPathOfKnight(
        possiblePoints[i],
        possiblePoints[j]
      ).join(" ");
      console.log(`${possiblePoints[i]} -> ${possiblePoints[j]}: ${path}`);
    }
  }
}

main();
