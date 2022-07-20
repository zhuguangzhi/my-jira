import {loginInfoProps, UserProp} from "./types";
import {LoginApi} from "./common/api";

const localStorageKey = "__auth_provider_token__"
export const getToken = () => window.localStorage.getItem(localStorageKey)
//存储用户token
export const saveUserToken = ({user}: { user: UserProp }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}
//登录
export const login = async (params: loginInfoProps) => {
    const res = await LoginApi.Login(params)
    return saveUserToken(res)
}
//注册
export const register = async (params: loginInfoProps) => {
    const res = await LoginApi.Register(params)
    return saveUserToken(res)
}
//退出登录 清除token
export const loginOut = async () => {
    window.localStorage.removeItem(localStorageKey)
    window.location.href = window.location.origin
}
