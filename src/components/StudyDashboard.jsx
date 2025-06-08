// StudyDashboard.jsx
import './StudyDashboard.css';

const StudyDashboard = ({ onFindLectureClick }) => {
  const schedule = [
    { time: "09:00", task: "영상처리 과제 제출" },
    { time: "11:00", task: "캡스톤 회의" },
    { time: "14:00", task: "데이터 분석 복습" },
  ];

  const progress = [
    { title: "영상처리및실습", percent: 70 },
    { title: "네트워크보안", percent: 50 },
    { title: "데이터분석과 시각화", percent: 90 },
  ];

  return (
    <div className="StudyDashboard">
      <h2 className="dashboard-title">📚 학습 대시보드</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card blue">
          <h3>📅 내 플래너</h3>
          <ul>
            {schedule.map((item, idx) => (
              <li key={idx}>
                <strong>{item.time}</strong> - {item.task}
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-card yellow">
          <h3>💡 오늘의 공부 팁</h3>
          <p>
            25분 집중 + 5분 휴식! <br />
            <strong>포모도로 기법</strong>으로 몰입도를 높여보세요.
          </p>
        </div>

        <div className="dashboard-card green">
          <h3>🗓️ 시간표 안내</h3>
          <p>시간표 기능은 준비 중입니다!</p>
        </div>

        <div className="dashboard-card red">
          <h3>📊 강의 진도율</h3>
          <ul>
            {progress.map((p, idx) => (
              <li key={idx}>
                {p.title}
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${p.percent}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

    
      </div>
    </div>
  );
};

export default StudyDashboard;
