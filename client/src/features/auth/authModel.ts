export interface UserModel {
    id: string,
    email: string
    userName?: string
}

export interface AuthState {
    token: string | null,
    user: UserModel | null,
    isAuthenticated: boolean
}

export interface RegisterResponse {
    token: string,
    user: UserModel
}