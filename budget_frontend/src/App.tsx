import React from 'react';
//import logo from './logo.svg';
import ReactDom from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './tsx/Home'
import Register from './tsx/Register'
import Login from './tsx/Login'
import BudgetPie from './tsx/BudgetPie';
import AllBudgets from './tsx/AllBudgets';
import IncomeForm from './components/IncomeForm';
import IncomeList from './components/IncomeList';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path = "/budgetpie/:id" element = {<BudgetPie/>} />
      <Route path = "/allbudgets" element = {<AllBudgets />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
