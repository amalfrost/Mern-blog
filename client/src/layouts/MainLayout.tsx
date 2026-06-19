import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const MainLayout = () => {
    const user = useSelector((state: RootState) => state.auth?.user)
    return (
        <>
            {/* TODO: load images first then   */}
            {/* TODO: fix issue with the login and lgout bug  */}
            <NavBar user={user} />
            <Outlet />
        </>
    );
};

export default MainLayout;
