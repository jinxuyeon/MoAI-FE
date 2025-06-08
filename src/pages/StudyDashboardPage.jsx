import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Panel from "../components/Panel";
import StudyDashboard from "../components/StudyDashboard";
import "./StudyDashboardPage.css";

const StudyDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSubPage = location.pathname !== "/main/study-dashboard";

  const handleFindLecture = () => {
    navigate("/main/study-dashboard/lectures");
  };

  return (
    <div className="StudyDashboardPage">
      <Header title={"Dashboard-study"} />
      <div className="Panel-Dashboard-Container">
        <div className="Panel-container">
          <Panel mode="study" />
        </div>
        <div className="Dashboard-container">
          {isSubPage ? <Outlet /> : <StudyDashboard onFindLectureClick={handleFindLecture} />}
        </div>
      </div>
    </div>
  );
};

export default StudyDashboardPage;
