import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  console.log(typeof rows, columns);

  return (
    <div className="App">
      <div className="inputs">
        <div className="input-box">
          <label htmlFor="rowInput">Enter Number of Rows</label>
          <input
            type="number"
            id="rowInput"
            placeholder="0"
            value={rows}
            onChange={(e) => {
              setRows(parseInt(e.target.value));
            }}
          ></input>
        </div>
        <div className="input-box">
          <label htmlFor="columnInput">Enter Number of Columns</label>
          <input
            type="number"
            id="columnInput"
            placeholder="0"
            value={columns}
            onChange={(e) => {
              setColumns(parseInt(e.target.value));
            }}
          ></input>
        </div>
      </div>
      <div className="matrix">
        {/* <div className="row">
          <div className="column">1</div>
          <div className="column">2</div>
          <div className="column">3</div>
          <div className="column">4</div>
        </div>
        <div className="row">
          <div className="column">5</div>
          <div className="column">6</div>
          <div className="column">7</div>
          <div className="column">8</div>
        </div>
        <div className="row">
          <div className="column">9</div>
          <div className="column">10</div>
          <div className="column">11</div>
          <div className="column">12</div>
        </div> */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div className="column" key={colIndex}>
                {rowIndex * columns + colIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
