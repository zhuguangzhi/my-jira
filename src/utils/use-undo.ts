import {useCallback, useState} from "react";

export const UseUndo = <T>(initialValue: T) => {
    const [state, setState] = useState({
        past: [] as T[],
        present: initialValue,
        future: [] as T[]
    })
    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => {
        setState((currentSate) => {
            const {past, present, future} = currentSate
            if (past.length === 0) return currentSate
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        })
    }, [])
    const redo = useCallback(() => {
        setState((currentSate) => {
            const {past, present, future} = currentSate
            if (future.length === 0) return currentSate
            const next = future[0]
            const newNext = future.splice(1)
            return {
                past: [...past, present],
                present: next,
                future: newNext
            }
        })
    }, [])
    const set = useCallback((newPresent: T) => {
        setState((currentSate) => {
            const {past, present, future} = currentSate
            if (newPresent === present) return currentSate
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        })
    }, [])
    const reset = useCallback((newPresent: T) => {
        setState({
            past: [],
            present: newPresent,
            future: []
        })
    }, [])
    return [state, {set, reset, redo, undo, canUndo, canRedo}] as const

}