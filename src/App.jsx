import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");
  const [matrix, setMatrix] = useState([]);
  const [matrixGenerated, setMatrixGenerated] = useState(false);
  const [max, setMax] = useState(0);
  const [maxColor, setMaxColor] = useState("");

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

  function findMaxAdjacentCount(matrix) {
    const visited = createVisitGrid(matrix);
    let maxCount = 0;

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (!visited[row][col]) {
          const color = matrix[row][col];
          maxCount = Math.max(maxCount, dfs(matrix, visited, color, row, col));
        }
      }
    }

    return maxCount;
  }

  function dfs(matrix, visited, expected, row, col) {
    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[row].length || visited[row][col] || matrix[row][col] !== expected) return 0;

    visited[row][col] = true;

    let depth = 1;
    depth += dfs(matrix, visited, expected, row, col - 1);
    depth += dfs(matrix, visited, expected, row, col + 1);
    depth += dfs(matrix, visited, expected, row - 1, col);
    depth += dfs(matrix, visited, expected, row + 1, col);

    return depth;
  }

  function createVisitGrid(matrix) {
    const visit = new Array(matrix.length).fill(false).map(() => new Array(matrix[0].length).fill(false));
    return visit;
  }

  useEffect(() => {
    // console.log(matrix);
    if (matrix.length !== 0) {
      const maxCount = findMaxAdjacentCount(matrix);
      setMax(maxCount);

      // Find all colors corresponding to the maximum count
      let maxColors = [];
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          const color = matrix[row][col];
          const count = dfs(matrix, createVisitGrid(matrix), color, row, col);
          if (count === maxCount && !maxColors.includes(color.name)) {
            maxColors.push(color.name);
          }
        }
      }

      // Join multiple colors into a string for display
      const maxColorsString = maxColors.join(", ");

      setMaxColor(maxColorsString);
    }
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
      {matrixGenerated && (
        <div className="result">
          The maximum consecutive cells with the same color {maxColor} are {max}
        </div>
      )}
    </div>
  );
}

export default App;
