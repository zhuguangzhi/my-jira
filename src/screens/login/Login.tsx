import React from "react";
import {FormComponent} from "./components/form-component";

export const LoginScreen = () => {
    // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     const username = (event.currentTarget[0] as HTMLFormElement).value
    //     const password = (event.currentTarget[1] as HTMLFormElement).value
    //     await login({username, password})
    // }
    return <FormComponent title={"登录"}/>
}