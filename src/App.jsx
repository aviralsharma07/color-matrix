import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="inputs">
        <div className="input-box row">
          <label htmlFor="rowInput">Enter Number of Rows</label>
          <input type="number" id="rowInput" placeholder="Enter number of rows"></input>
        </div>
        <div className="input-box column">
          <label htmlFor="columnInput">Enter Number of Columns</label>
          <input type="number" id="columnInput" placeholder="Enter number of columns"></input>
        </div>
      </div>
    </div>
  );
}

export default App;
