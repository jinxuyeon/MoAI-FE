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
            for (let i = 1; i <= 100; i++) {
                const postData = {
                    boardType: "SECRET",
                    title: `title${i}`,
                    content: `<p>content${i}</p>` // HTML 형식으로 감쌈
                }; 

                await axiosInstance.post("/api/post/post-up", postData);
                console.log(`✅ 게시글 ${i} 저장 완료`);
            }

            alert("테스트 게시글 100개 저장 완료");
        } catch (err) {
            console.error("❌ 게시글 저장 중 오류 발생:", err);
            alert("게시글 저장 실패");
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
