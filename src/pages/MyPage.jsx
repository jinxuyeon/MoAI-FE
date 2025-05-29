import Header from "../components/Header";
import MyProfile from "../components/Myprofile";
import "./MyPage.css";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../components/utils/AxiosInstance";
import { UserContext } from "../components/utils/UserContext";

const MyPage = () => {
    const [intro, setIntro] = useState("");
    const [activeTab, setActiveTab] = useState("posts");
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
                            className="save-nickname-btn"
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
                        <button onClick={handleSave}>자기소개 저장</button>

                        <label className="section-title">개인정보</label>
                        <label className="spacer-label"></label>
                        <label>학번</label>
                        <input type="text" value={user.username} readOnly />
                        <label>이메일</label>
                        <input type="text" value={user.email} readOnly />
                    </aside>

                    <main className="main-content">
                        <label className="section-title small">내 활동</label>

                        <section>
                            <div className="activity-tabs">
                                <button
                                    className={
                                        activeTab === "posts" ? "active" : ""
                                    }
                                    onClick={() => setActiveTab("posts")}
                                >
                                    작성글
                                </button>
                                <button
                                    className={
                                        activeTab === "comments" ? "active" : ""
                                    }
                                    onClick={() => setActiveTab("comments")}
                                >
                                    작성댓글
                                </button>
                            </div>
                            <div className="activity-content">
                                {activeTab === "posts" && (
                                    <div
                                        className="box checklist-box"
                                        style={{ minHeight: "100px" }}
                                    >
                                        작성글 박스
                                    </div>
                                )}
                                {activeTab === "comments" && (
                                    <div
                                        className="box checklist-box"
                                        style={{ minHeight: "100px" }}
                                    >
                                        작성댓글 박스
                                    </div>
                                )}
                            </div>
                        </section>

                        
                    </main>

                    <aside className="board-section">
                        <section>
                            <label className="section-title small">
                                체크리스트
                            </label>
                            <div className="box checklist-box">
                                <div className="checklist-input-row">
                                    <input
                                        type="text"
                                        value={newItem}
                                        onChange={(e) =>
                                            setNewItem(e.target.value)
                                        }
                                        placeholder="새 체크리스트 입력"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleAddItem();
                                            }
                                        }}
                                    />
                                    <button onClick={handleAddItem}>
                                        추가
                                    </button>
                                </div>
                                <ul className="checklist-items">
                                    {checklist.map((item, index) => (
                                        <li
                                            key={index}
                                            className={
                                                item.checked ? "checked" : ""
                                            }
                                            onClick={() => toggleItem(index)}
                                        >
                                            <span className="circle">
                                                {item.checked ? "●" : "○"}
                                            </span>
                                            <span className="item-text">
                                                {item.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
