export interface IRegisterForm {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
}

export interface ILoginForm {
    username: string;
    password: string;
}

export type FnIsValidRegister = (form: IRegisterForm) => boolean;

export type FnIsValidLogin = (form: ILoginForm) => boolean;