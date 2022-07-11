import {useEffect, useState} from "react";

//页面挂载时执行
export const useMount = (call: () => void) => {
    useEffect(call, [])
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