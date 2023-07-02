import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Heaer 페이지입니다.</h1>
            <button onClick={() => {navigate("/Capston")}}>검색</button>
            <button onClick={() => {navigate("/Capston/My-page")}}>마이페이지</button>
        </div>
    )   
}