export function runAStarAlgo(grid, src, end) {
  const vertexSet = [];
  const shortSet = [];

  src.weight = 0;
  vertexSet.push(src);

  console.log(vertexSet.length);

  while (vertexSet.length > 0) {
    const currentNode = vertexSet.splice(getLowestFCost(vertexSet), 1)[0];

    shortSet.push(currentNode);

    if (currentNode === end) {
      console.log("found em");
      return shortSet;
    }
    updateNeighbors(grid, currentNode, vertexSet, shortSet, end);
  }

  return src;
}

function updateNeighbors(grid, node, vertexSet, shortSet, end) {
  const neighbors = getNeighbors(grid, node);

  console.log(neighbors);
  for (const neighbor of neighbors) {
    if (neighbor.isWall || shortSet.includes(neighbor)) {
      continue;
    }

    let newMoveCost = node.gCost + getDistance(node, neighbor);

    if (newMoveCost < neighbor.gCost || !vertexSet.includes(neighbor)) {
      neighbor.gCost = newMoveCost;
      neighbor.hCost = getDistance(neighbor, end);

      neighbor.prevNode = node;

      if (!vertexSet.includes(neighbor)) {
        vertexSet.push(neighbor);
      }
    }
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

function getLowestFCost(vertexSet) {
  let currentNode = vertexSet[0];
  let currentIndex = 0;
  for (let i = 0; i < vertexSet.length; i++) {
    if (
      vertexSet[i].fCost < currentNode.fCost ||
      (vertexSet[i].fCost == currentNode.fCost &&
        vertexSet[i].hCost < currentNode.hCost)
    ) {
      currentIndex = i;
    }
  }

  return currentIndex;
  // vertexSet.sort((nodeA, nodeB) => nodeA.weight - nodeB.weight);
}

function getDistance(nodeA, nodeB) {
  const distX = Math.abs(nodeA.row - nodeB.row);
  const distY = Math.abs(nodeB.col - nodeB.col);

  return distX + distY;
}
export function getAStarShortestPath(endNode) {
  const nodesShortPath = [];

  let currentNode = endNode;

  while (currentNode != null) {
    // console.log(currentNode.row + " " + currentNode.col);
    nodesShortPath.unshift(currentNode);
    currentNode = currentNode.prevNode;
  }

  return nodesShortPath;
}
/*

each node has 3 values G, 

G cost = how far the node is from the start node
h cost = how far the node is from the end node
f cost = g cost + h cost

if all neighbors has same f cost then choose the lower h cost


Pseudo

OPEN //the set of nodes to be evaluated
CLOSED //the set of nodes already evaluated
add the start node to OPEN
 
loop
        current = node in OPEN with the lowest f_cost
        remove current from OPEN
        add current to CLOSED
 
        if current is the target node //path has been found
                return
 
        foreach neighbour of the current node
                if neighbour is not traversable or neighbour is in CLOSED
                        skip to the next neighbour
 
                if new path to neighbour is shorter OR neighbour is not in OPEN
                        set f_cost of neighbour
                        set parent of neighbour to current
                        if neighbour is not in OPEN
                                add neighbour to OPEN

*/
