import { FnIsValidLogin, FnIsValidRegister } from "@/lib/types"

export function isValidEmail(email: string): { message: string, isValid: boolean } {
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        return {
            message: 'Invalid email',
            isValid: false
        }
    } else {
        return {
            message: '',
            isValid: true
        }
    }
}

export function isValidUsername(username: string): { message: string, isValid: boolean } {
    if (!(/^[a-zA-Z0-9_]{3,16}$/.test(username))) {
        return {
            message: 'Username must be between 3 and 16 characters long and can only contain letters, numbers, and underscores',
            isValid: false
        }
    } else {
        return {
            message: '',
            isValid: true
        }
    }
}

export function isValidPassword(password: string): { message: string, isValid: boolean } {
    if (!(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))) {
        return {
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
            isValid: false
        }
    } else {
        return {
            message: '',
            isValid: true
        }
    }
}

export function isValidConfirmPassword(password: string, confirmPassword: string): { message: string, isValid: boolean } {
    if (password !== confirmPassword) {
        return {
            message: 'Passwords do not match',
            isValid: false
        }
    } else {
        return {
            message: '',
            isValid: true
        }
    }
}

export const isValidLoginForm: FnIsValidLogin = ({ username, password }) => {
    if (isValidUsername(username).isValid && isValidPassword(password).isValid) {
        return true;
    }
    return false;
}

export const isValidRegisterForm: FnIsValidRegister = ({ email, username, password, repeatPassword }) => {
    if (
        isValidEmail(email).isValid &&
        isValidUsername(username).isValid &&
        isValidPassword(password).isValid &&
        isValidConfirmPassword(password, repeatPassword).isValid
    ) {
        return true;
    }
    return false;
}