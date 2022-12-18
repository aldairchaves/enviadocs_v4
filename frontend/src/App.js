import * as React from 'react';
import { Outlet, Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Document from './Pages/SendDocs'
import Transaction from './Pages/Transactions'
import Login from './Pages/Login'
import Register from './Pages/Register'
import DetailTrans from './components/DetailTrans'
import { AppProvider } from './Context/appContext';
import Dashboard from './Pages/Dashboard';
import {PrivateRoute} from './components/PrivateRoute'


export default function App() {
  return (
    <BrowserRouter>    
    <AppProvider>    
    <Routes>    
      <Route path="/" element= {<Login />} />
      <Route path="/home" element= {<PrivateRoute> <Dashboard /> </PrivateRoute>}/>  
      <Route path="/document" element= {<PrivateRoute><Document /> </PrivateRoute>} />
      <Route path="/transaction" element= {<PrivateRoute><Transaction /> </PrivateRoute>} />
      <Route path="/detailtrans" element= {<PrivateRoute> <DetailTrans /> </PrivateRoute>} />
      <Route path="/register" element= {<PrivateRoute> <Register /> </PrivateRoute>} />
    </Routes>
    </AppProvider>
    </BrowserRouter>
  );
}