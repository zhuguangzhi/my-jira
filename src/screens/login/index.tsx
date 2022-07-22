import React, {useState} from "react";
import {RegisterScreen} from "./Register";
import {Button, Card, Divider} from "antd";
import styled from "@emotion/styled";
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import {LoginScreen} from "./Login";

const LoginComponent = () => {
    const [isLogin, SetLogin] = useState(true)
    return <Container>
        <Header/>
        <Background/>
        <ShadowCard>
            <Title>
                My Jira
            </Title>
            {isLogin ? <LoginScreen/> : <RegisterScreen/>}
            {/*分割线*/}
            <Divider></Divider>
            <a style={{userSelect: 'none'}} onClick={() => SetLogin(!isLogin)}>{isLogin ? "没有账号？注册一个吧" : "登录已有账号"}</a>
        </ShadowCard>
    </Container>
}
export default LoginComponent
export const LongButton = styled(Button)`
  width: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
const Title = styled.h2`
  margin-bottom: 24rem;
  color: rgb(94, 108, 132);
`
//emotion/styled使用第三方的元素时需用（）
const ShadowCard = styled(Card)`
  width: 400rem;
  min-height: 560rem;
  padding: 32rem 40rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  //margin-top: 80rem;
  text-align: center;
`
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 50rem 0;
  background-size: 80rem;
  width: 100%;
`
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  //background-attachment 图片是否随着滚动而滚动
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 400rem) / 2) - 32rem), calc(((100vw - 400rem) / 2) - 32rem), cover;
  background-image: url(${left}), url(${right});
`