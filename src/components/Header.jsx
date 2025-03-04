import "./Header.css"

function Header() {

  const handleLogout = ()=>{
    localStorage.removeItem("token")

    window.location.href = "/login"
  }
  return (
    <div className="header-container">
      <div className="title">Dashboard</div>
      <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
    </div>
      
  )
}


export default Header