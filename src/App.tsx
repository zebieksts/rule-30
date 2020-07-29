import React from 'react';
import './App.css';

const EL_SIZE = 10;
const COUNT = 300;

function App() {
  const getGrid = () => {
    const result: JSX.Element[][] = [];
    const data: boolean[][] = [];
    for (let i = 0; i < COUNT; i++) {
      const line: JSX.Element[] = [];
      const data_line: boolean[] = [];
      for (let j = 0; j < COUNT; j++) {
        if (i === 0) {
          j === 0 ? data_line.push(true) : data_line.push(false);
        } else {
          data_line.push(!!data[i - 1][j] !== (!!data[i - 1][j - 1] || !!data[i - 1][j - 2]));
          debugger;
        }
        line.push(
          <rect
            width={EL_SIZE}
            height={EL_SIZE}
            x={EL_SIZE * i}
            y={EL_SIZE * j}
            fill={data_line[j] ? 'blue' : 'white'}
            id={'' + i + '_' + j}
          />
        );
      }
      data.push(data_line);
      result.push(line);
    }
    return result;
  };

  return (
    <div className="App">
      <header className="App-header">
        <svg height={COUNT * EL_SIZE} width={COUNT * EL_SIZE}>
          {getGrid()}
        </svg>
      </header>
    </div>
  );
}

export default App;
