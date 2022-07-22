import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Epic} from "../types/epic";
import {EpicApi} from "../common/api";

const queryKey = ['Epics']

export const useEpic = (params?: Partial<Epic>) => {
    return useQuery<Epic[], Error>(["Epics", params], () => {
        return EpicApi.GetEpic(params)
    })
};

export const useAddEpic = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Epic>) => EpicApi.AddEpic(params),
        {
            onSuccess: () => queryClient.invalidateQueries(queryKey)
        }
    );
};

export const useDeleteEpic = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Epic>) => EpicApi.DeleteEpic(params),
        {
            onSuccess: () => queryClient.invalidateQueries(queryKey),
            onMutate: (target) => {
                let previousItems
                queryClient.setQueriesData(queryKey, (res?: Epic[]) => {
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

