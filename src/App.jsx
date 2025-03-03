import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SupportPage from './pages/supportPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 토큰 확인
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // 토큰이 있으면 로그인 상태로 간주
    }
  }, []);

  return (

    <div>
      <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="support" element={<SupportPage />} />
        </Routes>

    </div>
      
  );
}

export default App;
