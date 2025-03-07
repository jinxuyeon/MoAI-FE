import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import { jwtDecode } from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // 현재 시간 (초)
      console.log(`현재:${currentTime}`)
      console.log(`만료:${decoded.exp}`)
      return decoded.exp < currentTime;
    } catch (error) {
      return true; // 토큰이 잘못된 경우 만료된 것으로 처리
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰 가져오기
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true); // 유효한 토큰이 있으면 인증된 상태로 설정
      navigate("/main"); // 유효한 토큰이 있으면 메인 페이지로 리다이렉트
    } else {
      setIsAuthenticated(false); // 유효한 토큰이 없으면 인증되지 않은 상태로 설정
    }
  }, [navigate]);


  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/register" element={<RegisterPage />} />
        <Route path="/main" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
