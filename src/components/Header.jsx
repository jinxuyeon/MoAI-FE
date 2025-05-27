import "./Header.css";
import { LogOut } from "lucide-react";
import Bellbox from "./BellBox";
import MailBox from "./MailBox";
import { Link } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useEffect } from "react";
import { useState } from "react";

function Header({ title }) {

    const [notices, setNotices] = useState([]);
    const [newMailCount, setNewMailCount] = useState(0)
    const handleLogout = () => {
        //localStorage.removeItem("accessToken")
        //localStorage.removeItem("refreshToken")
        localStorage.clear();
        window.location.href = "/login";
    };

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/api/member/my-notices`);
            if (response.status === 200) {
                console.log("알림 가져오기 성공", response.data);
                setNotices(response.data.notices);
            }
        } catch (error) {
            console.error("검색 실패:", error);
        }
    };

   const checkMail = async () => {
    try {
        const response = await axiosInstance.get("/api/mail/check-new");
        if (response.status === 200) {
            console.log("메일 개수 확인:", response.data.newMailCount);
            setNewMailCount(response.data.newMailCount);
        }
    } catch (error) {
        console.error("메일 확인 실패:", error);
    }
};

    useEffect(() => {
        handleSearch();
        checkMail();
    }, []);

    return (
        <div className="header-container">
            <Link to="/main" className="logo_btn"></Link>
            <h2 style={{ marginLeft: "10px" }}>{title}</h2>
            <div className="header-space">
                <div className="util-box">
                    <Bellbox notices={notices} setNotices={setNotices} />
                    <MailBox newMailCount = {newMailCount}/>
                </div>

                <button
                    className="logout-btn"
                    title="로그아웃"
                    onClick={handleLogout}
                >
                    <LogOut />
                </button>
            </div>
        </div>
    );
}

export default Header;
