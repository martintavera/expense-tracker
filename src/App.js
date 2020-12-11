import React from 'react';
import './styles/main.css';
import Router from './routers/Router';

function App() {
  return (
      <div className="bg-gray-200 h-screen overflow-auto font-sans">
      <Router/>
    </div>
  );
}

export default App;
