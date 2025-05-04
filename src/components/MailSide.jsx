import "./MailSide.css";

const MailSide = ({ friends, selectedFriend, setSelectedFriend }) => {
    return (
        <div className="MailSide">

            <button className="add-chat-button" onClick={() => console.log("대화 추가하기 클릭됨")}>
                + 대화 추가하기
            </button>

            <p>나의 채팅방</p>

            {friends.map((friend, idx) => (
                <button
                    key={idx}
                    className={`friend-button ${selectedFriend === friend ? "selected" : ""}`}
                    onClick={() => setSelectedFriend(friend)}
                >
                    {friend}
                </button>
            ))}


        </div>
    );
};

export default MailSide;
