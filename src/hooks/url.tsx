import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {cleanObject} from "../utils";

export const useUrlQueryParam = <T extends string>(keys: T[]) => {
    //useSearchParams 通过.get获取地址里的参数
    const [searchParam, setSearchParam] = useSearchParams()
    return [
        //useMemo相当于计算属性
        useMemo(
            () => keys.reduce(
                (prev, key) => {
                    return {...prev, [key]: searchParam.get(key)}
                },
                {} as { [key in T]: string }
            ),
            [searchParam]
        ),
        (params: Partial<{ [key in T]: unknown }>) => {
            //Object.fromEntries 把键值对列表转换为一个对象
            const o = cleanObject({...Object.fromEntries(searchParam), ...params}) as URLSearchParamsInit
            return setSearchParam(o)
        }
    ] as const
}
export const useSearchQueryParam = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);
    return [
        useMemo(
            () => ({...param, personId: Number(param.personId) || undefined}),
            [param]
        ),
        setParam,
    ] as const;
}
export const useSetUrlSearchParam = () => {
    //useSearchParams 获取路由参数的hook
    const [searchParams, setSearchParam] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
        const o = cleanObject({
            //数组转对象
            ...Object.fromEntries(searchParams),
            ...params,
        }) as URLSearchParamsInit;
        return setSearchParam(o);
    };
};