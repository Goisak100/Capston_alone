import axios from "axios";
import { useEffect, useState } from "react"

export default function Root() {

    const [data, setData] = useState("");
    
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
            <h3>서버에서 받은 문자열: {data}</h3>
        </div>
    )
}