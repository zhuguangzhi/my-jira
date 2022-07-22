import React from "react";
import styled from "@emotion/styled";
import {useDocumentTitle} from "../../../hooks";
import {useKanbanSearchParams, useProjectInUrl, useTasksSearchParams} from "../utils";
import {useKanbans, useReorderKanban} from "../../../utils/kanban";
import {KanbanColumn} from "./kanban-column";
import {SearchPanel} from "./search-panel";
import {useReorderTask, useTasks} from "../../../utils/task";
import {Spin} from "antd";
import {CreateKanban} from "./create-kanban";
import {TaskModal} from "./task-modal";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {Drag, Drop, DropChild} from "../../../components/drag-and-drop";

export const KanbanScreen = () => {
    useDocumentTitle("看板列表");
    const {data: currentProject} = useProjectInUrl();
    const {data: kanbanList, isLoading: kanbanLoading} = useKanbans(useKanbanSearchParams())
    const {data: allTask, isLoading: taskLoading} = useTasks(useTasksSearchParams())
    const {mutate: reorderKanban} = useReorderKanban()
    const {mutate: reorderTask} = useReorderTask()
    const isLoading = kanbanLoading || taskLoading
    /*
* type:类型
* destination：拖拽的目标位置信息
* source：拖拽的起始位置信息
* */
    const useDrag = ({type, destination, source}: DropResult) => {
        if (!destination) return;
        if (type === "COLUMN") {
            //    kanban拖拽
            const fromId = kanbanList?.[source.index].id
            const toId = kanbanList?.[destination.index].id
            if (!fromId || !toId || toId === fromId) return;
            const type = destination.index > source.index ? "after" : "before";
            reorderKanban({type, referenceId: toId, fromId})
        } else if (type === 'ROW') {
            console.log('kanbanId', {type, destination, source})
            //    task 拖拽
            const fromKanbanId = Number(source.droppableId)
            const toKanbanId = Number(destination.droppableId)
            //    找到TASK看板 找到该task
            const fromTask = allTask?.filter(task => task.kanbanId === fromKanbanId)[source.index]
            const toTask = allTask?.filter(task => task.kanbanId === toKanbanId)[destination.index]
            if (fromTask === toTask) return;
            reorderTask({
                fromId: fromTask?.id,
                referenceId: toTask?.id,
                type:
                    fromKanbanId === toKanbanId && destination.index > source.index
                        ? "after"
                        : "before",
                fromKanbanId,
                toKanbanId
            })
        }

    }

    return <DragDropContext onDragEnd={useDrag}>
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <h1>{currentProject?.name}看板</h1>
            <SearchPanel/>
            {
                isLoading ? <Spin size={"large"}/> :
                    <ColumnsContainer>
                        <Drop type={"COLUMN"} droppableId={'kanban'} direction={'horizontal'}>
                            <DropChild style={{display: "flex"}}>
                                {
                                    kanbanList?.map((kanban, index) =>
                                        <Drag key={kanban.id} draggableId={'kanban' + kanban.id} index={index}>
                                            <KanbanColumn allTask={allTask || []} kanban={kanban}></KanbanColumn>
                                        </Drag>
                                    )
                                }
                            </DropChild>
                        </Drop>
                        <CreateKanban/>
                    </ColumnsContainer>
            }
            {/*修改弹窗*/}
            <TaskModal/>
        </div>
    </DragDropContext>
}
export const ColumnsContainer = styled.div`
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
