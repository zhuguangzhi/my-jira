import {useState} from "react";

interface State<D> {
    error: Error | null
    data: D | null
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    error: null,
    data: null,
    stat: "idle"
}
export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const setData = (data: D) => setState({
        data,
        stat: "success",
        error: null
    })
    const setError = (error: Error) => setState({
        error,
        stat: "error",
        data: null
    })
    //出发异步请求
    const run = (call: Promise<D>) => {
        if (!call) throw new Error('请传入异步回调')
        setState({
            ...state,
            stat: 'loading'
        })
        return call.then(response => {
            setData(response)
            return response
        }).catch(error => {
            setError(error)
            return []
        })
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isSuccess: state.stat === 'success',
        isError: state.stat === 'error',
        run,
        setState,
        setError,
        setData,
        ...state,
    }
}
