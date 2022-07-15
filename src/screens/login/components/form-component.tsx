import {Form, Input, message} from "antd";
import {LongButton} from "../index";
import React from "react";
import {loginInfoProps} from "../../../types";
import {useAuth} from "../../../hooks/context/auth-context";
import {useAsync} from "../../../hooks/use-async";

interface FormComponentProps {
    title: string
}

export const FormComponent = ({title}: FormComponentProps) => {
    const {register, login} = useAuth()
    const {run, isLoading} = useAsync()
    // const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = ({cPassword, ...values}: loginInfoProps) => {
        let api;
        if (title === "注册") {
            api = register
            if (cPassword !== values.password) {
                message.error('请确认两次输入的密码一致')
                return;
            }
        } else api = login
        run(api(values))
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: "请输入用户名"}]}>
            <Input placeholder={"用户名"} type="text"/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: "请输入密码"}]}>
            <Input placeholder={"密码"} type="password"/>
        </Form.Item>
        {
            title === "注册" ? <Form.Item name={'cPassword'} rules={[{required: true, message: "请确认密码"}]}>
                <Input placeholder={"确认密码"} type="password"/>
            </Form.Item> : ""
        }
        <Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type="primary">{title}</LongButton>
        </Form.Item>
    </Form>
}