import React from 'react';
import { useScreenSize, BreakPoint } from 'use-screen-size';

const App: React.FC = () => {
  // const { width, height, screen } = useScreenSize();

  return (
    <div style={{ padding: '20px' }}>
      <h1>use-screen-size Example</h1>
      {/* <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      <p>Breakpoint: {screen}</p>
      {screen === BreakPoint.xs && <p>You are on a very small screen!</p>} */}
    </div>
  );
};

export default App;
