import React from "react";
import {Kanban} from "../../../types/kanban";
import {useTaskTypes} from "../../../utils/task";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import {Button, Card, Dropdown, Menu, Modal} from "antd";
import {Task} from "../../../types/task";
import {CreateTask} from "./create-task";
import {useTasksModal} from "../utils";
import {useUrlQueryParam} from "../../../hooks/url";
import {Mark} from "../../../components/Mark";
import {useDeleteKanban} from "../../../utils/kanban";
import {Drag, Drop, DropChild} from "../../../components/drag-and-drop";

// eslint-disable-next-line react/display-name
export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban, allTask: Task[] }>
(({kanban, allTask, ...props}, ref) => {
    const tasks: Kanban[] = allTask?.filter(item => item.kanbanId === kanban?.id) || []
    const {startEdit} = useTasksModal()
    const [getKeyword] = useUrlQueryParam(['name'])
    const {data: taskTypes} = useTaskTypes();
    const TaskTypeIcon = ({id}: { id: number }) => {
        const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
        if (!name) {
            return null;
        }
        return <img alt={"task-icon"}
                    style={{width: "16px", margin: "6px 0 ", display: "block"}}
                    src={name === "task" ? taskIcon : bugIcon}/>;
    };
    const More = ({kanban}: { kanban: Kanban }) => {
        const {mutateAsync} = useDeleteKanban();

        const startDelete = () => {
            Modal.confirm({
                okText: "确定",
                cancelText: "取消",
                title: "确定删除看板吗",
                onOk() {
                    return mutateAsync({id: kanban.id});
                },
            });
        };
        const MenuItem = [
            {
                key: "del", label: <Button type={"link"} onClick={startDelete}>
                    删除
                </Button>
            },
        ]
        return (
            <Dropdown overlay={<Menu items={MenuItem}/>}>
                <Button type={"link"}>...</Button>
            </Dropdown>
        );
    };
    const openTaskModal = (id: number) => {
        startEdit(id)
    }
    return <Container ref={ref} {...props}>
        <Row>
            <h3 style={{fontSize: "16px", fontWeight: "bold"}}>{kanban.name}</h3>
            <More kanban={kanban} key={kanban.id}/>
        </Row>
        <TasksContainer>
            <Drop type={"ROW"} direction={'vertical'} droppableId={kanban.id.toString()}>
                <DropChild style={{minHeight: "5px"}}>
                    {
                        tasks?.map((task, taskIndex) => (
                            <Drag index={taskIndex} draggableId={'task' + task.id} key={task.id}>
                                <Card onClick={() => openTaskModal(task.id)} key={task.id}
                                      style={{marginBottom: '5rem'}}>
                                    <div>
                                        {/*{task.name}*/}
                                        <Mark name={task.name} keyword={getKeyword.name}/>
                                        <TaskTypeIcon id={task.typeId}/>
                                    </div>
                                </Card>
                            </Drag>
                        ))
                    }
                </DropChild>
            </Drop>
            <CreateTask kanbanId={kanban.id}/>
        </TasksContainer>
    </Container>
})

const Row = styled.div`
  //width: 100%;
  //height: 100%;
  display: flex;
  justify-content: space-between;
`

export const Container = styled.div`
  min-width: 270rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 7rem 7rem 10rem;
  margin-right: 15rem;

`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
