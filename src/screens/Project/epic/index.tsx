import React, {useState} from "react";
import {Button, List, Modal} from "antd";
import dayjs from "dayjs";
import {useTasks} from "utils/task";
import {Link} from "react-router-dom";
import {Epic} from "types/epic";
import {useKanbanSearchParams, useProjectInUrl} from "../utils";
import {useDeleteEpic, useEpic} from "../../../utils/epic";
import styled from "@emotion/styled";
import {CreateEpic} from "./create-epic";

export const EpicScreen = () => {
    const {data: currentProject} = useProjectInUrl();
    const {data: epics} = useEpic(useKanbanSearchParams());
    const {data: tasks} = useTasks({projectId: currentProject?.id});
    const {mutate: deleteEpic} = useDeleteEpic();
    const [epicCreateOpen, setEpicCreateOpen] = useState(false);

    const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
            title: `确定删除项目组：${epic.name}`,
            content: "点击确定删除",
            okText: "确定",
            onOk() {
                deleteEpic({id: epic.id});
            },
        });
    };

    return (
        <ScreenContainer>
            <div style={{display: "flex", flexDirection: "column"}}>
                <h1>{currentProject?.name}任务组</h1>
                <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
                    创建任务组
                </Button>
            </div>
            <List
                style={{overflow: "auto"}}
                dataSource={epics}
                itemLayout={"vertical"}
                renderItem={(epic) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
                                    <span>{epic.name}</span>
                                    <Button onClick={() => confirmDeleteEpic(epic)} type={"link"}>
                                        删除
                                    </Button>
                                </div>
                            }
                            description={
                                <div>
                                    <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                                    <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                                </div>
                            }
                        />
                        <div>
                            {tasks
                                ?.filter((task) => task.epicId === epic.id)
                                .map((task) => (
                                    <Link
                                        to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                                        key={task.id}
                                        style={{padding: "5px"}}
                                    >
                                        {task.name}
                                    </Link>
                                ))}
                        </div>
                    </List.Item>
                )}
            />
            <CreateEpic
                onClose={() => setEpicCreateOpen(false)}
                visible={epicCreateOpen}
            />
        </ScreenContainer>
    );
};
export const ScreenContainer = styled.div`
  padding: 32rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
