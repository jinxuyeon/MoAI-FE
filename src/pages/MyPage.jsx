import Header from "../components/Header";
import MyProfile from "../components/Myprofile";
import NoticeBoard from "../components/NoticeBoard"; 
import Friends from "../components/Friends"; 
import "./MyPage.css";
import { useEffect, useState } from "react";
import axiosInstance from "../components/utils/AxiosInstance";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    intro: "",
    studentId: "",
    email: "",
    profileImageUrl: ""
  });

  const [myFriendList, setMyFriendList] = useState([]);

  useEffect(() => {
    const studentId = localStorage.getItem("username");
    const id = localStorage.getItem("id");

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

    // 친구 목록 가져오기
    axiosInstance
      .get(`api/friend/${id}/accept-friend-list`)
      .then((res) => {
        if (res.status === 200) {
          setMyFriendList(res.data.acceptMemberDtoList);
        }
      })
      .catch((err) => {
        console.error("친구 목록 가져오기 실패:", err);
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
          
          {/* 왼쪽 프로필 섹션 */}
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
            <input type="text" value={userInfo.studentId} readOnly />
            <label>이메일</label>
            <input type="text" value={userInfo.email} readOnly />
            <button onClick={handleSaveIntro}>저장</button>
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

            {/* 친구목록 표시 */}
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
