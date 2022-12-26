import React from 'react';
import SideBar from './global/SideBar';
import './App.css';
import ContextBar from './global/ContextBar';
import ContentView from './global/ContentView';
import ControlSection from './global/ControlSection';



function App() {
  return (
    <div className="flex">
      <SideBar />
      <ContextBar />
      <ContentView />
    </div>
  );
}

export default App;
