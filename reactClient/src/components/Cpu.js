import React from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';

const Cpu = ({ data }) => {
  const canvasRef = React.useRef();
  const { cpuLoad } = data;
  React.useEffect(() => {
    drawCircle(canvasRef.current, cpuLoad);
  }, [cpuLoad]);

  return (
    <div className="cpu col-3">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas className="" ref={canvasRef} width={200} height={200}></canvas>
        <div className="cpu-text">{cpuLoad}%</div>
      </div>
    </div>
  );
};

export default Cpu;
