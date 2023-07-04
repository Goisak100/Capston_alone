import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export default function DetailPage() {

    const location = useLocation();

    const isbn = location?.state?.isbn;

    const [postings, setPostings] = useState([]);

    useEffect(() => {
        if (isbn === undefined) return;
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
            }
        }

        fetchData();

    }, [isbn]);

    return (
        <div>
            <h1>DetailPage 페이지입니다.</h1>
            {postings.length === 0
                ? <div>아직 작성된 게시글이 존재하지 않습니다.</div>
                : postings.map((posting, index) => {
                    return (
                        <div key={index}>
                            <h3>제목: {posting.title}</h3>
                            <p>사진: {posting.imageUrl}</p>
                            <p>내용: {posting.content}</p>
                            <p>작성자: {posting.email}</p>
                        </div>
                    );
                })} 
        </div>
    )
}