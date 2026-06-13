export interface UserModel {
    id: string,
    email: string
}

export interface AuthState {
    token: string | null,
    user: UserModel | null,
    isAuthenticated: boolean
}