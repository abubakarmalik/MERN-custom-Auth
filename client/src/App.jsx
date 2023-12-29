import React from 'react';
import Home from './layouts/home/Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './layouts/auth/Signin';
import Signup from './layouts/auth/Signup';
import Forget from './layouts/auth/Forget';
import Reset from './layouts/auth/Reset';
import Verify from './layouts/auth/Verify';
import Dashboard from './layouts/dashboard/Dashboard';
import { useSelector } from 'react-redux';

function App() {
  const authenticated = useSelector((state) => state.authReducer.authenticated);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={!authenticated ? <Home /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/dashboard'
            element={authenticated ? <Dashboard /> : <Navigate to='/' />}
          />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/forget' element={<Forget />} />
          <Route path='/reset' element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
