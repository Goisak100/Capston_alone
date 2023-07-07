import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/loadingSpinner";


export default function ImageUpload({ onClose }) {

    const [prompt, setPrompt] = useState("");
    const [content, setContent] = useState("");
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

    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState("");
    const handleSelectedImage = (e, index) => {
        setSelectedImageIndex(index);
        setSelectedImageUrl(e.target.src);
    }

    const [selectedBookIndex, setSelectedBookIndex] = useState(null);
    const [selectedBook, setSelectedBook] = useState({});
    const handleSelectedBook = (index) => {
        setSelectedBookIndex(index);
        setSelectedBook(books[index]);
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
                if (Object.keys(selectedBook).length === 0) {
                    alert("책을 선택해 주세요.");
                    return;
                }
                setPageTitle("이미지 생성");
                setPrevText("뒤로");
                setCurrentPage(2);
                break;
            case 2:
                // 3페이지로 넘어감
                // 다음 문구를 업로드로 변경해야 함
                // 조건 체크, 이미지를 선택했는가?
                if (selectedImageUrl === "") {
                    alert("이미지를 선택해 주세요.");
                    return;
                }
                setPageTitle("새 게시물 만들기")
                setNextText("업로드");
                setCurrentPage(3);
                break;
            case 3:
                // 조건 체크, 콘텐츠를 입력했는가?
                // 업로드가 되어야 함
                if (content === "") {
                    alert("내용을 입력해 주세요.");
                    return;
                }
                const uploadPosting = async () => {
                    setIsLoading(true);

                    try {
                        await axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/uploadPosting`, {
                            email: "goisak100@naver.com",
                            isbn: selectedBook.isbn,
                            imageUrl: selectedImageUrl,
                            prompt: prompt,
                            content: content,
                        });
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setIsLoading(false);
                    }
                }

                uploadPosting();
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
                                                <div className="book-container" key={index}>
                                                    <div className={selectedBookIndex === index ? 'book-select' : ''} />
                                                    <img className="book"
                                                        onClick={() => handleSelectedBook(index)}
                                                        src={book.thumbnail} alt={`${book.title}의 이미지입니다.`} />
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
                                                <div className="image-container" key={index}>
                                                    <div className={selectedImageIndex === index ? 'image-select' : ''} />
                                                    <img className="image"
                                                        onClick={(e) => handleSelectedImage(e, index)}
                                                        src={url}
                                                        alt={`AI로 생성된 ${index + 1}번째 이미지`} />
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
                                        <button onClick={() => setSelectedImageUrl("test")}>테스트 용도 임시 버튼</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 3 &&
                        <div className="main">
                            <textarea className="textarea"
                                rows={5}
                                placeholder="여기에 게시물과 관련된 내용을 작성하세요."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                    }

                    {currentPage === 4 &&
                        <div>
                            {isLoading &&
                                <div>
                                    <LoadingSpinner />
                                </div>}
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}


// 이미지 업로드하기에서 책을 선택했을 때 해당 책에서 isbn을 추출해야 한다.
// 그 다음에는 책을 선택되게 만들어야 한다.
// 책을 선택하기 전에는 제출되지 않게 해야 한다.


// 해당 책을 선택하고, 다음으로 넘어갔을 때 선택한 책이 보여야 한다.
// 해당 책을 기반으로, 이미지 생성
// 이때도 다음으로 넘어가려면, 특정 검사를 조건해야 한다.


// 3페이지에서 콘텐츠를 입력한다.
// 콘텐츠를 입력하고, 업로드를 누르면, 업로드가 되어야 한다.
// 해당 부분은 switch 문에서 적절하게 업로드하는 axios를 호출한다.
// formData로 만들어서 post하면 될 듯, 그리고, 해당 부분을 서버에서 받아서 처리해야 한다.

// 이미지를 url로 받고, 해당 url을 적절하게 수정해서 리소스로 만들고, 해당 리소스를 저장한다.
// 저장할 때 local과 서버에서 다르게 처리하면, 좋긴 하다.
// 이미지를 저장한 다음에, DB에도 저장한다. 해당 과정은 Transaction으로 처리한다.
// 여기에서 트랜잭션이 실패하면, 이미지를 삭제하게끔 해야 한다.
// 또한 이미지를 저장할 때 고유한 이름을 생성할 수 있도록 해야 한다.


// DB처리까지 끝내면, 이미지 업로드 완료라는 화면을 띄운다. (이거 4페이지를 만들어서, 처리해야 겠네.)
// 4페이지에서는 그냥 나가지면 되고, 1~3페이지까지는 나가기 전 경고를 확인하면 된다.

// 이 상태가 되면, 업로드한 이미지를 마이 페이지에서 확인도 할 수 있어야 하고,
// 검색했을 때도 확인할 수 있어야 한다.

// 그리고, 전체적인 UI를 간단하게 꾸민다. 언제까지? 내일까지.


// 위에서부터 하나씩 처리하고, 차분한 마음을 갖고 하도록 하자.
// 끈기를 가지고, 하나씩 해결하는 능력을 키우는 거다.
// 문제해결능력을 기르기 위해서 혼자 힘으로 하도록 노력한다.
// 안 되는 거 같으면, 왜 안 되는지, 내가 모르는 것인지, 아니면 아는 데 하기 귀찮은 것인지르 파악하자.

// 경험이 누적되면, 다음 번에 어떤 행동을 할 때 실수하는 것을 줄일 수가 있다. 지금 경험을 누적하도록 하자.