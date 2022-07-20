import {ProjectProp, UserProp} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

interface State {
    projectModalOpen: boolean;
    projects: ProjectProp | null;
    user: UserProp | null;
    type: "add" | "edit"
}

const initialState: State = {
    projectModalOpen: false,
    projects: null,
    user: null,
    type: "add"
}
export const ProjectListSlice = createSlice({
    name: "projectListSlice",
    initialState: initialState,
    reducers: {
        openProjectModel(state) {
            state.projectModalOpen = true
        },
        closeProjectModel(state) {
            state.projectModalOpen = false
        },
        setProjectList(state, action: PayloadAction<ProjectProp | null>) {
            state.projects = action.payload
        },
        setUser(state, action: PayloadAction<UserProp>) {
            state.user = action.payload
        },
        setType(state, action: PayloadAction<'add' | 'edit' | null>) {
            state.type = action.payload || 'add'
        }
    }
})
export const projectModalOpen = (state: RootState) => state.projectList.projectModalOpen
export const projectListActions = ProjectListSlice.actions