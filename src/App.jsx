import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import Profile from './Components/Profile/Profile';
import Main from './Components/Main/Main';
import Navbar from './Components/Navbar/Navbar';

function App() {
  

  return (
    <div>
      <div>
      
        <div>
          <Router>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<Main/>} />
            </Routes>
          </Router>
          <ToastContainer />
          
        </div>
      </div>
    </div>
  );
}

export default App;
