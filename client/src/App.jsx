import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from './components/Auth/Login'
import Register from "./components/Auth/Register";
// import Register from './components/Auth/Register'
import Login from "./components/Auth/Login ";
import Dashboard from "./components/Dashboard";
import ChangePassword from "./components/Auth/ChangePassword";
import LearnMore from "./components/LearnMore";
import Payment from "./components/Payment";
import Transaction from "./components/Transaction";
import ShowAllTransaction from "./components/ShowAllTransaction";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/payment-page" element={<Payment />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transactions" element={<ShowAllTransaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
