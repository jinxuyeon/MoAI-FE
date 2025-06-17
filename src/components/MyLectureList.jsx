import { Link } from "react-router-dom";
import "./MyLectureList.css";
import { Book } from "lucide-react";
import axiosInstance from "./utils/AxiosInstance";
import { useEffect, useState } from "react";

const MyLectureList = () => {
  const [lectureList, setLectureList] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axiosInstance.get("/lecture-room/mark");
        console.log("✅ 즐겨찾기 응답:", res.data);

        const favorites = res.data?.markedLecture ?? []; // ✅ 수정된 필드명 반영
        setLectureList(favorites);
      } catch (error) {
        console.error("❌ 즐겨찾기 강의 불러오기 실패:", error);
        setLectureList([]);
      }
    };

    fetchFavorites();

    const handleUpdate = () => fetchFavorites();
    window.addEventListener("favoritesUpdated", handleUpdate);
    return () => window.removeEventListener("favoritesUpdated", handleUpdate);
  }, []);

  return (
    <div className="MyLectureList">
      <h3 className="list-title">
        <Book size={18} style={{ marginRight: "6px", verticalAlign: "middle" }} />
        내 강의 목록
      </h3>
      <ul className="lecture-list">
        {Array.isArray(lectureList) && lectureList.length > 0 ? (
          lectureList.map((lec) => (
            <li key={lec.id}>
              <Link to={`/main/study-dashboard/${lec.id}`} className="lecture-link">
                {lec.title}
              </Link>
            </li>
          ))
        ) : (
          <li className="no-lecture">즐겨찾기한 강의가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default MyLectureList;
