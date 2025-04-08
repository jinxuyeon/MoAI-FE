import "./BookMarketBoard.css";
import { useState, useRef } from "react";

// 가격을 자동으로 한국 원(KRW) 형식으로 변환하는 함수
const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + "원"; // 예: 15000 -> "15,000원"
};

const BookMarketBoard = () => {
    const [posts] = useState([
        { id: 1, title: "자료구조 책 팝니다", price: 15000, description: "깨끗하게 사용했습니다.", imgUrl: "https://image.yes24.com/goods/69750539/XL" },
        { id: 2, title: "알고리즘 책 판매", price: 18000, description: "거의 새책 상태입니다.", imgUrl: "https://image.yes24.com/goods/74419916/XL" },
        { id: 3, title: "컴퓨터 구조 교재", price: 12000, description: "필기 조금 있습니다.", imgUrl: "https://image.yes24.com/goods/92573699/XL" },
        { id: 4, title: "C++ 프로그래밍 책", price: 17000, description: "사용감 적음.", imgUrl: "https://image.yes24.com/goods/104332174/XL" },
        { id: 5, title: "운영체제 책 판매", price: 20000, description: "새 책입니다.", imgUrl: "https://image.yes24.com/goods/73170728/XL" },
        { id: 6, title: "자료구조 책 팝니다", price: 15000, description: "깨끗하게 사용했습니다.", imgUrl: "https://image.yes24.com/goods/69750539/XL" },
        { id: 7, title: "알고리즘 책 판매", price: 18000, description: "거의 새책 상태입니다.", imgUrl: "https://image.yes24.com/goods/74419916/XL" },
        { id: 8, title: "컴퓨터 구조 교재", price: 12000, description: "필기 조금 있습니다.", imgUrl: "https://image.yes24.com/goods/92573699/XL" },
        { id: 9, title: "C++ 프로그래밍 책", price: 17000, description: "사용감 적음.", imgUrl: "https://image.yes24.com/goods/104332174/XL" },
        { id: 10, title: "운영체제 책 판매", price: 20000, description: "새 책입니다.", imgUrl: "https://image.yes24.com/goods/73170728/XL" }
    ]);

    const scrollRef = useRef(null);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="BookMarketBoard">
            <h3>책 장터</h3>

            <div className="scroll-btn-container">
                <button className="scroll-btn left" onClick={() => handleScroll("left")}>&lt;</button>
                <button className="scroll-btn right" onClick={() => handleScroll("right")}>&gt;</button>
            </div>

            {/* 책 목록을 표시하는 컨테이너 */}
            <div className="info-container no-select" ref={scrollRef}>
                {posts.map((post) => (
                    <div key={post.id} className="book-post">
                        <img src={post.imgUrl} alt="책 이미지" className="book-image" width={200} height={250} />
                        <div className="post-info">
                            <h4>{post.title}</h4>
                            <p className="price">{formatPrice(post.price)}</p>
                            <p className="description">{post.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>게시글 더보기</div>
        </section>
    );
};

export default BookMarketBoard;
