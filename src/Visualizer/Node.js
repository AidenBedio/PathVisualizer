const Node = ({ row, col, isStart, isEnd }) => {
  const blockType = isStart ? "node-start" : isEnd ? "node-end" : "";
  return <div className={`node ${blockType}`} id={`node-${row}-${col}`}></div>;
};

export default Node;
