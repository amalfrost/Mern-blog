export interface UserModel {
    email: string,
    password: string
    userName?: string
}

export interface NavBarModel {
    user: UserModel
}