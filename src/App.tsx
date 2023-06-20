import React from 'react';
import SideBar from './global/SideBar';
import './App.css';
import ContextBar from './global/ContextBar';
import ContentView from './global/ContentView';
import ControlSection from './global/ControlSection';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/dashboard';
import Channel from './Pages/channel';
import Settings from './Pages/settings';
import NotFound from './Pages/404';
import ChatDirect from './global/Content/ChatDirect';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000')



function App() {
  return (
    <div className="flex">
      <Routes>
        <Route path="/" element={<Navigate to="/friends"/>}/>
        <Route element={<SideBar />}>
          <Route element={<Dashboard/>}>
            <Route path="/friends" element={<ChatDirect />}/>
            <Route path="/messages/:id" element={<ChatDirect />}/>
          </Route>
          <Route path="/channel/:id" element={<Channel/>}>
            <Route path="/channel/:id/:id" />
          </Route>
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
