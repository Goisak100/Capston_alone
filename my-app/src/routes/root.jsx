import axios from "axios";
import { useEffect, useState } from "react"

export default function Root() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/test`);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <h1>Root 페이지입니다.</h1>
            <h3>서버에서 받은 데이터베이스
                {data.map(item => {
                    return (
                      <ul key={item.id}>
                        <li>이름: {item.name}</li>
                        <li>나이: {item.age}</li>
                      </ul>  
                    );
                })}
            </h3>
        </div>
    )
}