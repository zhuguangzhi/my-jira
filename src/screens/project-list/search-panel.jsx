import React from "react";


// eslint-disable-next-line react/prop-types
export const SearchPanel = ({param, setParam, user}) => {

    return <form>
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
            {/* eslint-disable-next-line react/prop-types */}
            <select value={param.personId} onChange={event => setParam({
                ...param,
                personId: event.target.value
            })}>
                <option value={''}>负责人</option>
                {

                    // eslint-disable-next-line react/prop-types
                    user.map(item => <option value={item.id} key={item.id}>{item.name}</option>)
                }
            </select>
        </div>
    </form>
}