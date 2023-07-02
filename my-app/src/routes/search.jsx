import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Search() {

    const [searchText, setSearchText] = useState("");
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();
    useEffect(() => moveToSearchResult(books, navigate), [books]);

    // react에서 코드를 읽을 때는 setBooks가 호출되었을 때 useEffect 코드를 확인해야 한다.
    return (
        <div>
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <button onClick={async () => {
                setBooks(await fetchBooks(searchText))
            }}>
                검색하기
            </button>
            <button>이미지 업로드하기</button>
        </div>
    )
}

async function fetchBooks(searchText) {
    try {
        const response = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
            params: {
                query: searchText,
            },
            headers: {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
            }
        });

        return response.data.documents;

    } catch (error) {
        console.log(error);
        return [];
    }
}

function moveToSearchResult(books, navigate) {
    if (books.length <= 0) {
        return;
    }
    navigate("/Capston/Search-result", {
        state: {
            books: books,
        }
    });
}