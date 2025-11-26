import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Workspace from "./components/WorkSpace";
import AcceptInvite from "./components/AcceptInvite"

import './App.css'

// function Dashboard() {
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold">Welcome to CollabSync Dashboard</h1>
//     </div>
//   );
// }

function App() {

  return (
    <>
      
    <Router>
      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/workspace/:id" element={<Workspace/>} />
       <Route path="/accept-invite/:token" element={<AcceptInvite />} />

      </Routes>
    </Router>
  
    </>
  )
}

export default App
