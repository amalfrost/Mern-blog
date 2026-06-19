import { useDispatch } from "react-redux"
import type { NavBarModel } from "../../models/userModel"
import { logout } from "../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { SiBloglovin } from "react-icons/si";


const NavBar = ({ user }: NavBarModel) => {
    // const currentUser = user



    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        dispatch(logout())

    }
    return (
        <div className='bg-gray-100 border-b-2 border-blue-400 h-10 flex justify-between px-4 items-center  ' >
            <div className="text-[#4f46ef] font-bold text-2xl flex items-center gap-2" > <span className="text-2xl text-white bg-[#4f46ef] border-2 border-[#4f46ef] rounded-tr-lg rounded-br-lg  " ><SiBloglovin /></span > Bloggy</div>
            <div className="flex gap-4 items-center ">
                <p className="cursor-pointer capitalize " > {user?.userName ? user.userName : <button className="cursor-pointer  rounded text-blue-500 font-bold " onClick={() => navigate("/login")} >Login</button>}</p>
                {user && user.userName && <button className="cursor-pointer text-[#4f46ef]  font-semibold "
                    onClick={handleLogout}
                >Logout</button>}
            </div>
        </div>
    )
}

export default NavBar