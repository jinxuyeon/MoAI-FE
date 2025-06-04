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
  const fileInputRef = useRef(null);

  if (isLoading || !user) return <div>로딩 중...</div>; // ✅ 로딩/로그인 체크 철저히

  const testhandle = async () => {
    try {
      const res = await axiosInstance.post("/api/post/50/comments", {
        content: "테스트 댓글입니다.",
      });
      console.log("✅ 댓글 등록 응답:", res.data);
      alert("댓글 등록 성공!");
    } catch (err) {
      console.error("❌ 댓글 등록 실패:", err);
      alert("댓글 등록 실패");
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
          {user.nickname || "이름없음"} {/* ✅ 안정적인 fallback */}
        </Link>
      </div>
      <Favorites />
      <Friends />
      <Calendar />
      {/* <input type="file" ref={fileInputRef} accept="image/*" /> */}
      {/* <button onClick={testhandle}>테스트용 (S3 업로드)</button> */}
    </div>
  );
};

export default Panel;
