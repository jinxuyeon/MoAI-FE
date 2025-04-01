import "./BookMarketBoard.css";
import { useState } from "react";

// 가격을 자동으로 원 형식으로 변환하는 함수
const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price) + " 원"; // 예: 15000 -> "15,000원"
};

const BookMarketBoard = () => {
    // 판매 중인 책 정보를 저장하는 상태 (각 게시글마다 개별 이미지 추가)
    const [posts, setPosts] = useState([
        { id: 1, title: "자료구조 책 팝니다", price: 15000, description: "깨끗하게 사용했습니다.", imgUrl: "https://image.yes24.com/goods/69750539/XL" },
       { id: 2, title: "알고리즘 책 판매", price: 18000, description: "거의 새책 상태입니다.", imgUrl: "https://www.hanbit.co.kr/data/books/B7707942187_l.jpg" },
        { id: 3, title: "컴퓨터 구조 교재", price: 12000, description: "필기 조금 있습니다.", imgUrl: "https://www.hanbit.co.kr/data/books/B9011295374_l.jpg" },
        { id: 4, title: "C++ 프로그래밍 책", price: 17000, description: "사용감 적음.", imgUrl: "https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9791156643647.jpg" }
    ]);

    return (
        <section className="BookMarketBoard">
            {/* 책 장터 제목 */}
            <h3>책 장터</h3>
            
            {/* 책 목록을 표시하는 컨테이너 */}
            <div className="info-container">
                {posts.map((post) => (
                    <div key={post.id} className="book-post">
                        {/* 각 게시글의 개별 책 이미지 200x250 고정정 */}
                        <img src={post.imgUrl} alt="책 이미지" width={200} height={250}/>
                        
                        {/* 책 정보 (제목, 가격, 설명) */}
                        <div className="post-info">
                            <h4>{post.title}</h4> {/* 책 제목 */}
                            <p className="price">{formatPrice(post.price)}</p> {/* 가격 (자동 포맷) */}
                            <p className="description">{post.description}</p> {/* 책 설명 */}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* 추가적인 게시글을 볼 수 있는 버튼 또는 링크 */}
            <div>게시글 더보기</div>
        </section>
    );
};

export default BookMarketBoard;