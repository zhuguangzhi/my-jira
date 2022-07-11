import React, {useEffect, useState} from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import qs from "qs";
import {cleanObject} from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectList = () => {
    const [param, setParam] = useState({
        name: "",
        personId: "",
    })
    const [list, setList] = useState([])
    const [user, setUser] = useState([
        {
            name: "",
            id: "",
        }
    ])
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if (!response.ok) return false;
            setList(await response.json())
        })
    }, [param])
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (!response.ok) return false;
            setUser(await response.json())
        })
    }, [])
    return <div>
        <SearchPanel param={param} setParam={setParam} user={user}></SearchPanel>
        <List list={list} user={user}></List>
    </div>
}