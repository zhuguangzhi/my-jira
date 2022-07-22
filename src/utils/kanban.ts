import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Kanban, KanBanSortProps} from "types/kanban";
import {KanBan} from "../common/api";
import {reorder} from "./record";

const queryKey = ['kanbans']

export const useKanbans = (params: Partial<Kanban>) => {
    return useQuery<Kanban[], Error>(["kanbans", params], () => {
        return KanBan.GetKanBan(params)
    })
};

export const useAddKanban = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Kanban>) => KanBan.AddKanBan(params),
        {
            onSuccess: () => queryClient.invalidateQueries(queryKey)
        }
    );
};

export const useDeleteKanban = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Kanban>) => KanBan.DeleteKanBan(params),
        {
            onSuccess: () => queryClient.invalidateQueries(queryKey),
            onMutate: (target) => {
                let previousItems
                queryClient.setQueriesData(queryKey, (res?: Kanban[]) => {
                    previousItems = res ? res : []
                    return res?.filter(item => item.id != target.id) || []
                })
                return previousItems
            },
            onError(error, newItem, context: any) {
                queryClient.setQueriesData(queryKey, context.previousItems)
            }
        }
    );
};


export const useReorderKanban = () => {
    const queryClient = useQueryClient()

    return useMutation(
        (params: KanBanSortProps) => KanBan.ReorderKanBan(params),
        {
            onSuccess: () => queryClient.invalidateQueries(queryKey),
            onMutate(target) {
                let previousItems
                queryClient.setQueriesData(queryKey, (res?: Kanban[]) => {
                    previousItems = res
                    return reorder<Kanban>({...target, list: res}) as Kanban[]
                })
                return {previousItems}
            },
            onError(error, newItenms, context: any) {
                queryClient.setQueriesData(queryKey, context.previousItems)
            }
        })
};
