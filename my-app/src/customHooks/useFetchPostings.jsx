import axios from "axios";
import { useEffect, useState } from "react";


// 일단 사용 보류
// 무한 루프에 빠지는 거 해결해야 함
// 그리고, params의 값으로 isbnParam과 같이 이름이 변경되면, 받는 측에서 이를 적절하게 처리할 수 없음

export const useFetchPostings = (endpoint, params) => {
    const [postings, setPostings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!params) return;
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_HOST}${endpoint}`, {
                    params: params
                });
                setPostings(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [params, endpoint]);

    return { postings, isLoading };
}