import "./LoginForm.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./utils/authService";
const LoginForm = ({setIsAuthenticated}) => {
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
      const response = await loginUser(formData); 
  
      if (response.status === 200) {
        console.log("로그인 성공:", response.data);
  
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

  
        alert("로그인 성공!");
        setIsAuthenticated(true);
        navigate("/main");
      } else {
        console.log(response.data);
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("로그인 실패!");
    }
  };

  return (
    <div className="LoginForm">
      <div className="container" >
        <h2>로그인</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="username">id:</label>
            <input
              type="string"
              name="username"
              value={formData.username}
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