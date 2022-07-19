import {useCallback, useReducer} from "react";

const UNDO = "undo"
const REDO = "redo"
const SET = "set"
const RESET = "reset"

interface StateProp<T> {
    past: T[],
    present: T,
    future: T[]
}

interface ActionProps<T> {
    newPresent?: T,
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}

const undoReducer = <T>(state: StateProp<T>, action: ActionProps<T>) => {
    const {present, past, future} = state
    const {newPresent, type} = action

    switch (type) {
        case UNDO: {
            if (past.length === 0) return state
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        }
        case  REDO: {
            if (future.length === 0) return state
            const next = future[0]
            const newNext = future.splice(1)
            return {
                past: [...past, present],
                present: next,
                future: newNext
            }
        }
        case SET: {
            if (newPresent === present) return state
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        }
        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        }
    }
}

export const UseUndo = <T>(initialValue: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialValue,
        future: []
    } as StateProp<T>)
    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => dispatch({type: UNDO}), [])
    const redo = useCallback(() => dispatch({type: REDO}), [])
    const set = useCallback((newPresent: T) => dispatch({newPresent, type: SET}), [])
    const reset = useCallback((newPresent: T) => dispatch({newPresent, type: RESET}), [])
    return [state, {set, reset, redo, undo, canUndo, canRedo}] as const

}