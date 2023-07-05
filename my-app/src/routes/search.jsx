import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Search() {

    const [searchText, setSearchText] = useState("");
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();
    useEffect(() => moveToSearchResult(books, navigate), [books]);

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

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

    const [prompt, setPrompt] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setImageUrl("");
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/getImageUrl`, {
                params: {
                    prompt: prompt,
                }
            });
            setImageUrl(response.data);
        } catch (error) {
            console.log(error);
            return;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <button onClick={async () => {
                setBooks(await fetchBooks(searchText))
            }}>
                검색하기
            </button>
            {/**이미지 업로드 팝업 관련 부분, 컴포넌트로 추출하면 좋음 */}
            <button onClick={openModal}>이미지 업로드하기</button>
            {modalOpen && (
                <div className="modal">
                    <div className="overlay" onClick={closeModal} />
                    <div className="content">
                        {isLoading &&
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                            </div>}
                        {imageUrl && <img className="image" src={imageUrl} alt="AI로 생성된 이미지입니다." />}
                        <div className="main">
                            <textarea className="textarea"
                                placeholder="여기에 생성될 이미지와 관련한 프롬프트를 작성하세요."
                                rows={3}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}></textarea>
                            <div className="buttons">
                                <button onClick={fetchData}>생성</button>
                                <button onClick={closeModal}>팝업 닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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