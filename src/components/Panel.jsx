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
        try {
            const id = localStorage.getItem("id");
            const formData = new FormData();

            const imageResponse = await fetch("icons/profile_base.jpg");
            const blob = await imageResponse.blob();

            const extension = blob.type.split("/")[1]; // 예: "png", "jpeg"
            const fileName = `profile-base.${extension}`;

            const file = new File([blob], fileName, { type: blob.type });
            if (file.size > 1 * 1024 * 1024) {
                alert("1MB 이하의 파일만 업로드할 수 있습니다.");
                return;
            }

            formData.append("profileImage", file);
            const response = await axiosInstance.post(`/api/member/${id}/set-profile-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("업로드 완료:", response.data);
            alert("이미지 업로드 성공!");
        } catch (err) {
            console.error("업로드 실패:", err);
            alert("이미지 업로드 실패");
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
