import React from "react";
import {useAuth} from "../../hooks/context/auth-context";
import {Form, Input} from "antd";
import {LongButton} from "./index";

export const LoginScreen = () => {
    const {login} = useAuth()
    // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     const username = (event.currentTarget[0] as HTMLFormElement).value
    //     const password = (event.currentTarget[1] as HTMLFormElement).value
    //     await login({username, password})
    // }
    const handleSubmit = async (event: { username: string, password: string | number }) => {
        await login(event)
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: "请输入用户名"}]}>
            <Input placeholder={"用户名"} type="text"/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: "请输入密码"}]}>
            <Input placeholder={"密码"} type="password"/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={'submit'} type="primary">登录</LongButton>
        </Form.Item>
    </Form>
}