import { useDispatch } from "react-redux"
import api from "../api/axios"
import { logout, setCredentials } from "../features/auth/authSlice"

export const validateUser = async () => {
    const dispatch = useDispatch()
    try {
        const response = await api.get('/auth/me')
        dispatch(setCredentials(response))
    } catch (err) {
        console.log(err)
        dispatch(logout())
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
    }
}