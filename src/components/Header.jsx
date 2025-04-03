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
    const handleLogout = () => {
        //localStorage.removeItem("accessToken")
        //localStorage.removeItem("refreshToken")
        localStorage.clear();
        window.location.href = "/login";
    };

    const handleSearch = async () => {
        const id = localStorage.getItem("id");
        if (!id) return; // ID가 없으면 요청하지 않음
        try {
            const response = await axiosInstance.get(`/api/member/${id}/notice`);
            if (response.status === 200) {
                console.log("알림 가져오기 성공", response.data);
                setNotices(response.data.notices);
            }
        } catch (error) {
            console.error("검색 실패:", error);
        }
    };


    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className="header-container">
            <Link to="/main" className="logo_btn"></Link>
            <h2 style={{ marginLeft: "10px" }}>{title}</h2>
            <div className="header-space">
                <div className="util-box">
                    <Bellbox notices ={notices} setNotices ={setNotices}/>
                    <MailBox />
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
