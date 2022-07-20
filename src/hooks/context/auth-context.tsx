import React, {ReactNode, useCallback} from "react";
import {loginInfoProps, UserProp} from "../../types";
import * as authStore from 'store/module/auth.slice'
import {useDispatch, useSelector} from "react-redux";
import {useMount} from "../index";
import {useAsync} from "../use-async";
import {FullPageLoading} from "../../components/FullPageLoading";
import {LoginApi} from "../../common/api";
import {getToken, saveUserToken} from "../../auth-provider";


// const AuthContext = createContext<{
//     user: UserProp | null,
//     login: (form: loginInfoProps) => Promise<void>,
//     loginOut: () => Promise<void>,
//     register: (form: loginInfoProps) => Promise<void>,
// } | undefined>(undefined)

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const dispatch = useDispatch()
    const {run, isLoading} = useAsync<{ user: UserProp }>()
    useMount(() => {
        const token = getToken()
        if (token) {
            run(LoginApi.checkToken({token})).then((res) => {
                dispatch(authStore.setUser(res?.user || null))
                if (res) saveUserToken(res)
            })
        }
    })
    if (isLoading) return <FullPageLoading message={'登录中...'}/>
    // return <AuthContext.Provider value={{user, login, loginOut, register}}>
    //     {children}
    // </AuthContext.Provider>
    return <div>{children}</div>;
}

export const useAuth = () => {
    const dispatch: (params: any) => Promise<UserProp> = useDispatch()
    const login = useCallback(
        (form: loginInfoProps) => dispatch(authStore.login(form)),
        [dispatch]
    );
    const register = useCallback(
        (form: loginInfoProps) => dispatch(authStore.register(form)),
        [dispatch]
    );
    const loginOut = useCallback(
        () => dispatch(authStore.loginOut()),
        [dispatch]
    );
    const user = useSelector(authStore.userState)
    return {
        user,
        login,
        register,
        loginOut
    }

}
