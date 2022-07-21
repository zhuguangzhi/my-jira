import React from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
// import {useQuery} from "react-query";
import {useControlPopoverModel, useDebounce, useDocumentTitle} from "../../hooks";
import {useAuth} from "../../hooks/context/auth-context";
import styled from "@emotion/styled";
//ReactComponent将属性转换为React组件
import {ReactComponent as SoftwareLogo} from "assets/software-logo.svg"
import {Button, Dropdown, Menu} from "antd";
import {BrowserRouter as Router} from "react-router-dom";
import {Navigate, Route, Routes} from "react-router";
import {ProjectScreen} from "../Project";
import {useSearchQueryParam} from "../../hooks/url";
import {ProjectPopover} from "../../components/project-popover";
import {ProjectModal} from "./project-model";
import {useProject} from "../../utils/project";
import {useUser} from "../../utils/user";

const ProjectList = () => {
    const popoverModel = useControlPopoverModel('open')
    const [param, setParam] = useSearchQueryParam()
    const projectParam = {
        ...param,
        personId: Number(param.personId) || null
    }
    // const [userList, setUserList] = useState([])
    const {isLoading, error, data: list} = useProject(useDebounce(projectParam, 500));
    const {data: userList} = useUser()
    useDocumentTitle('项目列表', false)
    return <div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <h2>项目列表</h2>
            <MyButton onClick={() => {
                popoverModel()
            }
            }>创建项目</MyButton>
        </div>
        <SearchPanel param={projectParam} setParam={setParam}/>
        <List loading={isLoading} dataSource={list || []}
              user={userList || []}></List>
    </div>
}
export const ProjectListScreen = () => {
    const {loginOut, user} = useAuth()
    const MenuItem = [
        {key: "loginOut", label: "退出登录"}
    ]
    return <div>
        <Router>
            <PageHeader>

                <Button style={{padding: 0}} type={'link'}
                        onClick={() => window.location.href = window.location.origin}>
                    <SoftwareLogo className={'logo'} width={"180rem"} color={"rgb(38,132,255)"}/>
                </Button>
                <div className={'item'}>
                    <span>用户</span>
                    <ProjectPopover/>
                </div>
                <Dropdown overlay={<Menu onClick={loginOut} items={MenuItem}/>}>
                    <a onClick={e => e.preventDefault()}>Hi,{user?.name || 'user'}</a>
                </Dropdown>
            </PageHeader>
            <Main>
                <Routes>
                    <Route path={'/projects'} element={<ProjectList/>}/>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}/>
                    {/*默认路由 上面均无法匹配时使用该路由 不会改变路由地址*/}
                    {/*<Route index element={<ProjectList/>}/>*/}
                    {/*Navigate 路由重定向*/}
                    <Route index element={<Navigate to={'/projects'}/>}/>
                </Routes>
            </Main>
            <ProjectModal/>
        </Router>
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
      padding: 0 20rem;
      cursor: pointer;
    }
  }
`
const Main = styled.main`
  height: calc(100vh - 60rem);
  padding: 32rem;
`
const MyButton = styled.button`
  border: none;
  background: none;

  :hover {
    cursor: pointer;
    color: #0052CC;
  }`