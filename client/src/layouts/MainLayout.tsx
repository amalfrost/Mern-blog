import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const MainLayout = () => {
    const user = useSelector((state: RootState) => state.auth?.user)
    console.log(user)
    return (
        <>
            <NavBar user={user} />
            <Outlet />
        </>
    );
};

export default MainLayout;
