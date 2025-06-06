import "./BookMarketBoard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price || 0) + " 원";
};

const BookMarketBoard = ({ type, title, posts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    posts.length > 0 ? (prevIndex + 1) % posts.length : 0
                );
                setFade(true);
            }, 500);
        }, 8000);

        return () => clearInterval(intervalId);
    }, [posts.length]);

    if (posts.length === 0) {
        return (
            <section className="BookMarketBoard">
                <h3>{title}</h3>
                <p>게시물이 없습니다.</p>
            </section>
        );
    }

    const currentPost = posts[currentIndex];

    return (
        <section className="BookMarketBoard">
            <Link to={`/main/community/${type.toLowerCase()}`} className="more-link">
                <h4 className="title">{title}</h4>
            </Link>

            <div className={`info-container single ${fade ? "fade-in" : "fade-out"}`}>
                <div key={currentPost.id} className="book-post">
                    <img
                        src={currentPost.thumbNailUrl || "/icons/no-img-text.png"}
                        alt="책 이미지"
                        style={{ width: 200, height: 250, objectFit: "cover", borderRadius: 8 }}
                    />
                    <div className="post-info">
                        <h4>{currentPost.title}</h4>
                        <p className="price">{formatPrice(currentPost.price)}</p>
                        <div className="meta-info">
                            <span className="writer">{currentPost.writerNickname}</span>
                            <span className="date">{currentPost.createdDate?.slice(0, 10)}</span>
                            <span className="comments">댓글: {currentPost.commentCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="nav-button-group">
                <button
                    className="mini-button"
                    onClick={() => {
                        setFade(false);
                        setTimeout(() => {
                            setCurrentIndex(
                                (prev) => (prev - 1 + posts.length) % posts.length
                            );
                            setFade(true);
                        }, 300);
                    }}
                >
                    ◀
                </button>

                <button
                    className="mini-button"
                    onClick={() => {
                        setFade(false);
                        setTimeout(() => {
                            setCurrentIndex((prev) => (prev + 1) % posts.length);
                            setFade(true);
                        }, 300);
                    }}
                >
                    ▶
                </button>
            </div>
        </section>
    );
};

export default BookMarketBoard;
