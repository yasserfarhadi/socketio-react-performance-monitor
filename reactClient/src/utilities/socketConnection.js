import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000', {
  auth: {
    token: 'asdasdjaskdalksdpoaskpdokapsokdpaoksdpokasodk',
  },
});
socket.on('connect', (data) => {
  console.log(data);
});

export default socket;
