import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {projectListActions} from "../store/module/project-list.slice";
import {AnyAction} from "@reduxjs/toolkit";

//页面挂载时执行
export const useMount = (call: () => void) => {
    useEffect(call, [])
}
//异步Effect
export const useAsyncEffect = (effect: () => Promise<void | (() => void)>, dependencies?: any[]) => {
    return useEffect(() => {
        const cleanupPromise = effect()
        return () => {
            cleanupPromise.then(cleanup => cleanup && cleanup())
        }
    }, dependencies)
}
//节流
export const useDebounce = <T>(value: T, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debounceValue
}
//页面改变标题
export const useDocumentTitle = (title: string, keepDocument = true) => {
    //useRef保存初始状态值，后续不会更新
    const oldTitle = useRef(document.title).current
    //title改变时
    useEffect(() => {
        document.title = title
    }, [title])
//    页面卸载时
    useEffect(() => {
        return () => {
            document.title = oldTitle
        }
    }, [])
}
//打开或关闭model
export const useControlPopoverModel = (type: "open" | "close") => {
    const disPatch = useDispatch()
    let payload: () => AnyAction;
    if (type === 'open') payload = projectListActions.openProjectModel
    else payload = projectListActions.closeProjectModel
    return useCallback(() => disPatch(payload()), [disPatch, payload])
}
