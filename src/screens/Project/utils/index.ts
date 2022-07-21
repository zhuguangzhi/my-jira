import {useLocation} from "react-router";
import {useProjectDetails} from "../../../utils/project";
import {useUrlQueryParam} from "../../../hooks/url";
import {useCallback, useMemo} from "react";
import {useTask} from "../../../utils/task";

export const useProjectIdInUrl = () => {
    const {pathname} = useLocation();
    const id = pathname.match(/projects\/(\d+)/)?.[1];
    return Number(id);
};
export const useProjectInUrl = () => useProjectDetails(useProjectIdInUrl())
export const useKanbanSearchParams = () => ({projectId: useProjectIdInUrl()});

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
    const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
    const projectId = useProjectIdInUrl();
    return useMemo(
        () => ({
            projectId,
            typeId: Number(param.typeId) || undefined,
            processorId: Number(param.processorId) || undefined,
            tagId: Number(param.tagId) || undefined,
            name: param.name,
        }),
        [projectId, param]
    );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
    //从路由中获取相关参数
    const [{editingTaskId}, setEditingTaskId] = useUrlQueryParam([
        "editingTaskId",
    ]);
    const {data: editingTask, isLoading} = useTask(Number(editingTaskId));
    const startEdit = useCallback(
        (id: number) => {
            setEditingTaskId({editingTaskId: id});
        },
        [setEditingTaskId]
    );
    const close = useCallback(() => {
        setEditingTaskId({editingTaskId: ""});
    }, [setEditingTaskId]);
    return {
        editingTaskId,
        editingTask,
        startEdit,
        close,
        isLoading,
    };
};
