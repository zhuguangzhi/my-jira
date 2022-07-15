import React from "react";
import {ProjectProp, UserProp} from "../../types";
import {Table, TableProps} from "antd";
import {ColumnsType} from "antd/lib/table";
import dayjs from "dayjs";

interface ListProps extends TableProps<ProjectProp> {
    user: UserProp[]
}

export const List = ({user, ...props}: ListProps) => {
    const columns: ColumnsType<ProjectProp> = [
        {title: "名称", dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name)},
        {title: "部门", dataIndex: "organization"},
        {
            title: "负责人",
            render(value, project) {
                return <span key={project.id}>
                {user.find(user => user.id === project.personId)?.name || '未知'}
            </span>
            }
        },
        {
            title: "创建时间", render(value, project) {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : "无"}
                </span>
            }
        }

    ]
    return <Table rowKey={record => record.id} pagination={false} columns={columns} {...props}/>
    // return <table border={1}>
    //     <thead>
    //     <tr>
    //         <td>名称</td>
    //         <td>负责人</td>
    //     </tr>
    //     </thead>
    //     <tbody>
    //     {
    //         list.map((project, index) => <tr key={index}>
    //             <td>{project.name}</td>
    //             <td></td>
    //         </tr>)
    //     }
    //     </tbody>
    // </table>
}