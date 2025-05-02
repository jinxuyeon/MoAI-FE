import "./JobInfoBoard.css";

const JobInfoBoard = () => {
    const jobs = [
        { id: 1, title: "백엔드 개발자", link: "https://example.com/job1", preview: "Spring Boot 개발" },
        { id: 2, title: "프론트엔드 개발자", link: "https://example.com/job2", preview: "React 개발" },
        { id: 3, title: "데이터 엔지니어", link: "https://example.com/job3", preview: "Spark, Hadoop" },
        { id: 3, title: "데이터 엔지니어", link: "https://example.com/job3", preview: "Spark, Hadoop" },
        { id: 3, title: "데이터 엔지니어", link: "https://example.com/job3", preview: "Spark, Hadoop" },
        { id: 3, title: "데이터 엔지니어", link: "https://example.com/job3", preview: "Spark, Hadoop" },

    ];

    return (
        <section className="JobInfoBoard">
            <h3>최신 채용 정보</h3>
            <div className="job-list">
                {jobs.map((job) => (
                    <div key={job.id} className="job-card">
                        <a href={job.link} target="_blank" rel="noopener noreferrer" className="job-title">
                            {job.title}
                        </a>
                        <p className="job-preview">{job.preview}</p>
                    </div>
                ))}
            </div>
            <div className="more-jobs">
                🔍 <a href="https://example.com/all-jobs">더 많은 채용 정보 보기</a>
            </div>
        </section>
    );
};

export default JobInfoBoard;
