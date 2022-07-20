import React from "react";
import {ProjectProp} from "../../types";
import {Form, Input} from "antd";
import {UserSelect} from "../../components/user-select";

type SearchPanelProps = {
    param: Pick<ProjectProp, 'name' | 'personId'>,
    setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({param, setParam}: SearchPanelProps) => {
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
            <UserSelect
                defaultOptionName={"负责人"}
                value={param.personId}
                onChange={(value) =>
                    setParam({
                        ...param,
                        personId: value || null,
                    })
                }
            />
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