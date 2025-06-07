import { useState } from "react";
import Header from "../components/Header";
import Panel from "../components/Panel";
import StudyDashboard from "../components/StudyDashboard";
import "./StudyDashboardPage.css";
import LectureCategoryBox from "../components/board-box/LectureCategoryBox";

const StudyDashboardPage = () => {
  const [showLectureList, setShowLectureList] = useState(false);

  const handleFindLecture = () => {
    setShowLectureList(true); // 강의실 목록으로 이동
  };

  const handleBackToDashboard = () => {
    setShowLectureList(false); // 대시보드로 돌아가기
  };

  return (
    <div className="StudyDashboardPage">
      <Header title={"Dashbard-study"} />
      <div className="Panel-Dashboard-Container">
        <div className="Panel-container">
          <Panel mode="study" />
        </div>
        <div className="Dashboard-container">
          {showLectureList ? (
            <LectureCategoryBox onBack={handleBackToDashboard} />
          ) : (
            <StudyDashboard onFindLectureClick={handleFindLecture} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyDashboardPage;
