import { useEffect, useState } from "react";
import axiosInstance from "./utils/AxiosInstance";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./JobInfoBoard.css";

const JobInfoBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 4;

  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/api/jobs");
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
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0); // 마지막 페이지면 처음으로
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <section className="JobInfoBoard">
      <h3>최신 채용 정보</h3>
      <div className="job-list">
        {visibleJobs.map((job) => (
          <a
            key={job.id}
            href={job.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="job-card-link"
          >
            <div className="job-card">
              <div className="job-title">{job.title}</div>
              <div className="job-meta">
                <span>📍 {job.region}</span> |{" "}
                <span>💼 {job.employmentType}</span> |{" "}
                <span>🏢 {job.company}</span>
              </div>
              <div className="job-preview">
                {job.description.length > 30
                  ? `${job.description.slice(0, 30)}...`
                  : job.description}
              </div>
              <div className="job-date">🗓️ {formatDate(job.createdAt)}</div>
            </div>
          </a>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          <ChevronLeft size={20} />
        </button>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
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
