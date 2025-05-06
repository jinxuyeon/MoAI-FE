import Header from "../components/Header";
import MyProfile from "../components/Myprofile";
import "./MyPage.css";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../components/utils/AxiosInstance";
import { UserContext } from "../components/utils/UserContext";

const MyPage = () => {
  const [intro, setIntro] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user?.intro) setIntro(user.intro);
  }, [user]);

  const handleSave = async () => {
    try {
      const introPromise = axiosInstance.post("/api/member/set-intro", { intro });

      let imagePromise = Promise.resolve();
      let updatedImageUrl = null;

      if (selectedImageFile === null) {
        imagePromise = axiosInstance
          .delete("/api/member/delete-profile-image")
          .then((res) => {
            updatedImageUrl = res.data.imageUrl;
          });
      } else if (selectedImageFile instanceof File) {
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
          {/* 왼쪽 프로필 섹션 */}
          <aside className="profile-section">
            <MyProfile profileImageUrl={user.profileImageUrl} onImageSelect={setSelectedImageFile} />
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

          {/* 가운데 메인 컨텐츠 */}
          <main className="main-content">
            <label className="section-title small">내 활동</label>
            <div className="activity-tabs">
              <button
                className={activeTab === "posts" ? "active" : ""}
                onClick={() => setActiveTab("posts")}
              >
                작성글
              </button>
              <button
                className={activeTab === "comments" ? "active" : ""}
                onClick={() => setActiveTab("comments")}
              >
                작성댓글
              </button>
            </div>
            <div className="activity-content">
  {activeTab === "posts" && <div className="box checklist-box" style={{ minHeight: "100px" }}>작성글 박스</div>}
  {activeTab === "comments" && <div className="box checklist-box" style={{ minHeight: "100px" }}>작성댓글 박스</div>}
</div>

            <label className="section-title small">체크리스트</label>
            <div className="box checklist-box">
              <div className="checklist-input-row">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="새 체크리스트 입력"
                />
                <button onClick={handleAddItem}>추가</button>
              </div>

              <ul className="checklist-items">
                {checklist.map((item, index) => (
                  <li
                    key={index}
                    className={item.checked ? "checked" : ""}
                    onClick={() => toggleItem(index)}
                  >
                    <span className="circle">{item.checked ? "●" : "○"}</span>
                    <span className="item-text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <label className="section-title small">관심 채용공고</label>
            <div className="box recruitment-box">
              관심 있는 채용공고가 여기에 표시됩니다.
            </div>
          </main>

          {/* 오른쪽 전체 게시판 섹션 */}
          <aside className="board-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="전체 게시판의 글을 검색해보세요!"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="board-box">
              <div className="board-title">자유게시판</div>
              <div className="board-post">자유게시판 글 1</div>
              <div className="board-post">자유게시판 글 2</div>
              <div className="board-title">강의게시판</div>
              <div className="board-post">강의게시판 글 1</div>
              <div className="board-post">강의게시판 글 2</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
