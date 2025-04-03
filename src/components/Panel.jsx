import "./Panel.css";
import Favorites from "./Favorites";
import Friends from "./Friends";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";
import axiosInstance from "./utils/AxiosInstance";
const Panel = () => {

    const name = localStorage.getItem("name");
    const studentId = localStorage.getItem("username")
    const handleSearch = async () => {
        const id = localStorage.getItem("id");
        if (!id) return; // ID가 없으면 요청하지 않음

        try {
            const response = await axiosInstance.get(`/api/member/${id}/notice`);
            if (response.status === 200) {
                console.log("알림 가져오기 성공", response.data);
            }
        } catch (error) {
            console.error("검색 실패:", error);
        }
    };

    return (
        <div className="Panel">
            <div className="header">
                <button className="profile-btn"></button>
                <Link className="link-mypage" to={"/mypage"}>
                    {name || "게스트"}
                </Link>
            </div>
            <Favorites />
            <Friends />

            <Calendar />

            <button onClick={handleSearch}>테스트용</button>
        </div>
    );
};

export default Panel;
