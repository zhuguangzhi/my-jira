import React from "react";
import {UserProp} from "../../types";

type SearchPanelProps = {
    user: UserProp[],
    param: {
        personId: string,
        name: string
    },
    setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({param, setParam, user}: SearchPanelProps) => {

    return <form>
        <div>
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
            <select value={param.personId} onChange={event => setParam({
                ...param,
                personId: event.target.value
            })}>
                <option value={''}>负责人</option>
                {
                    user.map(item => <option value={item.id} key={item.id}>{item.name}</option>)
                }
            </select>
        </div>
    </form>
}