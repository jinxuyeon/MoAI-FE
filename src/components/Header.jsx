import "./Header.css"

function Header({title}) {

  const handleLogout = ()=>{
    //localStorage.removeItem("accessToken")
    //localStorage.removeItem("refreshToken")
    localStorage.clear()
    window.location.href = "/login"
  }
  return (
    <div className="header-container">

      <h2 style={{marginLeft:"28px"}}>{title}</h2>
      <div className="header-space">
      <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
      </div>
    </div>  
  )
}


export default Header