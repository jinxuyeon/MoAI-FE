import { useState } from "react";
import "./RolesBox.css";

const dummyUsers = [
  { id: "u001", name: "홍길동", email: "hong@example.com", role: "STUDENT" },
  { id: "u002", name: "김철수", email: "kim@prof.com", role: "PROF" },
  { id: "u003", name: "이영희", email: "lee@manager.com", role: "MANAGER" },
  { id: "u004", name: "최지훈", email: "choi@student.com", role: "STUDENT" },
];

const RolesBox = () => {
  const [filters, setFilters] = useState({ id: "", name: "", role: "USER" });
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
  try {
    const res = await axiosInstance.get("api/admin/users", {
      params: {
        id: filters.id || null,
        name: filters.name || null,
        role: filters.role || null,
      },
    });

    console.log("✅ 유저 응답:", res.data);
    setUsers(res.data);
  } catch (err) {
    console.error("❌ 유저 불러오기 실패:", err);
  }
};

  return (
    <div className="RolesBox">
      <h2>유저 권한 관리</h2>

      <form className="filter-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="아이디"
          value={filters.id}
          onChange={(e) => setFilters({ ...filters, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="이름"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <select
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">전체 권한</option>
          <option value="STUDENT">STUDENT</option>
          <option value="PROF">PROF</option>
          <option value="MANAGER">MANAGER</option>
        </select>
        <button type="submit">검색</button>
      </form>

      {searched && users.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>현재 권한</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {searched && users.length === 0 && <p>검색 결과 없음</p>}
    </div>
  );
};

export default RolesBox;
