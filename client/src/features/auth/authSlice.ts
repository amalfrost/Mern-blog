import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./authModel";
const storedUser = localStorage.getItem("userData")
const token = localStorage.getItem("token")

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: token ?? null,
    isAuthenticated: !!token
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user,
                state.token = action.payload.token,
                state.isAuthenticated = true

        },
        logout: (state) => {
            state.user = null,
                state.token = null,
                state.isAuthenticated = false
        }
    }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer