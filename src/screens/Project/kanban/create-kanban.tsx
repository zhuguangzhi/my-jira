import React, {useState} from "react";
import {useProjectIdInUrl} from "../utils";
import {useAddKanban} from "../../../utils/kanban";
import {Container} from "./kanban-column";
import {Input} from "antd";

export const CreateKanban = () => {
    const [name, setName] = useState("")
    const projectId = useProjectIdInUrl()
    const {mutateAsync} = useAddKanban()
    const submit = () => {
        mutateAsync({name, projectId}).then(() => {
            setName('')
        })
    }
    return <Container>
        <Input size={"large"}
               placeholder={"新建看板名称"}
               onPressEnter={submit}
               value={name}
               onChange={(e) => setName(e.target.value)}
        />
    </Container>
}
