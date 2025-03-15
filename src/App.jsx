import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';



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
    const token = localStorage.getItem("accessToken");
  
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      console.log("인증완료")

    } else {
      setIsAuthenticated(false);
      console.log("인증실패")

      localStorage.removeItem("accessToken"); // 만료된 토큰 삭제
      delete axios.defaults.headers.common["Authorization"]; // 헤더에서 제거
    }
  }, []);

  
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage setIsAuthenticated ={setIsAuthenticated}/>} />
        <Route path="/login/register" element={<RegisterPage />} />
        <Route path="/main" element={isAuthenticated ? <MainPage /> : <Navigate to="/" replace />} />
        <Route path="/mypage" element={isAuthenticated ? <MyPage /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
