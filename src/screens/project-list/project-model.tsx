import React, {useEffect} from "react";
import {Button, Drawer, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {projectListActions, projectModalOpen} from "../../store/module/project-list.slice";
import {useControlPopoverModel} from "../../hooks";
import {RootState} from "../../store";
import styled from "@emotion/styled";
import {UserSelect} from "../../components/user-select";
import {ProjectProp} from "../../types";
import {useAddProject, useEditProject} from "../../utils/project";

export const ProjectModal = () => {
    const projectInfo: ProjectProp | null = useSelector((state: RootState) => state.projectList.projects)
    const projectType: 'add' | 'edit' = useSelector((state: RootState) => state.projectList.type)
    const mutateAsync = projectType === 'add' ? useAddProject : useEditProject
    const {mutate, isLoading: mutateLoading} = mutateAsync()
    const popoverModel = useControlPopoverModel('close')
    //useSelector 获取根状态树的状态
    const modalOpen = useSelector(projectModalOpen)
    console.log('modalOpen', modalOpen)

    const dispatch = useDispatch()
    const title = projectInfo != null ? "编辑项目" : "创建项目";
    const [form] = Form.useForm()

    const closeModal = () => {
        form.resetFields();
        dispatch(projectListActions.setProjectList(null))
        dispatch(projectListActions.setType(null))
        popoverModel()
    }
    const onFinish = (param: Partial<ProjectProp>) => {
        mutate({...projectInfo, ...param})
        closeModal()
    }
    useEffect(() => {
        if (projectInfo != null)
            form.setFieldsValue(projectInfo);
    }, [projectInfo, form]);
    return (
        <Drawer
            onClose={closeModal}
            visible={modalOpen}
            width={"100%"}
        >
            <Container>
                <h1>{title}</h1>
                <Form
                    form={form}
                    layout={"vertical"}
                    style={{width: "400rem"}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={"名称"}
                        name={"name"}
                        rules={[{required: true, message: "请输入项目名"}]}
                    >
                        <Input placeholder={"请输入项目名称"}/>
                    </Form.Item>

                    <Form.Item
                        label={"部门"}
                        name={"organization"}
                        rules={[{required: true, message: "请输入部门名"}]}
                    >
                        <Input placeholder={"请输入部门名"}/>
                    </Form.Item>

                    <Form.Item label={"负责人"} name={"personId"}>
                        <UserSelect defaultOptionName={"负责人"}/>
                    </Form.Item>

                    <Form.Item style={{textAlign: "right"}}>
                        <Button
                            loading={mutateLoading}
                            type={"primary"}
                            htmlType={"submit"}
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>


            </Container>
        </Drawer>
    );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

