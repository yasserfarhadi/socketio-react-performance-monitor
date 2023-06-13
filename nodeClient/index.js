// Node program that captures local performance data
// and sends it via socket to the server
// req:
// - socketio client

const os = require('os');
const io = require('socket.io-client');

const options = {
  auth: {
    token: 'askdaksdlakjsdajsdlkjaslkdjasfiqejwqicmz,mccqiejfpqasm;lsdjasdp',
  },
};

const socket = io('http://localhost:3000', options);

socket.on('connect', () => {
  const NI = os.networkInterfaces();
  let macA;
  for (let key in NI) {
    const isInternetFacing =
      !NI[key][0].internal && NI[key][0].mac != '00:00:00:00:00:00';
    if (isInternetFacing) {
      macA = NI[key][0].mac;
      break;
    }
  }
  const perfDataInterval = setInterval(async () => {
    const perfData = await performanceLoadData();
    perfData.macA = macA;
    socket.emit('perfData', perfData);
  }, 1000);
  socket.on('disconnect', () => {
    clearInterval(perfDataInterval);
  });
});

const cupAverage = () => {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((thread) => {
    for (mode in thread.times) {
      totalMs += thread.times[mode];
    }
    idleMs += thread.times.idle;
  });
  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

const getCpuLoad = () => {
  return new Promise((resolve, reject) => {
    const start = cupAverage(); // now
    setTimeout(() => {
      const end = cupAverage(); // end
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const cpuPercent = 100 - Math.floor((100 * idleDiff) / totalDiff);
      resolve(cpuPercent);
    }, 100);
  });
};

const performanceLoadData = () => {
  return new Promise(async (resolve, reject) => {
    const cpus = os.cpus(); // all cpus as an array
    const cpuType = cpus[0].model;
    const numberOfCores = cpus.length;
    const cpuSpeed = cpus[0].speed;

    const osType = os.type() == 'Darwin' ? 'Mac' : os.type();

    const upTime = os.uptime();

    const freeMemory = os.freemem(); // in Bites
    const totlaMemory = os.totalmem(); // in Bites

    const usedMemory = totlaMemory - freeMemory;
    const memoryUsage = Math.floor((usedMemory / totlaMemory) * 100) / 100; // 2 decimal places

    const cpuLoad = await getCpuLoad();
    resolve({
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
    });
  });
};
