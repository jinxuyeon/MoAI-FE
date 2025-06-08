import "./StudyNavi.css";
import { Link } from "react-router-dom";

const StudyNavi = () => {
  return (
    <div className="StudyNavi">
      {/* <Link to="/main"><button>메인페이지로 돌아가기</button></Link> */}
      <Link to="/main/study-dashboard"><button>학습 대시보드로 돌아가기</button></Link>
      <Link to="/main/study-dashboard/lectures"><button>강의실 찾아보기</button></Link>
    </div>
  );
};

export default StudyNavi;
