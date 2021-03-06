import React from "react";
import {ProjectProp, UserProp} from "../../types";
import {Button, Dropdown, Menu, Table, TableProps} from "antd";
import {ColumnsType} from "antd/lib/table";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import {Pin} from "../../components/pin";
import {useControlPopoverModel} from "../../hooks";
import {useDeleteProject, useEditProject} from "../../utils/project";
import {useDispatch} from "react-redux";
import {projectListActions} from "../../store/module/project-list.slice";

interface ListProps extends TableProps<ProjectProp> {
    user: UserProp[],
    reFresh?: () => () => void
}

export const List = ({user, reFresh, ...props}: ListProps) => {
    const popoverModel = useControlPopoverModel('open')
    const {mutate} = useEditProject()
    const {mutate: delMutate} = useDeleteProject()
    const CollectProject = (param: Partial<ProjectProp>) => mutate(param)
    const dispatch = useDispatch()

    const onMenuMethod = (e: string, row: ProjectProp) => {
        if (e === 'edit') {
            dispatch(projectListActions.setProjectList(row))
            dispatch(projectListActions.setType('edit'))
            popoverModel()
            return false
        }
        //    删除
        delMutate(row)

    }

    const MenuItem = [
        {key: "edit", label: "编辑"},
        {key: "del", label: "删除"},
    ]
    const columns: ColumnsType<ProjectProp> = [
        {
            title: <Pin checked={true} disabled={true}></Pin>,
            dataIndex: 'pin',
            render(value, rows) {
                return <Pin checked={value} onCheckedChange={(pin) => CollectProject({id: rows.id, pin})}/>
            }
        },
        {
            title: "名称",
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(cellValue, rows) {
                return <Link to={`/projects/${rows.id}/kanban`}>{cellValue}</Link>
            }
        },
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
        }, {
            render(value, row) {
                return <Dropdown overlay={
                    <Menu onClick={(e) => onMenuMethod(e.key, row)} items={MenuItem}/>
                }>
                    <Button type={"link"}>...</Button>
                </Dropdown>
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