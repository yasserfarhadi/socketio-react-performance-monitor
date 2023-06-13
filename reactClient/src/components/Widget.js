import React from 'react';
import Cpu from './Cpu';
import Info from './Info';
import Memory from './Memory';
import './widget.css';
import socket from '../utilities/socketConnection';

const Widget = ({ data }) => {
  const {
    freeMemory,
    totlaMemory,
    usedMemory,
    memoryUsage,
    osType,
    upTime,
    cpuType,
    numberOfCores,
    cpuSpeed,
    cpuLoad,
    macA,
  } = data;
  const [isAlive, setIsAlive] = React.useState(true);

  const notAliveDiv = !isAlive ? (
    <div className="not-active">Offline</div>
  ) : null;

  React.useEffect(() => {
    socket.on('connectedOrNot', ({ isAlive, machineMacA }) => {
      // connectedOrNot does NOT mean this client is disconnected(or reconneced)
      // it is for the one of the node clients that is tickings
      // we need a new event for that, because that nodeClient stopped ticking
      if (machineMacA === macA) {
        setIsAlive(isAlive); // true or false update isAlive
      }
    });
  }, [macA]);

  const cpuData = {
    cpuLoad,
  };
  const memoryData = {
    freeMemory,
    totlaMemory,
    usedMemory,
    memoryUsage,
  };
  const infoData = {
    osType,
    upTime,
    macA,
    cpuType,
    cpuSpeed,
    numberOfCores,
  };
  return (
    <div className="widget row justify-content-evenly">
      {notAliveDiv}
      <Cpu data={cpuData} />
      <Memory data={memoryData} />
      <Info data={infoData} />
    </div>
  );
};

export default Widget;
