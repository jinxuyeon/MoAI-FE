import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // 현재 URL 경로 가져오기

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            console.log(`현재:${currentTime}`);
            console.log(`만료:${decoded.exp}`);
            return decoded.exp < currentTime;
        } catch (error) {
            return true;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token && !isTokenExpired(token)) {
            setIsAuthenticated(true);
            console.log("인증완료");
        } else {
            setIsAuthenticated(false);
            console.log("인증실패");
            localStorage.removeItem("accessToken");
            delete axios.defaults.headers.common["Authorization"];
        }
    }, []);

    // 현재 페이지가 로그인 또는 회원가입 페이지인지 확인
    const hideFooterRoutes = ["/login", "/login/register"];
    const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

    return (
        <div>
            <div className="body-container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />
                        }
                    />
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/login/register" element={<RegisterPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/main/:boardType" element={<BoardPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    

                    {/* 개발단계 시 위 형식식 사용, */}

                    {/* 
                    <Route path="/main" element={isAuthenticated ? <MainPage />: <Navigate to="/" replace />} />
                    <Route path="/mypage" element={isAuthenticated ? <MyPage /> : <Navigate to="/" replace />} />
                    */}

                    
                </Routes>
            </div>
            {shouldShowFooter && <div className="footer">@masdfkuj@nanmer.cvom capstone project</div>}
        </div>
    );
}

export default App;
