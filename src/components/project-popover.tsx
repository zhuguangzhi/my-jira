import styled from "@emotion/styled";
import React, {useState} from "react";
import {ProjectProp} from "../types";
import {Button, Divider, List, Popover, Typography} from "antd";
import {GetProjects} from "../common/api";
import {useDispatch} from "react-redux";
import {projectListActions} from "../store/module/project-list.slice";

export const ProjectPopover = () => {
    const dispatch = useDispatch()
    //获取项目收藏列表
    const [pinnedProjects, setPinnedProjects] = useState<ProjectProp[]>([])
    const refetch = (e: boolean) => {
        if (e)
            GetProjects({}).then((res) => {
                setPinnedProjects(res?.filter((item: ProjectProp) => item.pin))
            })
    }
    const Content = <ContentContainer>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <MaxHeightList>
            {
                pinnedProjects?.map((project) => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.name}/>
                    </List.Item>
                ))}
        </MaxHeightList>
        <Divider style={{padding: 0, margin: ` 5px 0`}}/>
        <Button onClick={() => {
            dispatch(projectListActions.openProjectModel())
        }} style={{padding: 0}} type={"link"}>
            创建项目
        </Button>
    </ContentContainer>
    return <Popover
        onVisibleChange={(e) => refetch(e)}
        placement={"bottom"}
        content={Content}
    >
        <span>项目</span>
    </Popover>
}
const ContentContainer = styled.div`
  min-width: 300rem;
`;
const MaxHeightList = styled(List)`
  max-height: 200rem;
  overflow-y: auto;
  width: 100%;
`
