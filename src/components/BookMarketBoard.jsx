import "./BookMarketBoard.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + " 원";
};

const BookMarketBoard = () => {
    const [posts] = useState([
        { id: 1, title: "자료구조 책 팝니다", price: 15000, description: "깨끗하게 사용했습니다.", imgUrl: "https://image.yes24.com/goods/69750539/XL" },
        { id: 2, title: "알고리즘 책 판매", price: 18000, description: "거의 새책 상태입니다.", imgUrl: "https://www.hanbit.co.kr/data/books/B7707942187_l.jpg" },
        { id: 3, title: "컴퓨터 구조 교재", price: 12000, description: "필기 조금 있습니다.", imgUrl: "https://www.hanbit.co.kr/data/books/B9011295374_l.jpg" },
        { id: 4, title: "C++ 프로그래밍 책", price: 17000, description: "사용감 적음.", imgUrl: "https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791156643647.jpg" }
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(false); // 먼저 투명하게

            setTimeout(() => {
                // 데이터 전환
                setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
                setFade(true); // 다시 나타나게
            }, 500); // 0.5초 후 다음 책
        }, 8000);

        return () => clearInterval(intervalId);
    }, [posts.length]);

    const currentPost = posts[currentIndex];

    return (
        <section className="BookMarketBoard">
            <h3>책 장터</h3>
            <div className={`info-container single ${fade ? "fade-in" : "fade-out"}`}>
                <div key={currentPost.id} className="book-post">
                    <img src={currentPost.imgUrl} alt="책 이미지" width={200} height={250} />
                    <div className="post-info">
                        <h4>{currentPost.title}</h4>
                        <p className="price">{formatPrice(currentPost.price)}</p>
                        <p className="description">{currentPost.description}</p>
                    </div>
                </div>
            </div>
            <div className="nav-button-group">
                <button className="mini-button" onClick={() => {
                    setFade(false);
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
                        setFade(true);
                    }, 300);
                }}>◀</button>

                <button className="mini-button" onClick={() => {
                    setFade(false);
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev + 1) % posts.length);
                        setFade(true);
                    }, 300);
                }}>▶</button>
            </div>
            <Link to={"/main/community/market"}>장터 더보기</Link>
        </section>
    );
};

export default BookMarketBoard;
