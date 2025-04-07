import Header from "../components/Header";
import MyProfile from "../components/Myprofile";
import "./MyPage.css";

import { useEffect, useState } from "react";
import axiosInstance from "../components/utils/AxiosInstance";



const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    intro: "",
    studentId: "",
    email: "",
    password: "",
    profileImageUrl: ""
  });

  const id = localStorage.getItem("id");

  useEffect(() => {
    const studentId = localStorage.getItem("username");
    if (!studentId) return;

    axiosInstance
      .get(`/api/member/search?studentId=${studentId}`)
      .then((res) => {
        console.log("유저 정보 받아옴:", res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.error("유저 정보 요청 실패:", err);
      });
  }, []);

  const handleSaveIntro = async () => {
    try {
      const introData = {
        intro: userInfo.intro,
      };

      const response = await axiosInstance.post(
        `/api/member/${userInfo.id}/set-intro`,
        introData
      );

      console.log("자기소개 저장 완료", response.data);
      alert("자기소개가 저장되었습니다!");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <div className="MyPage">
      <Header title={"Mypage"} />
      <div className="container">
        <div className="inner-container">
          {/* 프로필 */}
          <aside className="profile-section">
            <MyProfile profileImageUrl={userInfo.profileImageUrl} />
         

            <label>이름</label>
            <input type="text" value={userInfo.name} readOnly />

            <label>자기소개</label>
            <textarea
              value={userInfo.intro || ""}
              placeholder="200자 이내로 입력하세요"
              onChange={(e) =>
                setUserInfo({ ...userInfo, intro: e.target.value })
              }
            />

            <label className="section-title">개인정보</label>
            <label className="spacer-label"></label>

            <label>학번</label>
            <input type="text" value={userInfo.username} readOnly />

            <label>이메일</label>
            <input type="text" value={userInfo.email} readOnly />

            <label>비밀번호</label>
            <input type="password" value={userInfo.password} readOnly />

            <button onClick={handleSaveIntro}>저장</button>
          </aside>

          {/* 메인 컨텐츠 영역 */}
          <main className="main-content">
            <label>알림</label>
            <div className="box large">알림</div>
            <label className="spacer-label"></label>

            <label>작성글, 작성댓글</label>
            <div className="content-row">
              <div className="box medium">작성글</div>
              <div className="box medium">작성댓글</div>
            </div>

            <label className="spacer-label"></label>
            <label>친구목록</label>
            <div className="box large">친구목록</div>
            </main>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
