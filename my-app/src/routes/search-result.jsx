import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"

export default function SearchResult() {

    const location = useLocation();
    const [books, setBooks] = useState([]);
    useEffect(() => {
        setBooks(location?.state?.books || []);
    }, [location]);

    return (
        <div>
            <h1>SearchResult 페이지입니다.</h1>
            {books.map((book, index) => {
                return (
                    <div key={index}>
                        <h2>{book.title}</h2>
                        <p>{book.authors.join(", ")}</p>
                        <img src={book.thumbnail} />
                    </div>
                );
            })}
        </div>
    )
}