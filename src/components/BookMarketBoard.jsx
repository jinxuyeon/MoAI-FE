import "./BookMarketBoard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";

const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price || 0) + " 원";
};

const BookMarketBoard = ({ type, title }) => {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async () => {
        try {
            const res = await axiosInstance.get("/api/post", {
                params: {
                    boardType: type,
                    page: 0,
                    size: 5,
                },
            });

            const postData =  res.data?.pageResponse?.posts || [];
            setPosts(postData);
        } catch (err) {
            console.error("❌ 게시글 불러오기 실패:", err);
            setPosts([]);
        }
    };

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
            <h3>{title}</h3>
            <div
                className={`info-container single ${
                    fade ? "fade-in" : "fade-out"
                }`}
            >
                <div key={currentPost.id} className="book-post">
                    <img
                        src={
                            currentPost.imageUrls ||
                            "https://via.placeholder.com/200x250?text=No+Image"
                        }
                        alt="책 이미지"
                        width={200}
                        height={250}
                    />
                    <div className="post-info">
                        <h4>{currentPost.title}</h4>
                        <p className="price">
                            {formatPrice(currentPost.price)}
                        </p>
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
                                (prev) =>
                                    (prev - 1 + posts.length) % posts.length
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
                            setCurrentIndex(
                                (prev) => (prev + 1) % posts.length
                            );
                            setFade(true);
                        }, 300);
                    }}
                >
                    ▶
                </button>
            </div>
            <Link to="/main/community/market">장터 더보기</Link>
        </section>
    );
};

export default BookMarketBoard;
