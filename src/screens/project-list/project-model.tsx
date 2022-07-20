import React from "react";
import {Button, Drawer} from "antd";
import {useSelector} from "react-redux";
import {projectModalOpen} from "../../store/module/project-list.slice";
import {useControlPopoverModel} from "../../hooks";

export const ProjectModal = () => {
    const popoverModel = useControlPopoverModel('close')
    //useSelector 获取根状态树的状态
    const modalOpen = useSelector(projectModalOpen)
    return (
        <Drawer
            onClose={() => popoverModel()}
            visible={modalOpen}
            width={"100%"}
        >
            <h1>Project Modal</h1>
            <Button onClick={() => popoverModel()}>
                关闭
            </Button>
        </Drawer>
    );
};
