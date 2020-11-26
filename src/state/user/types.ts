import { Status } from "../../globals";

export type UserState = {
    loggedIn: boolean;
    loading: boolean;
    confirmed: boolean;
    currentUser?: User;
    error?: UserErrorTypes;
    success?: UserSuccessTypes;
};

export type Token = {
    access_token: string;
    expires_in: number;
    id_token?: number;
    refresh_expires_in: number;
    refresh_token: string;
    scope: string;
    session_state: string;
    token_type: string;
};

export type User = {
    userId?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    status?: Status;
    token?: Token;
};

export enum UserErrorTypes {
    USER_EXIST = 'USER_EXIST',
    USER_NOT_EXIST = 'USER_NOT_EXIST',
    INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
    FIELD_NULL = 'FIELD_NULL',
    BAD_EMAIL = 'BAD_EMAIL',
    BAD_PHONE_NUMBER = 'BAD_PHONE_NUMBER',
    BAD_CONFIRMATION = 'BAD_CONFIRMATION',
    EMAIL_NOT_CONFIRMED = 'EMAIL_NOT_CONFIRMED',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    EMAIL_EXIST = 'EMAIL_EXIST'
}

export enum UserSuccessTypes {
    USER_CREATED = 'USER_CREATED',
    USER_LOGGED_IN = 'USER_LOGGED_IN',
    USER_CONFIRMED = 'USER_CONFIRMED',
    FORGOT_EMAIL = 'FORGOT_EMAIL',
    STATUS_CHANGE = 'STATUS_CHANGE'
}
