import http from "./http";
import {loginInfoProps, ProjectProp} from "../types";
import {Kanban, KanBanSortProps} from "../types/kanban";
import {Task as TaskProps} from "../types/task";

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
export const KanBan = {
    GetKanBan: (p: Partial<Kanban>) => http.get(`${apiUrl}/kanbans`, p),
    AddKanBan: (p: Partial<Kanban>) => http.post(`${apiUrl}/kanbans`, p),
    DeleteKanBan: (p: Partial<Kanban>) => http.delete(`${apiUrl}/kanbans/${p.id}`, p),
    ReorderKanBan: (p: Partial<KanBanSortProps>) => http.post(`${apiUrl}/kanbans/reorder`, p),
}
export const Task = {
    GetTask: (p: Partial<TaskProps>) => http.get(`${apiUrl}/tasks`, p),
    GetTaskId: (p: Partial<ProjectProp>) => http.get(`${apiUrl}/tasks/${p.id}`, {}),
    AddTask: (p: Partial<TaskProps>) => http.post(`${apiUrl}/tasks`, p),
    EditTask: (p: Partial<TaskProps>) => http.patch(`${apiUrl}/tasks/${p.id}`, p),
    DeleteTask: (p: Partial<TaskProps>) => http.delete(`${apiUrl}/tasks/${p.id}`, p),
    ReorderTask: (p: Partial<KanBanSortProps>) => http.post(`${apiUrl}/tasks/reorder`, p),
    GetTaskType: () => http.get(`${apiUrl}/taskTypes`, {})

}