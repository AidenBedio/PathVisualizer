import { useState } from "react";
import Node from "./Node";
import { run, getShortestPath } from "./Dijkstra";

const Visualizer = () => {
  const gridRow = useState("30");
  const gridCol = useState("50");
  const grid = [];

  const startNode = [5, 41];
  const endNode = [4, 5];

  initializeGrid();

  function runDijkstra() {
    const src = grid[startNode[0]][startNode[1]];
    const end = grid[endNode[0]][endNode[1]];

    const visitedOrder = run(grid, src, end);
    const shortestPath = getShortestPath(end);

    return { visitedOrder, shortestPath };
  }

  function initializeGrid() {
    const gRow = parseInt(gridRow);
    const gCol = parseInt(gridCol);

    for (let row = 0; row < gRow; row++) {
      let rowSet = [];

      for (let col = 0; col < gCol; col++) {
        let current = {
          row,
          col,
          weight: Infinity,
          isVisited: false,
          prevNode: null,
        };
        rowSet.push(current);
      }
      grid.push(rowSet);
    }

    // A console for printing the object debugging purposes
    // nodes.map((node) => {
    //   node.map((cell) => {
    //     console.log(cell);
    //   });
    // });
  }

  function animateDjikstra() {
    const { visitedOrder, shortestPath } = runDijkstra();

    // console.log(visitedOrder);

    for (let i = 0; i < visitedOrder.length; i++) {
      setTimeout(() => {
        const node = visitedOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 25 * i);
    }

    for (let j = 0; j < shortestPath.length; j++) {
      setTimeout(() => {
        const node = shortestPath[j];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 25 * (j + visitedOrder.length));
    }
  }

  return (
    <div className="visualizer">
      <div className="grid">
        {grid.map((row, rowId) => {
          return (
            <div className="row" key={rowId}>
              {row.map((node, colId) => {
                if (rowId === startNode[0] && colId === startNode[1]) {
                  return (
                    <Node
                      isStart={true}
                      key={colId}
                      row={rowId}
                      col={colId}
                    ></Node>
                  );
                } else if (rowId === endNode[0] && colId === endNode[1]) {
                  return (
                    <Node
                      isEnd={true}
                      key={colId}
                      row={rowId}
                      col={colId}
                    ></Node>
                  );
                } else {
                  return <Node key={colId} row={rowId} col={colId}></Node>;
                }
              })}
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={animateDjikstra}>Run Dijkstra</button>
      </div>
    </div>
  );
};

export default Visualizer;
