import http from "./http";
import {loginInfoProps, ProjectProp} from "../types";

const apiUrl = process.env.REACT_APP_API_URL
// const http = async (url: string, option: any = {}) => {
//     const response = await fetch(url)
//     if (!response.ok) return false;
//     return await response.json()
// }
export const GetUser = (p: any) => http.get(`${apiUrl}/users`, p)
export const GetProjects = (p: Partial<ProjectProp>) => http.get(`${apiUrl}/projects`, p)
export const LoginApi = {
    Login: (p: loginInfoProps) => http.post(`${apiUrl}/login`, p,),
    Register: (p: loginInfoProps) => http.post(`${apiUrl}/register`, p),
    checkToken: (p: { token: string }) => http.get(`${apiUrl}/me`, p)
}
export const Project = {
    editProject: (p: Partial<ProjectProp>) => http.patch(`${apiUrl}/projects/${p.id}`, p),
    GetProjectId: (id?: number) => http.get(`${apiUrl}/projects/${id}`, {}),
    AddProjectId: (p: Partial<ProjectProp>) => http.post(`${apiUrl}/projects`, p),
    DeleteProjectId: (p: Partial<ProjectProp>) => http.delete(`${apiUrl}/projects/${p.id}`, p),
}