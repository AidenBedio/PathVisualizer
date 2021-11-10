import ReactDOM from "react-dom";
import Visualizer from "./Visualizer/Visualizer";

const App = () => {
  return (
    <div className="App">
      <Visualizer></Visualizer>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
