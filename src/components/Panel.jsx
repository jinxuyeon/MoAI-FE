import "./Panel.css";
import Favorites from "./Favorites";
import Friends from "./Friends";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";
import axiosInstance from "./utils/AxiosInstance";
import { UserContext } from "./utils/UserContext";
import { useContext, useRef } from "react";

const Panel = () => {
    const { user, isLoading } = useContext(UserContext);
    const fileInputRef = useRef(null); // 파일 선택용 ref

    if (isLoading) return <div>로딩 중...</div>;
    if (!user) return <div>로그인이 필요합니다</div>;

    const testhandle = async () => {
    try {
        const res = await axiosInstance.get("/api/post/50");  // 예: 50번 게시글
        console.log("게시글 정보:", res.data);
    } catch (err) {
        console.error("게시글 불러오기 실패", err);
        alert("게시글 불러오기 실패");
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
                    {user.name || "???"}
                </Link>
            </div>
            <Favorites />
            <Friends />
            <Calendar />
            <input type="file" ref={fileInputRef} accept="image/*" />
            <button onClick={testhandle}>테스트용 (S3 업로드)</button>
        </div>
    );
};

export default Panel;
