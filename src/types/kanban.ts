export interface Kanban {
    id: number;
    name: string;
    projectId: number;
    typeId: number;
}

export interface KanBanSortProps {
    // 要重新排序的 item
    fromId?: number;
    // 目标 item
    referenceId?: number;
    // 放在目标item的前还是后
    type: "before" | "after";
    fromKanbanId?: number;
    toKanbanId?: number;
}