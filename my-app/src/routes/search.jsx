import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "../index.css";
import ImageUpload from "../imageUpload";

export default function Search() {

    const [searchText, setSearchText] = useState("");
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();
    useEffect(() => moveToSearchResult(books, navigate), [books]);

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    // 모달 내부에서 닫을 때 닫을 건지 묻는 여부가 필요하다.
    const closeModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && modalOpen) {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [modalOpen, closeModal]);

    return (
        <div>
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <button onClick={async () => {
                setBooks(await fetchBooks(searchText))
            }}>
                검색하기
            </button>
            <button onClick={openModal}>이미지 업로드하기</button>
            {modalOpen && <ImageUpload onClose={closeModal} />}
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