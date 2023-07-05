import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/loadingSpinner";


export default function ImageUpload({ onClose }) {

    const [prompt, setPrompt] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setImageUrls([]);
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/getImageUrl`, {
                params: {
                    prompt: prompt,
                }
            });

            setImageUrls(response.data);
        } catch (error) {
            console.log(error);
            return;
        } finally {
            setIsLoading(false);
        }
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const handleSelectedImage = (index) => {
        setSelectedImage(index);
    }

    const [prevText, setPrevText] = useState("닫기");
    const [nextText, setNextText] = useState("다음");
    const [pageTitle, setPageTitle] = useState("책 선택");
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevPage = () => {
        switch (currentPage) {
            case 1:
                // onClose() 내부에서는 팝업 메시지를 띄워야 함
                // 그래야 전체적인 부분에서 수정 가능하게 할 수 있음
                onClose();
                break;
            case 2:
                // 1페이지로 넘어감, 책을 다시 선택하는 화면으로
                // 만약에 책을 다시 선택하면, 이미지를 재생성 해야 함
                // 돈 가성비는 진짜 안 나온다...
                setPageTitle("책 선택");
                setPrevText("닫기");
                setCurrentPage(1);
                break;
            case 3:
                // 기존에 선택된 이미지를 재생성하거나, 다시 선택할 수 있는 화면으로
                // 이동해야 함
                setPageTitle("이미지 생성");
                setNextText("다음");
                setCurrentPage(2);
                break;
            default:
                throw new Error("1, 2, 3 페이지 중 하나가 아닙니다.");
        };
    };

    const handleNextPage = () => {
        switch (currentPage) {
            case 1:
                // 2페이지로 넘어감
                // 조건 체크, 책을 선택했는가?
                setPageTitle("이미지 생성");
                setPrevText("뒤로");
                setCurrentPage(2);
                break;
            case 2:
                // 3페이지로 넘어감
                // 다음 문구를 업로드로 변경해야 함
                // 조건 체크, 이미지를 선택했는가?
                setPageTitle("새 게시물 만들기")
                setNextText("업로드");
                setCurrentPage(3);
                break;
            case 3:
                // 조건 체크, 콘텐츠를 입력했는가?
                // 업로드가 되어야 함
                break;
            default:
                throw new Error("1, 2, 3 페이지 중 하나가 아닙니다.");
        };
    };

    const [books, setBooks] = useState([]);
    useEffect(() => {
        if (currentPage !== 1 || books.length !== 0) return;

        // 데이터베이스에서 사용자가 구매한 책 정보를 가져와야 한다.
        const fetchUserBoughtBooks = async () => {
            setIsLoading(true);
            const formData = new FormData();
            // # TEMP
            // 해당 값은 사용자 별 이메일로 교체되어야 한다.
            formData.append("email", "goisak100@naver.com");
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/getUserBoughtBooks`, formData);
                setBooks(response.data);
            } catch (error) {
                console.log(error);
                return;
            } finally {
                setIsLoading(false);
            }
        }

        // 이미지와 책 이름, 저자 정보를 받아서 처리한다.
        // 일단 이미지를 위아래 나열할 수 있는 상태로 놓는다.
        // 마우스를 오버하면, 어떤 책인지 정보를 간단하게 확인할 수 있게끔 한다.
        // 선택하면, 해당 책을 선택했는지 표시를 한다.
        // 선택한 값을 조건 검사해서 다음 페이지로 넘길 지 말지를 결정한다.

        fetchUserBoughtBooks();
    }, [currentPage])

    return (
        <div>
            <div className="modal">
                <div className="overlay" onClick={onClose} />
                <div className="content">
                    <div className="navigation">
                        <span className="hover-cursor-pointer" onClick={handlePrevPage}>{prevText}</span>
                        <h3>{pageTitle}</h3>
                        <span className="hover-cursor-pointer" onClick={handleNextPage}>{nextText}</span>
                    </div>

                    {currentPage === 1 &&
                        <div>
                            {isLoading &&
                                <div className="loading-container">
                                    <LoadingSpinner />
                                </div>}
                            <div>
                                {!isLoading && books.length === 0
                                    ? <div>구매한 책 목록을 불러올 수 없습니다.</div>
                                    :
                                    <div className="books-container">
                                        {books.map((book, index) => {
                                            return (
                                                // 해당 부분은 4개, 스크롤 형식으로 바꾸어야 함
                                                <div key={index}>
                                                    <h3>제목: {book.title}</h3>
                                                    <h4>저자: {book.author}</h4>
                                                    <img src={book.thumbnail} alt={`${book.title}의 이미지입니다.`}/>
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    }
                    
                    {currentPage === 2 &&
                        <div>
                            {isLoading &&
                                <div className="loading-container">
                                    <LoadingSpinner />
                                </div>}
                            <div>
                                {imageUrls.length !== 0 &&
                                    <div className="images-container">
                                        {imageUrls.map((url, index) => {
                                            return (
                                                <div>
                                                    <div key={index}
                                                        className={selectedImage === index ? 'image-select image-wrap' : 'image-wrap'}
                                                        onClick={() => handleSelectedImage(index)}>
                                                    </div>
                                                    <img
                                                        className="image"
                                                        src={url}
                                                        alt={`AI로 생성된 ${index + 1}번째 이미지입니다`} />
                                                </div>
                                            )
                                        })}
                                    </div>}
                                <div className="main">
                                    <textarea className="textarea"
                                        placeholder="여기에 생성될 이미지와 관련한 프롬프트를 작성하세요."
                                        rows={3}
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}></textarea>
                                    <div className="buttons">
                                        <button onClick={fetchData}>생성</button>
                                        {/**테스트 용도 임시 버튼 */}
                                        <button onClick={() => setSelectedImage("testLink")}>테스트 용도 임시 버튼</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 3 &&
                        <div>

                        </div>
                    }
                </div>
            </div>
        </div >
    )
}