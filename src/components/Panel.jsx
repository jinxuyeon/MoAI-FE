import "./Panel.css";
import Favorites from "./Favorites";
import Friends from "./Friends";
import { Link } from "react-router-dom";
import Calendar from "./Calendar";
import axiosInstance from "./utils/AxiosInstance";
import { UserContext } from "./utils/UserContext";
import { useContext, useRef } from "react";
import MyLectureList from "./MyLectureList";
const Panel = ({ mode = "main" }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading || !user) return <div>로딩 중...</div>;

  const testhandle = async () => {
    try {
      const response = await axiosInstance.get("/api/post/favorites");
      alert("조회 성공");
    } catch (error) {
      console.error("❌ 즐겨찾기 조회 실패:", error);
      alert("조회 실패");
    }
  };

  return (
    <div className="Panel">
      <div className="header">
        <button
          className="profile-btn"
          style={{
            backgroundImage: `url(${user.profileThumbnails})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Link className="link-mypage" to={"/mypage"}>
          {user.nickname || "이름없음"}
        </Link>
      </div>

      {mode === "main" && (
        <>
          <Favorites />
          <Friends />
          <Calendar />
        </>
      )}

      {mode === "study" && (
        <>
          {/* Study 전용 위젯 구성 */}
          <MyLectureList/>
          여기 위젯 추가 가능
        </>
      )}
    </div>
  );
};

export default Panel;
