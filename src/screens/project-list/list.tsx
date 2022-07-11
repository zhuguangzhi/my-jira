import React from "react";
import {ProjectProp, UserProp} from "../../types";

type ListProps = {
    list: ProjectProp[],
    user: UserProp[]
}
export const List = ({list, user}: ListProps) => {
    return <table border={1}>
        <thead>
        <tr>
            <td>名称</td>
            <td>负责人</td>
        </tr>
        </thead>
        <tbody>
        {
            list.map((project, index) => <tr key={index}>
                <td>{project.name}</td>
                <td>{user.find(user => user.id === project.personId)?.name || '未知'}</td>
            </tr>)
        }
        </tbody>
    </table>
}