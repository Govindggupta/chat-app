import { isValidUsername, isValidEmail } from "6pp";

export const usernameValidator = (username: string): { isValid: boolean; errorMessage: string; } => {
    if (!isValidUsername(username)) {
        return { isValid: false, errorMessage: "Username must be 3-16 characters long and can only contain letters, numbers" };
    }
    return { isValid: true, errorMessage: "" };
};

export const fullNameValidator = (fullName: string): { isValid: boolean; errorMessage: string; } => {
    if (!fullName || fullName.trim() === '') {
        return { isValid: false, errorMessage: "Full name is required" };
    }
    if (fullName.length < 2 || fullName.length > 50) {
        return { isValid: false, errorMessage: "Full name must be between 2 and 50 characters" };
    }
    return { isValid: true, errorMessage: "" };
};

export const emailValidator = (email: string): { isValid: boolean; errorMessage: string; } => {
    if (!email || email.trim() === '') {
        return { isValid: false, errorMessage: "Email is required" };
    }
    if (!isValidEmail(email)) {
        return { isValid: false, errorMessage: "Please enter a valid email address" };
    }
    return { isValid: true, errorMessage: "" };
};