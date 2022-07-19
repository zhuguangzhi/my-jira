import React from "react";
import {Select} from "antd";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'option'> {
    value: string | number | null | undefined
    onChange?: (id: number | undefined) => void
    defaultOptionName?: string,
    option?: { id: number, name: string }[]
}

/*
* value:默认的id
* onChange 会返回一个number的optionId id不满足时为undefined
* defaultOptionName：默认时所显示的名字
* option 列表
* */
export const IdSelect = ({value, onChange, defaultOptionName, option, ...restProps}: IdSelectProps) => {
    return <Select
        value={option?.length ? toNumber(value) : 0}
        onChange={(e) => onChange?.(toNumber(e) || undefined)}
        {...restProps}
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            option?.map(list => <Select.Option key={list.id} value={list.id}>{list.name}</Select.Option>)
        }
    </Select>
}
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)