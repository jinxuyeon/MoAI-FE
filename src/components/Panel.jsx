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
        try {
            const response = await axiosInstance.get(`/api/member/search?studentId=${studentId}`);
            if (response.status === 200) {
                console.log(response)
            }
        } catch (error) {
            console.error("검색 실패:", error);
        }
    };

    return (
        <div className="Panel">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
