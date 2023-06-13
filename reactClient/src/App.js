import React from 'react';
import './App.css';
import socket from './utilities/socketConnection';
import Widget from './components/Widget';

function App() {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    const perfDataCallback = (data) => {
      const stateClone = { ...state };
      stateClone[data.macA] = data;
      setState(stateClone);
    };
    socket.on('perfData', perfDataCallback);
    return () => {
      socket.off('perfData', perfDataCallback);
    };
  }, [state]);
  const widgets = Object.values(state).map((data) => {
    return <Widget data={data} key={data.macA} />;
  });

  return <div className="container">{widgets}</div>;
}

export default App;
