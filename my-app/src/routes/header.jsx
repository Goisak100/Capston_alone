
import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Heaer 페이지입니다.</h1>
            <button onClick={() => {navigate("/Capston")}}>검색</button>
            <button onClick={() => {navigate("/Capston/My-page", {
                // 해당 값은 나중에 변경되어야 한다. 
                // 토큰을 사용하든 무엇을 하든, 지금은 임시 값이다.
                state: {
                    email: "goisak100@naver.com",
                }
            })}}>마이페이지</button>
        </div>
    )   
}