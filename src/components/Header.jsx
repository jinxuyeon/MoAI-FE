import "./Header.css"

function Header() {

  const handleLogout = ()=>{
    localStorage.removeItem("token")

    window.location.href = "/login"
  }
  return (
    <div className="Header">
      <div>헤더더</div>
      <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
    </div>
      
  )
}


export default Header