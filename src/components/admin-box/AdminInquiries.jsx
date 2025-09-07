import { useEffect, useState } from "react";
import "./AdminInquiries.css";
import axiosInstance from "../utils/AxiosInstance";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchInquiries = async () => {
    try {
      setLoading(true);

      let stateParam = null;
      if (filter === "처리중") stateParam = "PROCESSING";
      else if (filter === "완료") stateParam = "COMPLETED";

      const res = await axiosInstance.get("/inquiries", {
        params: { page, size: 10, state: stateParam },
      });

      const content = res.data._embedded?.inquiryDtoList ?? [];
      setInquiries(content);
      setTotalPages(res.data.page?.totalPages ?? 1);
    } catch (err) {
      console.error("문의 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [filter, page]);

  const filtered = inquiries.filter((inq) =>
    (inq.title.includes(search) || (inq.userName?.includes(search) ?? false))
  );

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  return (
    <div className="AdminInquiries">
      <h2>📬 문의 내역</h2>

      <div className="controls">
        <div className="status-filter">
          {["전체", "처리중", "완료"].map((s) => (
            <button
              key={s}
              className={filter === s ? "active" : ""}
              onClick={() => {
                setPage(0);
                setFilter(s);
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="작성자 또는 제목 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>작성자</th>
                <th>제목</th>
                <th>카테고리</th>
                <th>상태</th>
                <th>접수 날짜</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0
                ? filtered.map((inq) => (
                    <tr key={inq.id}>
                      <td>{inq.userName || "알 수 없음"}</td>
                      <td>{inq.title}</td>
                      <td>{inq.category || "-"}</td>
                      <td
                        className={
                          inq.state === "COMPLETED" ? "completed" : "pending"
                        }
                      >
                        {inq.state === "PROCESSING" ? "처리중" : "완료"}
                      </td>
                      <td>{formatDateTime(inq.createdAt)}</td>
                    </tr>
                  ))
                : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        조회된 문의가 없습니다.
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              ◀ 이전
            </button>
            <span>
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page + 1 >= totalPages}
            >
              다음 ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminInquiries;
