import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './tsx/Home';
import Register from './tsx/Register';
import Login from './tsx/Login';
import BudgetPie from './tsx/BudgetPie';
import AllBudgets from './tsx/AllBudgets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/budgetpie/:id" element={<BudgetPie />} />
        <Route path="/allbudgets" element={<AllBudgets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

