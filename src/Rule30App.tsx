import React from 'react';

/**
 * This application draws cellural automaton rule 30 pattern rotated by 45 degree.
 * https://en.wikipedia.org/wiki/Rule_30
 * 
 * COUNT is the count of lines to draw. <1K is fine on my machine, but ~2K starts to freeze browser.
 * EL_SIZE cell size in pixels.
 */
function Rule30App() {
  const EL_SIZE = 2;
  const COUNT = 500;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  
  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    if (context) {
      renderPattern(context);
    }
  }, [context]);

  const renderPattern = (context: CanvasRenderingContext2D) => {
    const data: boolean[][] = [];
    for (let i = 0; i < COUNT; i++) {
      const data_line: boolean[] = [];
      for (let j = 0; j < COUNT; j++) {
        if (i === 0) {
          j === 0 ? data_line.push(true) : data_line.push(false);
        } else {
          data_line.push(!!data[i - 1][j] !== (!!data[i - 1][j - 1] || !!data[i - 1][j - 2]));
        }
        context.fillStyle =data_line[j] ? '#000': '#fff';
        context.fillRect(EL_SIZE * i, EL_SIZE * j, EL_SIZE, EL_SIZE);
      }
      data.push(data_line);
    }
    return data;
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Rule 30</h2>
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
    </div>
  );
}

export default Rule30App;
