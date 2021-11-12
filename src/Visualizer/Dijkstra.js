export function runDijkstraAlgo(grid, src, end) {
  const vertexSet = [];
  const shortSet = [];

  //initialize arrays for keeping track of nodes
  grid.map((rowSet) => {
    rowSet.map((node) => {
      vertexSet.push(node);
    });
  });

  // vertexSet.push(src);
  // setting of source node distance to 0;
  src.weight = 0;

  while (vertexSet.length > 0) {
    //sort the nodes by distance/weight
    sortNodesByWeight(vertexSet);

    // console.log(vertexSet.length);

    const currentNode = vertexSet.shift();

    // console.log(
    //   currentNode.row + " " + currentNode.col + " " + currentNode.isWall
    // );
    if (currentNode.isWall) continue;

    // console.log(currentNode.weight);

    if (currentNode.weight == Infinity) return shortSet;

    currentNode.isVisited = true;
    shortSet.push(currentNode);

    if (currentNode === end) {
      console.log("found em");
      return shortSet;
    }

    updateNeighbors(grid, currentNode);
  }
}

function updateNeighbors(grid, node) {
  const neighbors = getNeighbors(grid, node);

  // console.log(`r: + ${node.row} c: ${node.col}  ${neighbors.length}`);
  // neighbors.map((neighbor) => {
  //   neighbor.weight += 1;
  //   neighbor.prevNode = node;
  // });

  for (const neighbor of neighbors) {
    neighbor.weight = node.weight + 1;
    neighbor.prevNode = node;
    // vertexSet.push(neighbor);
  }
}

function getNeighbors(grid, node) {
  const neighbors = [];
  const { row, col } = node;

  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // check right
  if (row > 0) neighbors.push(grid[row - 1][col]); // check up
  if (col > 0) neighbors.push(grid[row][col - 1]); // check left
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); //check down

  // console.log(row + " " + col + " " + node.isVisited);
  // console.log(neighbors);

  const neighborsFilitered = neighbors.filter(
    (neighbor) => !neighbor.isVisited
  );

  // console.log(node.row + " " + node.col + " " + neighborsFilitered.length);
  return neighborsFilitered;
}

function sortNodesByWeight(vertexSet) {
  vertexSet.sort((nodeA, nodeB) => nodeA.weight - nodeB.weight);

  // console.log(vertexSet);
}

export function getDijkstraShortestPath(endNode) {
  const nodesShortPath = [];

  let currentNode = endNode;

  while (currentNode != null) {
    // console.log(currentNode.row + " " + currentNode.col);
    nodesShortPath.unshift(currentNode);
    currentNode = currentNode.prevNode;
  }

  return nodesShortPath;
}

// function Dijkstra(Graph, source):
//  2
//  3     create vertex set Q
//  4
//  5     for each vertex v in Graph:           // Initialization
//  6         dist[v] ← INFINITY                // Unknown distance from source to v
//  7         prev[v] ← UNDEFINED               // Previous node in optimal path from source
//  8         add v to Q                        // All nodes initially in Q (unvisited nodes)
//  9
// 10     dist[source] ← 0                      // Distance from source to source
// 11
// 12     while Q is not empty:
// 13         u ← vertex in Q with min dist[u]  // Node with the least distance
// 14                                           // will be selected first
// 15         remove u from Q
// 16
// 17         for each neighbor v of u:         // where v is still in Q.
// 18             alt ← dist[u] + length(u, v)
// 19             if alt < dist[v]:             // A shorter path to v has been found
// 20                 dist[v] ← alt
// 21                 prev[v] ← u
// 22
// 23     return dist[], prev[]
