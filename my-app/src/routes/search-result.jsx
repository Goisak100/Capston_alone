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

// 검색하고, 해당 도서를 클릭하면, 해당 도서의 isbn을 이용해서 서버에 이미지들을 요청한다.(fetchImages)
// 해당 데이터를 가지고, 다른 페이지로 넘어간다.
// 해당 데이터를 정렬해서 출력한다. 이때 로컬에서 이미지를 처리할 때 사용자의 pc에 직접 접근하지 못한다.
// 이는 어떻게 해결할 것인가?


// 이걸 해주면, 무엇이 좋나?
// isbn으로 책을 검색한 다음에, 해당 책에서 postings를 가져와서 반환하면 된다.
// 이때, 필요한 값들을 튜플에 담아서 반환하면 된다.

// 프롬프트를 기반으로 이미지를 생성해서 저장한다.
// 사용자에게 보여주는 값들은 타이틀, 이미지, 컨텐트, 작성자 이메일이다.

// isbn을 가지고, book을 가지고 오고, 그에 맞는 postings를 반환하는 코드를 작성해보자.
// 지금 당장 querydsl을 사용할 필요가 있는가? 있다. 지금, 원하는 값만 가져오려면 그렇게 해야 한다.