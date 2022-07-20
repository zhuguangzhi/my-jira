import {GetUser} from "../common/api";
import {useQuery} from "@tanstack/react-query";
import {UserProp} from "../types";

export const useUser = (param?: Partial<UserProp>) => {
    return useQuery<UserProp[], Error>(['user', param], () => GetUser({param}))
}