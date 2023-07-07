import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export default function DetailPage() {

    const location = useLocation();

    const isbn = location?.state?.isbn;

    const [postings, setPostings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isbn === undefined) return;
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/getPostingsByBook`, {
                    params: {
                        isbn: isbn,
                    }
                });
                setPostings(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();

    }, [isbn]);

    if (isLoading) {
        return (
            <div>로딩 중입니다...</div>
        )
    }

    return (
        <div>
            <h1>DetailPage 페이지입니다.</h1>
            {postings.length === 0
                ? <div>아직 작성된 게시글이 존재하지 않습니다.</div>
                : postings.map((posting, index) => {
                    return (
                        <div key={index}>
                            <h3>제목: {posting.title}</h3>
                            <img src={`${process.env.REACT_APP_SERVER_HOST}/resources/${posting.imageUrl}`}
                                alt={`${posting.title}에 대한 생성 이미지`} />
                            <p>내용: {posting.content}</p>
                            <p>작성자: {posting.email}</p>
                            <p>좋아요: {posting.like}</p>
                        </div>
                    );
                })}
        </div>
    )
}