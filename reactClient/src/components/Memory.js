import React from 'react';
import drawCircle from '../utilities/canvasLoadAnimation';

const Memory = ({ data }) => {
  const { freeMemory, totlaMemory, memoryUsage } = data;
  const canvasRef = React.useRef();
  React.useEffect(() => {
    drawCircle(canvasRef.current, memoryUsage * 100);
  }, [memoryUsage]);

  const totalMemInGB = Math.floor((totlaMemory / 1073741824) * 100) / 100;
  const freeMemInGB = Math.floor((freeMemory / 1073741824) * 100) / 100;

  return (
    <div className="mem col-3">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} width={200} height={200}></canvas>
        <div className="mem-text">{memoryUsage * 100}%</div>
      </div>
      <div>Total Memory: {totalMemInGB} GB</div>
      <div>Free Memory: {freeMemInGB} GB</div>
    </div>
  );
};

export default Memory;
