import React, {useEffect, useState} from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useDebounce, useMount} from "../../hooks";
import {GetProjects, GetUser} from "../../common/api";
import {useAuth} from "../../hooks/context/auth-context";
import styled from "@emotion/styled";
//ReactComponent将属性转换为React组件
import {ReactComponent as SoftwareLogo} from "assets/software-logo.svg"
import {Dropdown, Menu} from "antd";

export const ProjectList = () => {
    const [param, setParam] = useState({
        name: "",
        personId: "",
    })
    const debounceParam = useDebounce(param, 500)
    const [list, setList] = useState([])
    const [userList, setUserList] = useState([
        {
            name: "",
            id: "",
        }
    ])
    const {loginOut, user} = useAuth()
    const MenuItem = [
        {key: "loginOut", label: "退出登录"}
    ]
    useEffect(() => {
        const loadPost = async () => {
            const response = await GetProjects(param)
            setList(response)
        }
        loadPost()
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
        //     if (!response.ok) return false;
        //     setList(await response.json())
        // })
    }, [debounceParam])
    useMount(() => {
        const loadPost = async () => {
            const response = await GetUser({})
            setUserList(response)
        }
        loadPost()
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if (!response.ok) return false;
        //     setUser(await response.json())
        // })
    })
    return <div>
        <PageHeader>
            <SoftwareLogo className={'logo'} width={"180rem"} color={"rgb(38,132,255)"}/>
            <div className={'item'}>
                <span>用户</span>
                <span>项目</span>
            </div>
            <Dropdown overlay={<Menu onClick={loginOut} items={MenuItem}/>}>
                <a onClick={e => e.preventDefault()}>Hi,{user?.name || 'user'}</a>
            </Dropdown>
        </PageHeader>
        <Main>
            <h2>项目列表</h2>
            <SearchPanel param={param} setParam={setParam} user={userList}></SearchPanel>
            <List list={list} user={userList}></List>
        </Main>

    </div>
}
const PageHeader = styled.header`
  display: flex;
  align-items: center;
  height: 60rem;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 32rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;

  .logo {
    margin-right: 30rem;
  }

  .button {
    display: inline-block;
    width: 120rem;
    padding: 0 20rem;
  }

  .item {
    flex: 1;

    span {
      display: inline-block;
      padding: 0 20rem;
      cursor: pointer;
    }
  }
`
const Main = styled.main`
  height: calc(100vh - 60rem);
  padding: 32rem;
`