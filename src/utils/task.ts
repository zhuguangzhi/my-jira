import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Task, TaskType} from "../types/task";
import {KanBanSortProps} from "../types/kanban";
import {Task as TaskApi} from 'common/api'
import {ProjectProp} from "../types";

const queryKey = ['tasks']
export const useTasks = (param?: Partial<Task>) => {
    return useQuery<Task[]>(["tasks", param], () => TaskApi.GetTask(param || {}))
};
export const useTask = (id?: number) => {
    return useQuery<ProjectProp>(["task", {id}], () => TaskApi.GetTaskId({id}),
        {
            enabled: Boolean(id),
        });
};

export const useAddTask = () => {
    const queryClient = useQueryClient()

    return useMutation(
        (params: Partial<Task>) => TaskApi.AddTask(params),
        {
            onSuccess: () => queryClient.invalidateQueries(queryKey)
        }
    );
};
export const useEditTask = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (param: Partial<Task>) => TaskApi.EditTask(param),
        {
            //请求成功时则刷新，触发useProject
            onSuccess: () => queryClient.invalidateQueries(queryKey),
            // //    实现乐观更新
            // onMutate(target) {
            //     let previousItems;
            //     queryClient.setQueriesData(queryKey, (old?: Task[]) => {
            //         previousItems = old ? [...old] : []
            //         return old?.map((item) => item.id === target.id ? {...item, ...target} : item) || []
            //     })
            //     return {previousItems}
            // },
            // //错误回滚
            // onError(error, newItem, context: any) {
            //     queryClient.setQueriesData(queryKey, context.previousItems)
            // }
        }
    )
}


export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Task>) => TaskApi.DeleteTask(params),
        {
            onSuccess: () => queryClient.invalidateQueries(queryKey),
            onMutate: (target) => {
                let previousItems
                queryClient.setQueriesData(queryKey, (res?: Task[]) => {
                    previousItems = res ? res : []
                    return res?.filter(item => item.id != target.id) || []
                })
                return {previousItems}
            },
            onError(error, newItem, context: any) {
                queryClient.setQueriesData(queryKey, context.previousItems)
            }
        }
    );
};


export const useReorderTask = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (params: KanBanSortProps) => TaskApi.ReorderTask(params),
        {
            onSuccess: () => queryClient.invalidateQueries(queryKey),
            onMutate(target) {
                let previousItems
                queryClient.setQueriesData(queryKey, (res?: KanBanSortProps) => {
                    previousItems = res
                    return target || []
                })
                return {previousItems}
            },
            onError(error, newItems, context: any) {
                queryClient.setQueriesData(queryKey, context.previousItems)
            }
        })
};
export const useTaskTypes = () => {
    return useQuery<TaskType[]>(["taskTypes"], () => TaskApi.GetTaskType());
};
