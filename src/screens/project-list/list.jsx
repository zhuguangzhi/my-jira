import React from "react";

// eslint-disable-next-line react/prop-types
export const List = ({list, user}) => {
    return <table border={1}>
        <thead>
        <tr>
            <td>名称</td>
            <td>负责人</td>
        </tr>
        </thead>
        <tbody>
        {
            // eslint-disable-next-line react/prop-types
            list.map((project, index) => <tr key={index}>
                <td>{project.name}</td>
                {/* eslint-disable-next-line react/prop-types */}
                <td>{user.find(user => user.id === project.personId)?.name || '未知'}</td>
            </tr>)
        }
        </tbody>
    </table>
}