import React from "react";
import {Button, Input} from "antd";
import {UserSelect} from "components/user-select";
import {useTasksSearchParams} from "../utils";
import {useSetUrlSearchParam} from "../../../hooks/url";
import styled from "@emotion/styled";
import {TaskTypeSelect} from "../../../components/task-type-select";

export const SearchPanel = () => {
    //获取路由初始值
    const searchParams = useTasksSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined,
        });
    };

    return (
        <Row marginBottom={4} gap={true}>
            <Input
                style={{width: "200rem"}}
                placeholder={"任务名"}
                value={searchParams.name}
                onChange={(evt) => setSearchParams({name: evt.target.value})}
            />
            <UserSelect
                defaultOptionName={"经办人"}
                value={searchParams.processorId}
                onChange={(value) => setSearchParams({processorId: value})}
            />
            <TaskTypeSelect
                defaultOptionName={"类型"}
                value={searchParams.typeId}
                onChange={(value) => setSearchParams({typeId: value})}
            />
            <Button onClick={reset}>清除筛选器</Button>
        </Row>
    );
};
const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};

  > * {
    margin-top: 0 !important;
    margin-bottom: 15rem !important;
    margin-right: ${(props) =>
            typeof props.gap === "number"
                    ? props.gap + "rem"
                    : props.gap
                            ? "20rem"
                            : undefined};
  }
`;
