import React, {createContext, ReactNode, useContext} from "react";
import {loginInfoProps, UserProp} from "../../types";
import * as auth from 'auth-provider'
import {useAsync} from "../use-async";
import {FullPageLoading} from "../../components/FullPageLoading";
import {useMount} from "../index";
import {LoginApi} from "../../common/api";


const AuthContext = createContext<{
    user: UserProp | null,
    login: (form: loginInfoProps) => Promise<void>,
    loginOut: () => Promise<void>,
    register: (form: loginInfoProps) => Promise<void>,
} | undefined>(undefined)


export const AuthProvider = ({children}: { children: ReactNode }) => {
    // const [user, setUser] = useState<UserProp | null>(null)
    const {run, setData: setUser, data: user, isLoading} = useAsync<UserProp | null>()
    const login = (form: loginInfoProps) => auth.login(form).then(setUser)
    const register = (form: loginInfoProps) => auth.register(form).then(setUser)
    const loginOut = () => auth.loginOut().then(() => setUser(null))

    useMount(() => {
        // let data = null
        const token = auth.getToken()
        if (token) {
            //TODO:消灭any
            run(LoginApi.checkToken({token})).then((res: any) => {
                setUser(res?.user)
            })
        }
    })
    if (isLoading) return <FullPageLoading message={'登录中...'}/>
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
