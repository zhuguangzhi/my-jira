import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DevTools, loadServer} from "jira-dev-tool";
//需覆盖 loadDevTools
import 'antd/dist/antd.less'
import {AppProvider} from "./hooks/context";

import './App.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
window.localStorage.setItem('__jira__project', JSON.stringify([
    {
        "created": 1604989757139,
        "id": 6,
        "name": "快递管理",
        "organization": "快递组",
        "ownerId": 180161386,
        "personId": 2,
    },
    {
        "id": 1,
        "name": "骑手管理",
        "organization": "外卖组",
        "personId": 1,
        "created": 1604989757139,
        "ownerId": 180161386,
    },
    {
        "id": 2,
        "name": "团购 APP",
        "organization": "团购组",
        "personId": 2,
        "created": 1604989757139,
        "ownerId": 180161386,
    },
    {
        "id": 3,
        "name": "物料管理系统",
        "organization": "物料组",
        "personId": 2,
        "created": 1604989757139,
        "ownerId": 180161386,
    },
    {
        "id": 4,
        "name": "总部管理系统",
        "organization": "总部",
        "personId": 3,
        "created": 1604989757139,
        "ownerId": 180161386,
    },
    {
        "id": 5,
        "name": "送餐路线规划系统",
        "organization": "外卖组",
        "personId": 4,
        "created": 1604989757139,
        "ownerId": 180161386,
    },

]))
loadServer(() => root.render(
    <AppProvider>
        <React.StrictMode>
            <DevTools/>
            <App/>
        </React.StrictMode>
    </AppProvider>
));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
