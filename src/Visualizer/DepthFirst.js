export function runDFSAlgo(grid, src, end) {
  const vertexSet = [];
  const shortSet = [];

  src.weight = 0;
  //   src.isVisited = true;

  vertexSet.push(src);

  let count = 1;

  while (vertexSet.length > 0) {
    // while vertex is not emptys
    // sortNodesByWeight(vertexSet);

    const currentNode = vertexSet.shift();

    console.log("loop " + count);
    console.log(currentNode);

    if (currentNode.isWall) continue;
    if (currentNode.weight == Infinity) return shortSet;

    currentNode.isVisited = true;
    shortSet.push(currentNode);

    if (currentNode === end) {
      console.log("found em");
      return shortSet;
    }

    updateNeighbors(grid, currentNode, vertexSet);
    count++;
  }
}

function updateNeighbors(grid, node, vertexSet) {
  const neighbors = getNeighbors(grid, node);
  console.log(neighbors);
  for (const neighbor of neighbors) {
    // neighbor.isVisited = true;
    neighbor.weight = node.weight + 1;
    neighbor.prevNode = node;
    vertexSet.unshift(neighbor);
  }
}

function getNeighbors(grid, node) {
  const neighbors = [];
  const { row, col } = node;

  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // check right
  if (row > 0) neighbors.push(grid[row - 1][col]); // check up
  if (col > 0) neighbors.push(grid[row][col - 1]); // check left
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); //check down

  const neighborsFilitered = neighbors.filter(
    (neighbor) => !neighbor.isVisited
  );

  return neighborsFilitered;
  //   return neighbors;
}

export function getDFSShortestPath(endNode) {
  const nodesShortPath = [];

  let currentNode = endNode;

  while (currentNode != null) {
    // console.log(currentNode.row + " " + currentNode.col);
    nodesShortPath.unshift(currentNode);
    currentNode = currentNode.prevNode;
  }

  return nodesShortPath;
}
