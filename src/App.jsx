import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [matrix, setMatrix] = useState([]);
  const [matrixGenerated, setMatrixGenerated] = useState(false);
  const [rowMax, setRowMax] = useState(0);
  const [colMax, setColMax] = useState(0);

  // Object to store limited colors to be used in the matrix
  const colors = [
    { name: "Red", value: "#FF0000" },
    { name: "Green", value: "#00FF00" },
    { name: "Blue", value: "#0000FF" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Magenta", value: "#FF00FF" },
    { name: "Cyan", value: "#00FFFF" },
    { name: "Orange", value: "#FFA500" },
    { name: "Purple", value: "#800080" },
    { name: "Dark Green", value: "#008000" },
    { name: "Maroon", value: "#800000" },
    { name: "Teal", value: "#008080" },
    { name: "Brown", value: "#A52A2A" },
    { name: "Navy", value: "#000080" },
    { name: "Pink", value: "#FFC0CB" },
    { name: "Gray", value: "#808080" },
  ];

  // Function that returns a random color from the colors array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Function that generates a matrix of entered rows and columns with random colors
  const generateMatrix = (rows, columns) => {
    const matrix = [];
    for (let row = 0; row < rows; row++) {
      const rowColors = [];
      for (let col = 0; col < columns; col++) {
        rowColors.push(getRandomColor());
      }
      matrix.push(rowColors);
    }
    return matrix;
  };

  const maxConsecutiveCellsinRow = (matrix) => {
    let max = 0;
    for (let row = 0; row < matrix.length; row++) {
      let count = 1;
      for (let col = 0; col < matrix[row].length - 1; col++) {
        if (matrix[row][col].value === matrix[row][col + 1].value) {
          count++;
          max = Math.max(max, count);
        } else {
          count = 1;
        }
      }
      console.log("count: ", count, " max: ", max);
    }
    return max;
  };

  const maxConsecutiveCellsinColumn = (matrix) => {
    let max = 0;
    for (let col = 0; col < matrix[0].length; col++) {
      let count = 1;
      for (let row = 0; row < matrix.length - 1; row++) {
        if (matrix[row][col].value === matrix[row + 1][col].value) {
          count++;
          max = Math.max(max, count);
        } else {
          count = 1;
        }
      }
      console.log("count: ", count, " max: ", max);
    }
    return max;
  };

  useEffect(() => {
    console.log(matrix);
    setRowMax(maxConsecutiveCellsinRow(matrix));
    setColMax(maxConsecutiveCellsinColumn(matrix));
    console.log("rowmax: ", rowMax, " colmax: ", colMax);
  }, [matrix]);

  const handleGenerateMatrix = () => {
    if (rows <= 0 || columns <= 0) return;

    setMatrix(generateMatrix(rows, columns));

    setMatrixGenerated(true);
  };

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
              setMatrixGenerated(false);
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
            max="10"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setColumns(value > 10 ? 10 : value);
              setMatrixGenerated(false);
            }}
          ></input>
        </div>
        <div className="input-box">
          <button onClick={handleGenerateMatrix}>Generate Matrix</button>
        </div>
      </div>
      {matrixGenerated && (
        <div className="matrix">
          {matrix.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((color, colIndex) => (
                <div className="column" key={colIndex} style={{ backgroundColor: color.value }}>
                  {color.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {matrixGenerated && <div className="result">The maximum consecutive cells with the same color are {Math.max(rowMax, colMax)}</div>}
    </div>
  );
}

export default App;
