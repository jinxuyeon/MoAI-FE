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
import Footer from "./components/Footer";
import MailPage from "./pages/MailPage.jsx";
import { UserProvider } from "./components/utils/UserContext.jsx";
import NoticeWrite from "./components/board-box/NoticeWrite";

import WritePage from "./pages/WritePage";
import LectureBoardPage from "./pages/LectureBoardPage";
import LectureWritePage from "./pages/LectureWritePage";
import AdminPage from "./pages/AdminPage.jsx";


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
    const hideFooterRoutes = ["/login", "/login/register", "/chat-mail", "/mypage"];
    const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

    return (
        <UserProvider>
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
                    <Route path="/main/community/:boardType" element={isAuthenticated ? <BoardPage /> : <BoardPage />} />
                    <Route path="/main" element={isAuthenticated ? <MainPage /> : <MainPage />} />
                    <Route path="/mypage" element={isAuthenticated ? <MyPage /> : <MyPage />} />
                    <Route path="/chat-mail" element={isAuthenticated ? <MailPage /> : <MailPage />} />
                    <Route path="/main/notice/write" element={<NoticeWrite />} />
                    <Route path="/board/:boardType" element={<BoardPage />} />
                    <Route path="/main/lecture/:lectureId" element={<LectureBoardPage />} />
                    <Route path="/write/:boardType" element={<WritePage />} />
                    <Route path="/main/lecture/:lectureId/write" element={<LectureWritePage />} />
                    <Route path="/admin" element={<AdminPage />} />



                </Routes>
            </div>
            {shouldShowFooter && <Footer />}
        </UserProvider>
    );
}

export default App;
