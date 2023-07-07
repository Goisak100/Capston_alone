import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export default function MyPage() {

    // 여기에서는 원래 로그인 기반으로 아이디를 조회해야 한다.
    // 그러나 일단은, 테스트를 위함이니 페이지를 넘어갈 때 데이터를 받아서 처리한다.

    const location = useLocation();
    const email = location?.state?.email;

    
    // 해당 로직은 detail과 거의 동일하다. axios의 end-point만 약간 다르고 말이다.
    const [postings, setPostings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/getPostingsByUser`, {
                    params: {
                        email: email,
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
    }, [email]);

    if (isLoading) {
        return (
            <div>로딩 중입니다...</div>
        );
    }

    return (
        <div>
            <h1>MyPage 페이지입니다.</h1>
            {postings.length === 0
                ? <div>올린 게시글이 없습니다</div>
                : postings.map((posting, index) => {
                    console.log(`${process.env.REACT_APP_SERVER_HOST}/resources/${posting.imageUrl}`)
                    return (
                        <div key={index}>
                            <h3>제목: {posting.title}</h3>
                            
                            <img src={`${process.env.REACT_APP_SERVER_HOST}/resources/${posting.imageUrl}`} alt="AI로 생성된 이미지입니다."/>
                            <p>내용: {posting.content}</p>
                            <p>작성자: {posting.email}</p>
                            <p>좋아요: {posting.like}</p>
                        </div>
                    );
                })}
        </div>
    )
}