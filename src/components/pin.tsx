import React from "react";
import {Rate} from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean,
    onCheckedChange?: (checked: boolean) => void
}

export const Pin = ({checked, onCheckedChange, ...ResetProps}: PinProps) => {
    return <Rate count={1} value={checked ? 1 : 0} onChange={(e) => onCheckedChange?.(!!e)} {...ResetProps}/>
}