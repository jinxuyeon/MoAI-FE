import "./Panel.css";
import Favorites from "./Favorites";
import Friends from "./Friends";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";
import axiosInstance from "./utils/AxiosInstance";
import { UserContext } from "./utils/UserContext";
import { useContext } from "react";
const Panel = () => {
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) return <div>로딩 중...</div>;
    if (!user) return <div>로그인이 필요합니다</div>;

    const handleSearch = async () => {
        const filename = "test-image.jpg";

        try {
            const res = await axiosInstance.post("/api/post/post-up", {
                title: "테스트 제목",
                content: "<p>테스트 본문</p>",
                boardType: "FREE",  // enum 값 중 하나
            });

            console.log("응답:", res.data);
            alert("성공! 콘솔 확인");
        } catch (err) {
            console.error("❌요청 실패:", err);
            alert("실패");
        }
    };


    return (
        <div className="Panel">
            <div className="header">
                <button
                    className="profile-btn"
                    style={{
                        backgroundImage: `url(${user.profileImageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                <Link className="link-mypage" to={"/mypage"}>
                    {user.name || "???"} {/* ✅ localStorage 대신 context 사용 가능 */}
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
