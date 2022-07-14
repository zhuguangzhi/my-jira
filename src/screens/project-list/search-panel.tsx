import React from "react";
import {UserProp} from "../../types";
import {Form, Input, Select} from "antd";

type SearchPanelProps = {
    user: UserProp[],
    param: {
        personId: string,
        name: string
    },
    setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({param, setParam, user}: SearchPanelProps) => {
    // useMount(() => {
    //     user.unshift({id: "", name: "负责人"})
    // })
    return <Form layout={"inline"}>
        <Form.Item style={{marginBottom: "20rem"}}>
            <Input type="text" placeholder={"输入名称"} value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value={''}>负责人</Select.Option>
                {
                    user.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
                }
            </Select>
        </Form.Item>
    </Form>
}