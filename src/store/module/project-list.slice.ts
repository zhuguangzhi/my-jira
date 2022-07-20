import {ProjectProp, UserProp} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

interface State {
    projectModalOpen: boolean;
    projects: ProjectProp[];
    user: UserProp | null;
}

const initialState: State = {
    projectModalOpen: false,
    projects: [],
    user: null
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
        setProjectList(state, action: PayloadAction<ProjectProp[]>) {
            state.projects = action.payload
        },
        setUser(state, action: PayloadAction<UserProp>) {
            state.user = action.payload
        }
    }
})
export const projectModalOpen = (state: RootState) => state.projectList.projectModalOpen
export const projectListActions = ProjectListSlice.actions