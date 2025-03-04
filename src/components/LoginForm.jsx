import "./LoginForm.css"
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://58.238.182.100:9000/api/member/login", formData, {
        headers: {
          "Content-Type": "application/json", // 서버에 JSON 데이터 전송
        },
      });

      console.log("로그인 성공:", response.data);

      localStorage.setItem("token", response.data.token)
      alert("로그인 성공!");
      navigate("/main");

    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 실패!");
    }
  };

  return (
    <div className="LoginForm">
      <div className="container" >
        <h2>로그인</h2>
        <form  className = "form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="username">id:</label>
            <input
              type="string"
              name="username"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="id"
            />
          </div>
          <div className="form-group">
            <label className="password">비밀번호:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="비밀번호"
            />
          </div>
          <button type="submit">로그인</button>
        </form>
        <div>
          <Link className="link-button" to={"/login/register"}>회원가입</Link>
        </div>

      </div>
    </div>

  )
}


export default LoginForm