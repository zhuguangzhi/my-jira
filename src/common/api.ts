import http from "./http";

const apiUrl = process.env.REACT_APP_API_URL
// const http = async (url: string, option: any = {}) => {
//     const response = await fetch(url)
//     if (!response.ok) return false;
//     return await response.json()
// }
export const GetUser = () => http.get(`${apiUrl}/users`)
export const LoginApi = {
    Login: (p: { username: string, password: string | number }) => http.post(`${apiUrl}/login`, p, {"Content-Type": "application/json"}),
    Register: (p: { username: string, password: string | number }) => http.post(`${apiUrl}/register`, p, {"Content-Type": "application/json"})
}