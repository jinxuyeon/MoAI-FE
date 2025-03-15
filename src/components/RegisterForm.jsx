import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import "./RegisterForm.css"
const RegisterForm = () => {

  const [formData, setFormData] = useState({ username: "",password: "", email: "", name: "" });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/member/join", formData);
      console.log("회원가입 성공:", response.data);
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert(error.response?.data?.message || "회원가입 실패");
    }
  };

  return (

    <div className="RegisterForm">
      <h2>회원가입🗒️</h2>
      <form onSubmit={handleSubmit}>

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

        <div className="form-group">
          <label className="email">이메일:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="이메일"
          />
        </div>
        

        <div className="form-group">
          <label className="name">이름:</label>
          <input
            type="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="이름"
          />
        </div>

        
        
        <button type="submit">제출</button>
      </form>
      <Link className="link-button" to={"/login"}>로그인 화면으로</Link>
    </div>



  )



}

export default RegisterForm