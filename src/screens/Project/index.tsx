import React from "react";
import {Link} from "react-router-dom";
import {Route, Routes, useLocation} from "react-router";
import styled from "@emotion/styled";
import {Menu} from "antd";
import {KanbanScreen} from "./kanban";
import {EpicScreen} from "./epic";

const useRouteType = () => {
    const units = useLocation().pathname.split("/");
    return units[units.length - 1];
};

export const ProjectScreen = () => {
    const routeType = useRouteType();
    const MenuItems = [
        {
            key: "kanban",
            label: <Link to={"kanban"}>看板</Link>,
        }, {
            key: "epic",
            label: <Link to={"epic"}>任务组</Link>,
        },
    ]
    return (
        <Container>
            <Aside>
                <Menu mode={"inline"} selectedKeys={[routeType]} items={MenuItems}/>
            </Aside>
            <Main>
                <Routes>
                    {/*projects/:projectId/kanban*/}
                    <Route path={"kanban"} element={<KanbanScreen/>}/>
                    {/*projects/:projectId/epic*/}
                    <Route path={"epic"} element={<EpicScreen/>}/>
                    <Route index element={<KanbanScreen/>}/>
                </Routes>
            </Main>
        </Container>
    );
};

const Aside = styled.aside`
  width: 160rem;
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  width: 200rem;
  flex: 1;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 0 15rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
