import React from "react";
import {useAuth} from "../../hooks/context/auth-context";
import {Form, Input} from "antd";
import {LongButton} from "./index";

export const RegisterScreen = () => {
    const {register} = useAuth()
    // const onRegister = async (username: string, password: string | number) => {
    //     const res = await LoginApi.Register({username, password})
    // }
    const handleSubmit = async (event: { username: string, password: string | number }) => {
        await register(event)
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: "请输入用户名"}]}>
            <Input placeholder={"用户名"} type="text"/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: "请输入密码"}]}>
            <Input placeholder={"密码"} type="password"/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={"submit"} type="primary">注册</LongButton>
        </Form.Item>
    </Form>
}