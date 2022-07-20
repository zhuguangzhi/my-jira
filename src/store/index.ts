import {configureStore} from "@reduxjs/toolkit";
import {ProjectListSlice} from "./module/project-list.slice";

export const rootReducer = {
    projectList: ProjectListSlice.reducer
}
export const store = configureStore({
    reducer: rootReducer
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>