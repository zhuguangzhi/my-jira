import React from "react";
import styled from "@emotion/styled";
import {useDocumentTitle} from "../../../hooks";
import {useKanbanSearchParams, useProjectInUrl, useTasksSearchParams} from "../utils";
import {useKanbans} from "../../../utils/kanban";
import {KanbanColumn} from "./kanban-column";
import {SearchPanel} from "./search-panel";
import {useTasks} from "../../../utils/task";
import {Spin} from "antd";
import {CreateKanban} from "./create-kanban";
import {TaskModal} from "./task-modal";

export const KanbanScreen = () => {
    useDocumentTitle("看板列表");
    const urlParam = useTasksSearchParams()
    const {data: currentProject} = useProjectInUrl();
    const {data: kanbanList, isLoading: kanbanLoading} = useKanbans(useKanbanSearchParams())
    const {data: allTask, isLoading: taskLoading} = useTasks(urlParam)
    const isLoading = kanbanLoading || taskLoading

    return <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel/>
        {
            isLoading ? <Spin size={"large"}/> : <ColumnsContainer>
                {
                    kanbanList?.map(kanban =>
                        <KanbanColumn key={kanban.id} allTask={allTask || []} kanban={kanban}></KanbanColumn>)
                }
                <CreateKanban/>
            </ColumnsContainer>
        }
        {/*修改弹窗*/}
        <TaskModal/>
    </div>
}
export const ColumnsContainer = styled("div")`
  width: 100%;
  display: flex;
  overflow-x: auto;
  flex: 1;

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
`;
