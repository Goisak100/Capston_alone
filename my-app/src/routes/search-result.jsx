import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import "../index.css";

export default function SearchResult() {

    const location = useLocation();
    const [books, setBooks] = useState([]);
    useEffect(() => {
        setBooks(location?.state?.books || []);
    }, [location]);
    
    console.log(books);

    const navigate = useNavigate();
    function handleClickNivigateToDetailPage(isbn) {
        navigate("/Capston/Detail-page", {
            state: {
                isbn: isbn,
            }
        })
    }

    return (
        <div>
            {books.map((book, index) => {
                const isbn = book.isbn.split(" ")[1];
                return (
                    <div key={index} className="underline-container">
                        <h2 onClick={() => handleClickNivigateToDetailPage(isbn)}>{book.title}</h2>
                        <p onClick={() => handleClickNivigateToDetailPage(isbn)}>{book.authors.join(", ")}</p>
                        <div className="image-container">
                            <img src={book.thumbnail} onClick={() => handleClickNivigateToDetailPage(isbn)} alt="Book Thumbnail"/>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}