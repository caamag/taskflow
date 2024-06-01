import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//context
import { AuthProvider } from './context/authContext';
import { onAuthStateChanged } from 'firebase/auth';

//pages
import Home from './pages/home/home';
import Dashboards from './pages/dashboards/dashboards';
import Login from './pages/login/login';

//components
import Nav from './components/nav/nav';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthenticate'

function App() {

  return <div className='App'>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/dashboards' element={<Dashboards />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
