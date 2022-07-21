import React from "react";
import {Kanban} from "../../../types/kanban";
import {useTaskTypes} from "../../../utils/task";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import {Card} from "antd";
import {Task} from "../../../types/task";
import {CreateTask} from "./create-task";
import {useTasksModal} from "../utils";

export const KanbanColumn = ({kanban, allTask}: { kanban: Kanban, allTask: Task[] }) => {
    const tasks: Kanban[] = allTask?.filter(item => item.kanbanId === kanban?.id) || []
    const {startEdit} = useTasksModal()
    const TaskTypeIcon = ({id}: { id: number }) => {
        const {data: taskTypes} = useTaskTypes();
        const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
        if (!name) {
            return null;
        }
        return <img alt={"task-icon"}
                    style={{width: "16px", margin: "6px 0 ", display: "block"}}
                    src={name === "task" ? taskIcon : bugIcon}/>;
    };
    const openTaskModal = (id: number) => {
        startEdit(id)
    }
    return <Container>
        <h3 style={{fontSize: "16px", fontWeight: "bold"}}>{kanban.name}</h3>
        <TasksContainer>
            {
                tasks?.map(task => (
                    <Card onClick={() => openTaskModal(task.id)} key={task.id}
                          style={{marginBottom: '5rem'}}>
                        <div>
                            {task.name}
                            <TaskTypeIcon id={task.typeId}/>
                        </div>
                    </Card>
                ))
            }
            <CreateTask kanbanId={kanban.id}/>
        </TasksContainer>
    </Container>
}

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
