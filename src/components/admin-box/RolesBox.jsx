import { useState } from "react";
import "./RolesBox.css";
import axiosInstance from "../utils/AxiosInstance";

const RolesBox = () => {
  const [filters, setFilters] = useState({ username: "", name: "", role: "" });
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await axiosInstance.get("api/admin/search-users", {
        params: {
          username: filters.username || null,
          name: filters.name || null,
          role: filters.role || null,
        },
      });

      console.log("✅ 유저 응답:", res.data);
      setUsers(res.data);
      setSearched(true);
    } catch (err) {
      console.error("❌ 유저 불러오기 실패:", err);
    }
  };

  return (
    <div className="RolesBox">
      <h2>유저 권한 관리</h2>

      <form
        className="filter-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          placeholder="아이디"
          value={filters.username}
          onChange={(e) =>
            setFilters({ ...filters, username: e.target.value })
          }
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
