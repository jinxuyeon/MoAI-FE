import "./ProfileTemplate.css"
const ProfileTemplate = ({profileImageUrl, name}) => {
    return (
        <div className="ProfileTemplate">
            <div className="search-result-profile">
                <img
                    src={profileImageUrl || "/default-profile.png"}
                    alt="프로필"
                    className="profile-img"
                />
                <span>{name}</span>
            </div>
        </div>
    )

}

export default ProfileTemplate