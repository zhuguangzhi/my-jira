import React from "react";
import {useTaskTypes} from "../utils/task";
import {IdSelect} from "./id-select";

export const TaskTypeSelect = (
    props: React.ComponentProps<typeof IdSelect>
) => {
    const {data: taskTypes} = useTaskTypes()
    return <IdSelect option={taskTypes} {...props}/>
}
