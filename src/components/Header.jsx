import "./Header.css"

function Header() {

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    window.location.href = "/login"
  }
  return (
    <div className="header-container">

      <h4>Dashboard</h4>
      <div className="header-space">
      <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
      
  )
}


export default Header