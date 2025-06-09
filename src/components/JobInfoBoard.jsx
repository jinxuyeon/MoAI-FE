import { useEffect, useState } from "react";
import axiosInstance from "./utils/AxiosInstance";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 깔끔한 아이콘 사용
import "./JobInfoBoard.css";

const JobInfoBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 4;

  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/api/jobs");
      console.log("✅ 채용 정보 응답 전체:", res);
      console.log("🧩 첫 번째 채용 데이터 구조:", res.data[0]);
      setJobs(res.data);
    } catch (error) {
      console.error("❌ 채용 정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = currentPage * jobsPerPage;
  const visibleJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="JobInfoBoard">
      <h3>최신 채용 정보</h3>
      <div className="job-list">
        {visibleJobs.map((job, index) => (
          <a
            key={index}
            href={job.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="job-card-link"
          >
            <div className="job-card">
              <div className="job-title">{job.title}</div>
              <div className="job-meta">
                지역: {job.region} | 고용형태: {job.employmentType} | 회사명: {job.company}
              </div>
              <p className="job-preview">{job.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          <ChevronLeft size={20} />
        </button>
        <span>{currentPage + 1} / {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="more-jobs">
        🔍 <a href="https://www.jobkorea.co.kr/">더 많은 채용 정보 보기</a>
      </div>
    </section>
  );
};

export default JobInfoBoard;
