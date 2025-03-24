import "./BookMarketBoard.css"

const BookMarketBoard = () => {

    return (
        <section className="BookMarketBoard">
            <h5>책 장터</h5>
            <div className="info-container">
                
                <div>
                    <img src="https://image.yes24.com/goods/69750539/XL" alt="책그림" width={200} />
                </div>
                <div>
                    <img src="https://image.yes24.com/goods/69750539/XL" alt="책그림" width={200} />
                </div>
                <div>
                    <img src="https://image.yes24.com/goods/69750539/XL" alt="책그림" width={200} />
                </div>
                <div>
                    <img src="https://image.yes24.com/goods/69750539/XL" alt="책그림" width={200} />
                </div>
            </div>
            <div>게시글 더보기</div>
        </section>
    )
}

export default BookMarketBoard