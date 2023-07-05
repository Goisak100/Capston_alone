import axios from "axios";
import { useState } from "react";

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

    // currentPage가 1이냐, 2냐, 3이냐에 따라서 다르게 렌더링하도록 switch case 작성

    // 각 페이지를 구별할 수 있는 플래그가 있어야 하나?
    // 현재 페이지를 나타내는 1, 2, 3을 기록한다.
    // 뒤로와 다음을 누를 때마다 어떤 진행 상황인지 파악해야 한다.
    // 1페이지
    // 2페이지
    // 3페이지

    // 1페이지에서는 뒤로를 누르면, 종료된다. (메시지를 띄워야 함)
    // 1페이지에서는 다음을 누르면, 책을 선택해야 한다. (선택하지 않으면, 경고)

    // 2페이지에서는 뒤로를 누르면, 1페이지로 넘어간다.
    // 2페이지에서는 다음을 누르면, 이미지를 생성하고 선택해야 한다.

    // 3페이지에서는 해당 이미지와 함께 콘텐트를 입력하고, 업로드를 할 수 있어야 한다.
    // 이때 뒤로가기를 누르면, 2페이지로 이동한다.
    // 3페이지에서는 다음 버튼이 '업로드' 버튼으로 바뀐다.

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

                        </div>
                    }

                    {currentPage === 2 &&
                        <div>
                            {isLoading &&
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
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

// 리액트의 특징을 잘 이해하고, 이를 활용하는 게 중요한 듯

// 이미지를 선택하고, 제출하는 기능이 있어야 한다.
// 선택할 때마다 로그에 링크를 띄우는 방식으로 디버깅하자.