import {loginInfoProps, UserProp} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../index";
import * as auth from 'auth-provider'


interface AuthProps {
    user: UserProp | null
}

const initialState: AuthProps = {
    user: null
}
export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProp | null>) => {
            state.user = action.payload
        }
    }
})
export const {setUser} = AuthSlice.actions
export const userState = (state: RootState) => state.auth.user
export const login = (param: loginInfoProps) => (dispatch: AppDispatch) => auth.login(param).then((user) => dispatch(setUser(user)))
export const register = (param: loginInfoProps) => (dispatch: AppDispatch) => auth.register(param).then((res) => dispatch(setUser(res)))
export const loginOut = () => (dispatch: AppDispatch) => auth.loginOut().then(() => dispatch(setUser(null)))
