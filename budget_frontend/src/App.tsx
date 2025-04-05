import React from 'react';
//import logo from './logo.svg';
import ReactDom from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './tsx/Home'
import Register from './tsx/Register'
import Login from './tsx/Login'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
