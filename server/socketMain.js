// where socket.io listeners and (most) emmiters
const socketMain = (io) => {
  io.on('connection', (socket) => {
    let machineMacA;
    const auth = socket.handshake.auth;
    if (
      auth.token ===
      'askdaksdlakjsdajsdlkjaslkdjasfiqejwqicmz,mccqiejfpqasm;lsdjasdp'
    ) {
      // valid node client
      socket.join('nodeClient'); // this client is a node client put in a approproate room
    } else if (auth.token === 'asdasdjaskdalksdpoaskpdokapsokdpaoksdpokasodk') {
      // valid react client
      socket.join('reactClient');
      // this is a react client, put in a approproate room
    } else {
      socket.disconnect();
      console.log('YOU HAVE BEEM DISCONNECTED!!!');
    }
    console.log(`Someone connected on worker ${process.pid}`);
    socket.emit('welcome', 'Welcome to our cluster driven socketio server');
    socket.on('perfData', (data) => {
      if (!machineMacA) {
        machineMacA = data.macA;
        io.to('reactClient').emit('connectedOrNot', {
          machineMacA,
          isAlive: true,
        });
      }
      io.to('reactClient').emit('perfData', data);
    });

    socket.on('disconnect', (reason) => {
      // a node client just disconnected let the frontend know
      io.to('reactClient').emit('connectedOrNot', {
        machineMacA,
        isAlive: false,
      });
    });
  });
};

module.exports = socketMain;
