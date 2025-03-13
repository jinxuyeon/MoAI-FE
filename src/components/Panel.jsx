import "./Panel.css";
import Favorites from "./Favorites";
import Friends from "./Friends";
import { Link } from "react-router-dom";
import axios from "axios";

const Panel = ({ username }) => {
    const adminButtonHandler = async () => {
        try {
            console.log("요청 보내기: " + localStorage.getItem("accessToken"));

            const response = await axios.get("http://localhost:8080/api/member/admin-test", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json"
                }
            });

            alert(`관리자 전용 요청 성공: ${response.data.message}`);
        } catch (error) {
            alert(`에러 발생: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="Panel">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <button className="profile-btn"></button>
                <Link className="link-mypage" to={"/mypage"}>{username}</Link>
            </div>

            <Favorites />
            <hr />
            <Friends />
            <hr />
            <div>캘린더</div>
            <button onClick={adminButtonHandler}>관리자만 가능한 버튼</button>
        </div>
    );
};

export default Panel;
