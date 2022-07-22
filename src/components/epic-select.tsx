import React from "react";
import {IdSelect} from "components/id-select";
import {useEpic} from "../utils/epic";

export const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const {data: epics} = useEpic();
    return <IdSelect option={epics || []} {...props} />;
};
