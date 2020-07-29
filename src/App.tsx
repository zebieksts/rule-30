import React from 'react';
import './App.css';

const EL_SIZE = 3;
const COUNT = 1000;

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  
  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    // Draw a rectangle
    if (context) getGrid(context);

  }, [context]);

  const getGrid = (context: CanvasRenderingContext2D) => {
    //const result: JSX.Element[][] = [];
    const data: boolean[][] = [];
    for (let i = 0; i < COUNT; i++) {
      //const line: JSX.Element[] = [];
      const data_line: boolean[] = [];
      for (let j = 0; j < COUNT; j++) {
        if (i === 0) {
          j === 0 ? data_line.push(true) : data_line.push(false);
        } else {
          data_line.push(!!data[i - 1][j] !== (!!data[i - 1][j - 1] || !!data[i - 1][j - 2]));
        }
        context.fillStyle =data_line[j] ? '#000': '#fff';
        context.fillRect(EL_SIZE * i, EL_SIZE * j, EL_SIZE, EL_SIZE);
        /*line.push(
          <rect
            width={EL_SIZE}
            height={EL_SIZE}
            x={EL_SIZE * i}
            y={EL_SIZE * j}
            fill={data_line[j] ? 'blue' : 'white'}
            id={'' + i + '_' + j}
          />
        );*/
      }
      data.push(data_line);
     // result.push(line);
    }
    return data;
  };

  return (
    <div className="App">
      <header className="App-header">
      <canvas
        id="canvas"
        ref={canvasRef}
        width={EL_SIZE * COUNT}
        height={EL_SIZE * COUNT}
        style={{
          border: '2px solid #000',
          marginTop: 10,
        }}
      ></canvas>
      </header>
    </div>
  );
}

export default App;
