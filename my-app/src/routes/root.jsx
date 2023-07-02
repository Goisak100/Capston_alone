import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export default function Root() {
    return (
        <div>
            <h1>Root 페이지입니다.</h1>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}