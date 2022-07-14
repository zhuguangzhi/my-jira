import React, {createContext, ReactNode, useContext, useState} from "react";
import {loginInfoProps, UserProp} from "../../types";
import * as auth from 'auth-provider'
import {useMount} from "../index";
import {LoginApi} from "../../common/api";


const AuthContext = createContext<{
    user: UserProp | null,
    login: (form: loginInfoProps) => Promise<void>,
    loginOut: () => Promise<void>,
    register: (form: loginInfoProps) => Promise<void>,
} | undefined>(undefined)


export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProp | null>(null)
    const login = (form: loginInfoProps) => auth.login(form).then(setUser)
    const register = (form: loginInfoProps) => auth.register(form).then(setUser)
    const loginOut = () => auth.loginOut().then(() => setUser(null))

    useMount(() => {
        // let data = null
        const token = auth.getToken()
        if (token) {
            LoginApi.checkToken({token}).then(result => {
                setUser(result.user)
            })

        }
        // setUser(data.user)
    })
    return <AuthContext.Provider value={{user, login, loginOut, register}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用")
    }
    return context
}
