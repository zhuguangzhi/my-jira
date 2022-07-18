import React from "react";
import {ProjectProp, UserProp} from "../../types";
import {Form, Input} from "antd";
import {IdSelect} from "../../components/id-select";

type SearchPanelProps = {
    user: UserProp[],
    param: Pick<ProjectProp, 'name' | 'personId'>,
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
            <IdSelect value={param.personId} onChange={value => {
                setParam({
                    ...param,
                    personId: value || null
                })
            }} option={user} defaultOptionName={'负责人'}/>
            {/*<Select value={param.personId} onChange={value => {*/}
            {/*    setParam({*/}
            {/*        ...param,*/}
            {/*        personId: value*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Select.Option value={''}>负责人</Select.Option>*/}
            {/*    {*/}
            {/*        user.map(item => <Select.Option value={String(item.id)} key={item.id}>{item.name}</Select.Option>)*/}
            {/*    }*/}
            {/*</Select>*/}
        </Form.Item>
    </Form>
}