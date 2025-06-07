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
    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setIntro(user.intro || "");
            setNickname(user.nickname || "");
        }
    }, [user]);

    const isValidNickname = (value) => {
        const nicknameRegex = /^[a-zA-Z0-9가-힣]{1,10}$/;
        return nicknameRegex.test(value);
    };

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);

        if (value.trim() === "") {
            setNicknameError("닉네임을 입력해주세요.");
        } else if (!isValidNickname(value.trim())) {
            setNicknameError("닉네임은 10자 이하, 공백/특수문자 불가입니다.");
        } else {
            setNicknameError("");
        }
    };

    const handleNicknameBlur = () => {
        const trimmed = nickname.trim();
        if (!trimmed || !isValidNickname(trimmed)) {
            setNickname(user.nickname || "");
            setNicknameError("");
        }
    };

    const handleSaveNickname = async () => {
        const trimmed = nickname.trim();

        if (!isValidNickname(trimmed)) {
            setNicknameError("닉네임은 10자 이하, 공백/특수문자 불가입니다.");
            setNickname(user.nickname || "");
            return;
        }

        try {
            const res = await axiosInstance.post("/api/member/set-nickname", {
                nickname: trimmed,
            });

            if (res.status === 200) {
                setUser((prev) => ({ ...prev, nickname: trimmed }));
                alert("닉네임이 저장되었습니다!");
            }
        } catch (error) {
            setNickname(user.nickname || "");
            if (error.response?.status === 409) {
                setNicknameError("이미 사용 중인 닉네임입니다.");
            } else {
                console.error("닉네임 저장 실패:", error);
                setNicknameError("닉네임 저장에 실패했습니다.");
            }
        }
    };

    const handleSave = async () => {
        if (intro.length > 200) {
            alert("자기소개는 200자 이내로 입력해주세요.");
            return;
        }

        try {
            await axiosInstance.post("/api/member/set-intro", { intro });
            setUser((prev) => ({ ...prev, intro }));
            alert("자기소개가 저장되었습니다!");
        } catch (error) {
            console.error("자기소개 저장 실패:", error);
            alert("자기소개 저장에 실패했습니다.");
        }
    };

    const handleImageSelect = async (file) => {
        const MAX_FILE_SIZE = 4 * 1024 * 1024;

        try {
            if (!file) {
                const res = await axiosInstance.delete("/api/member/delete-profile-image");
                const updatedImageUrl = res.data.imageUrl;
                setUser((prev) => ({
                    ...prev,
                    profileImageUrl: updatedImageUrl,
                }));
                alert("프로필 이미지가 삭제되었습니다!");
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                alert("이미지 크기는 4MB 이하만 가능합니다.");
                return;
            }

            const formData = new FormData();
            formData.append("profileImage", file);
            const res = await axiosInstance.post("/api/member/set-profile-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const updatedImageUrl = res.data.imageUrl;
            setUser((prev) => ({ ...prev, profileImageUrl: updatedImageUrl }));
            alert("프로필 이미지가 저장되었습니다!");
        } catch (err) {
            console.error("프로필 이미지 업로드 실패:", err);
            alert("프로필 이미지 저장에 실패했습니다.");
        }
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
                            value={nickname}
                            onChange={handleNicknameChange}
                            onBlur={handleNicknameBlur} // ✅ 포커스 빠질 때 원복
                        />
                        {nicknameError && (
                            <small style={{ color: "red", marginTop: "4px", display: "block" }}>
                                {nicknameError}
                            </small>
                        )}
                        <button className="save-btn" onClick={handleSaveNickname}>
                            저장
                        </button>

                        <label>자기소개</label>
                        <textarea
                            value={intro}
                            placeholder="200자 이내로 입력하세요"
                            maxLength={200}
                            onChange={(e) => setIntro(e.target.value)}
                        />
                        <small style={{ color: "gray" }}>{intro.length}/200자</small>
                        <button className="save-btn" onClick={handleSave}>
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
