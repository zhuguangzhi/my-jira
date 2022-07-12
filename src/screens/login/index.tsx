import React, {FormEvent} from "react";
import {LoginApi} from "../../common/api";

export const LoginScreen = () => {
    const onLogin = async (username: string, password: string | number) => {
        const res = await LoginApi.Login({username, password})
        console.log('login result', res);
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget[0] as HTMLFormElement).value
        const password = (event.currentTarget[1] as HTMLFormElement).value
        onLogin(username, password)
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id="username"/>
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id="password" autoComplete={"pass"}/>
        </div>
        <button type="submit">登录</button>
    </form>
}