import { useState } from "react";
import "./Favorites.css";

const Favorites = () => {
    const [isOpen, setIsOpen] = useState(false);

    const sampleFavorites = [
        "자료구조 게시판",
        "인공지능 게시한",
        "스터디 게시판",
        "뽕나무 숲 게시판판",
    ];
    return (
        <div className="Favorites-Container">
            <div
                style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
                <button
                    className="Favorites-Button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                   <h4>즐겨찾기</h4> 
                </button>
            </div>

            {isOpen && (
                <ul className="Favorites-List">
                    {sampleFavorites.map((board, index) => (
                        <li key={index} className="Favorites-Item">
                            {board}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;
