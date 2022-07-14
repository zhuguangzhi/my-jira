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
