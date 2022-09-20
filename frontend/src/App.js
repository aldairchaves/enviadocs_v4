import * as React from 'react';
import { Outlet, Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Document from './Pages/SendDocs'
import Transaction from './Pages/Transactions'
import Login from './Pages/Login'
import Register from './Pages/Register'
import DetailTrans from './components/DetailTrans'
import { AppProvider } from './Context/appContext';
import Dashboard from './Pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
    <AppProvider>
    <Routes>
    <Route path="/" element= {<Dashboard />} />
      <Route path="/login" element= {<Login />} />
      <Route path="/register" element= {<Register />} />
      <Route path="/document" element= {<Document />} />
      <Route path="/transaction" element= {<Transaction />} />
      <Route path="/detailtrans" element= {<DetailTrans />} />
    </Routes>
    </AppProvider>
    </BrowserRouter>
  );
}