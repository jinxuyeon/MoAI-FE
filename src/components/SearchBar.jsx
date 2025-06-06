import "./SearchBar.css";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("title");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch({ filter, query });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="SearchBar">
            <div className="select-input-contianer">
                <select className="search-filter" value={filter} onChange={handleFilterChange}>
                    <option value="title">제목</option>
                    <option value="writer">작성자</option>
                </select>
                <input
                    type="text"
                    className="search-input"
                    placeholder="검색어를 입력하세요"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button className="search-button" onClick={handleSearch}>
                검색
            </button>
        </div>
    );
};

export default SearchBar;
