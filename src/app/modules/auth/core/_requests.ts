import axios from "axios";
import {AuthModel, UserModel} from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `https://www.satariz.com/api/v1/admin/auth/login`;
export const CONTROL_CODE_URL = `https://www.satariz.com/api/v1/admin/auth/check-login-code`;
export const BASE_URI = `https://www.satariz.com/api/v1/admin/`;
export const GET_USER_DATA = BASE_URI + `auth/me`;

// Server should return AuthModel
export function login(phone: string) {
    return axios.post<AuthModel>(LOGIN_URL, {
        phone
    });
}

export function getUserByToken(phone: string, code: string) {
    return axios.post(CONTROL_CODE_URL, {
        phone: phone,
        code: code,
    });
}

export function getUserData(token: string) {
    return axios.get(GET_USER_DATA, {
        headers: {
            'Authorization': `Bearer ${token}`, // Bearer token ekleniyor
        }
    });
}