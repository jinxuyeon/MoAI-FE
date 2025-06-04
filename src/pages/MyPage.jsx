import Header from "../components/Header";
import MyProfile from "../components/Myprofile";
import "./MyPage.css";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../components/utils/AxiosInstance";
import { UserContext } from "../components/utils/UserContext";
import TodoBox from "../components/TodoBox";
import MyActivities from "../components/MyActivities";
const MyPage = () => {
    const [intro, setIntro] = useState("");
    const [checklist, setChecklist] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [nicknameCheckResult, setNicknameCheckResult] = useState(null);

    useEffect(() => {
        if (user?.intro) setIntro(user.intro);
    }, [user]);

    const handleSaveNickname = async () => {
        try {
            const res = await axiosInstance.post("/api/member/set-nickname", {
                nickname: user.nickname,
            });

            if (res.status === 200) {
                alert("닉네임이 저장되었습니다!");
            }
        } catch (error) {
            if (error.response?.status === 409) {
                alert("이미 사용 중인 닉네임입니다.");
            } else {
                console.error("닉네임 저장 실패:", error);
                alert("닉네임 저장에 실패했습니다.");
            }
        }
    };
    const handleSave = async () => {
        try {
            await axiosInstance.post("/api/member/set-intro", { intro });
            setUser((prev) => ({ ...prev, intro }));
            alert("자기소개가 저장되었습니다!");
        } catch (error) {
            console.error("저장 실패:", error);
            alert("자기소개 저장에 실패했습니다.");
        }
    };

    const handleImageSelect = async (file) => {
        try {
            if (!file) {
                const res = await axiosInstance.delete(
                    "/api/member/delete-profile-image"
                );
                const updatedImageUrl = res.data.imageUrl;
                setUser((prev) => ({
                    ...prev,
                    profileImageUrl: updatedImageUrl,
                }));
                alert("프로필 이미지가 삭제되었습니다!");
                return;
            }
            const formData = new FormData();
            formData.append("profileImage", file);
            const res = await axiosInstance.post(
                "/api/member/set-profile-image",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            const updatedImageUrl = res.data.imageUrl;
            setUser((prev) => ({ ...prev, profileImageUrl: updatedImageUrl }));
            alert("프로필 이미지가 저장되었습니다!");
        } catch (err) {
            console.error("프로필 이미지 업로드 실패:", err);
            alert("프로필 이미지 저장에 실패했습니다.");
        }
    };

    const handleAddItem = () => {
        if (newItem.trim() === "") return;
        setChecklist([...checklist, { text: newItem, checked: false }]);
        setNewItem("");
    };

    const toggleItem = (index) => {
        const updated = [...checklist];
        updated[index].checked = !updated[index].checked;
        setChecklist(updated);
    };

    if (!user) return <p>로딩 중...</p>;

    return (
        <div className="MyPage">
            <Header title="Mypage" />
            <div className="container">
                <div className="inner-container">
                    <aside className="profile-section">
                        <div className="proflie-img-box">
                            <MyProfile
                                profileImageUrl={user.profileImageUrl}
                                onImageSelect={handleImageSelect}
                            />
                        </div>
                        <label>이름</label>
                        <input type="text" value={user.name} readOnly />
                        <label>별명</label>
                        <input
                            type="text"
                            value={user.nickname || ""}
                            onChange={(e) =>
                                setUser((prev) => ({
                                    ...prev,
                                    nickname: e.target.value,
                                }))
                            }
                        />
                        <button
  className="save-btn"
  onClick={handleSaveNickname}
>
저장
</button>

                        <label>자기소개</label>
                        <textarea
                            value={intro}
                            placeholder="200자 이내로 입력하세요"
                            onChange={(e) => setIntro(e.target.value)}
                        />
                        <button
  className="save-btn"
  onClick={handleSave}
>
저장
</button>

                        <label className="section-title">개인정보</label>
                        <label className="spacer-label"></label>
                        <label>학번</label>
                        <input type="text" value={user.username} readOnly />
                        <label>이메일</label>
                        <input type="text" value={user.email} readOnly />
                    </aside>

                    <main className="main-content">
                        <MyActivities />
                        {/* 여기로옮김 */}
                        <div>
                            <TodoBox />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
