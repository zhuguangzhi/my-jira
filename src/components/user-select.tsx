import React from "react";
import {IdSelect} from "./id-select";
import {useUser} from "../utils/user";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const {data: users} = useUser();
    return <IdSelect option={users} {...props} />;
};
