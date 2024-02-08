export interface User {
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
}

export interface NewUser extends User {
    id: number;
    token: string;
}

export interface RegisterUser extends User {
    password: string;
    repeatPassword: string;
}

export interface UserInfo extends User {
    id: number;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface LoggedInUser extends UserInfo {
    key: string;
    user: UserInfo;
}