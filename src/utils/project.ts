import {ProjectProp} from "../types";
import {GetProjects, Project} from "../common/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const useProject = (param: Partial<ProjectProp>) => {
    return useQuery<ProjectProp[], Error>(['project', param], () => GetProjects(param))
}
export const useEditProject = () => {
    const queryClient = useQueryClient()
    // const mutate = (param: Partial<ProjectProp>)=> Project.projectCollect(param)
    // return {
    //     mutate,
    // }
    return useMutation(
        (param: Partial<ProjectProp>) => Project.editProject(param),
        {
            //请求成功时则刷新，触发useProject
            onSuccess: () => queryClient.invalidateQueries(['project'])
        }
    )
}
export const useProjectDetails = (id?: number) => {
    return useQuery(
        ['project', id],
        () => Project.GetProjectId(id),
        {
            //id 有值时才执行
            enabled: Boolean(id)
        }
    )
}
export const useAddProject = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (param: Partial<ProjectProp>) => Project.AddProjectId(param),
        {
            //请求成功时则刷新，触发useProject
            onSuccess: () => queryClient.invalidateQueries(['project'])
        }
    )
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (param: Partial<ProjectProp>) => Project.DeleteProjectId(param),
        {
            //请求成功时则刷新，触发useProject
            onSuccess: () => queryClient.invalidateQueries(['project'])
        }
    )
};