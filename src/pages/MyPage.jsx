import Header from "../components/Header";
import MyProfile from "../components/Myprofile";
import NoticeBoard from "../components/NoticeBoard"; 
import "./MyPage.css";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../components/utils/AxiosInstance";
import { UserContext } from "../components/utils/UserContext";

const MyPage = () => {
  const [intro, setIntro] = useState("");
  const [myFriendList, setMyFriendList] = useState([]);
  const [selectedImageFile, setSelectedImageFile] = useState(null); // ✅ 프로필 이미지 파일 상태
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user?.intro) setIntro(user.intro);

    axiosInstance
      .get("/api/friend/my-friends")
      .then((res) => {
        if (res.status === 200) {
          setMyFriendList(res.data.acceptMemberDtoList);
        }
      })
      .catch((err) => {
        console.error("친구 목록 가져오기 실패:", err);
      });
  }, [user]);

  const handleSave = async () => {
    try {
      const introPromise = axiosInstance.post("/api/member/set-intro", { intro });
  
      let imagePromise = Promise.resolve();
      let updatedImageUrl = null;
  
      if (selectedImageFile === null) {
        // 삭제 요청
        imagePromise = axiosInstance
          .delete("/api/member/delete-profile-image")
          .then((res) => {
            updatedImageUrl = res.data.imageUrl;
          });
      } else if (selectedImageFile instanceof File) {
        // 업로드 요청
        const formData = new FormData();
        formData.append("profileImage", selectedImageFile);
  
        imagePromise = axiosInstance
          .post("/api/member/set-profile-image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            updatedImageUrl = res.data.imageUrl;
          });
      }
  
      await Promise.all([introPromise, imagePromise]);
  
      // UserContext 갱신
      setUser((prev) => ({
        ...prev,
        intro: intro,
        ...(updatedImageUrl && { profileImageUrl: updatedImageUrl }),
      }));
  
      alert("자기소개 및 프로필 이미지가 저장되었습니다!");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };
  
  

  if (!user) return <p>로딩 중...</p>;

  return (
    <div className="MyPage">
      <Header title={"Mypage"} />
      <div className="container">
        <div className="inner-container">
          {/* 왼쪽 프로필 섹션 */}
          <aside className="profile-section">
            <MyProfile 
              profileImageUrl={user.profileImageUrl} 
              onImageSelect={setSelectedImageFile}
               // ✅ 이미지 선택 전달
            />
            <label>이름</label>
            <input type="text" value={user.name} readOnly />
            <label>자기소개</label>
            <textarea
              value={intro}
              placeholder="200자 이내로 입력하세요"
              onChange={(e) => setIntro(e.target.value)}
            />
            <label className="section-title">개인정보</label>
            <label className="spacer-label"></label>
            <label>학번</label>
            <input type="text" value={user.username} readOnly />
            <label>이메일</label>
            <input type="text" value={user.email} readOnly />
            <button onClick={handleSave}>저장</button>
          </aside>

          {/* 오른쪽 메인 컨텐츠 */}
          <main className="main-content">
            <label>알림</label>
            <NoticeBoard />

            <label className="spacer-label"></label>

            <label>작성글, 작성댓글</label>
            <div className="content-row">
              <div className="box medium">작성글</div>
              <div className="box medium">작성댓글</div>
            </div>

            <label className="spacer-label"></label>

            <label>친구목록</label>
            <div className="friend-box">
              {myFriendList.length > 0 ? (
                myFriendList.map((friend, index) => (
                  <div key={index} className="friend-item">
                    {friend.name} <span className="dash">——</span>
                  </div>
                ))
              ) : (
                <div className="friend-item">친구가 없습니다.</div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
