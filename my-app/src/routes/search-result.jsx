import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import "../index.css";

export default function SearchResult() {

    const location = useLocation();
    const [books, setBooks] = useState([]);
    useEffect(() => {
        setBooks(location?.state?.books || []);
    }, [location]);
    
    console.log(books);

    return (
        <div>
            {books.map((book, index) => {
                return (
                    <div key={index} className="underline-container">
                        <h2>{book.title}</h2>
                        <p>{book.authors.join(", ")}</p>
                        <div className="image-container">
                            <img src={book.thumbnail} alt="Book Thumbnail" />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

// 검색하고, 해당 도서를 클릭하면, 해당 도서의 isbn을 이용해서 서버에 이미지들을 요청한다.(fetchImages)
// 해당 데이터를 가지고, 다른 페이지로 넘어간다.
// 해당 데이터를 정렬해서 출력한다. 이때 로컬에서 이미지를 처리할 때 사용자의 pc에 직접 접근하지 못한다.
// 이는 어떻게 해결할 것인가?

// 서버쪽 생각을 하자.
// spring에서는 해당 isbn을 받는다.
// isbn으로 책의 id를 조회한다.
// 조회한 책의 id로 creation_images 테이블을 조인한다.
// 조인한 결과물에서 creationImage 객체를 생성해서 해당 정보를 반환한다.
// 해당 정보를 기준으로 출력하는 코드를 작성한다.


// 여기에서 지금 spring jpa와 querydsl을 이용하려고 한다.


// 지금 여기에서 isbn을 넘긴다. 그러면, isbn을 가지고 book_id를 조회한다.

// 내가 지금 얻어야 하는 값을 creation_images에서 book_id에 해당하는 결과값