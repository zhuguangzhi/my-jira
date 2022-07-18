import React from 'react';
import {LoginComponent} from "./screens/login";
import {useAuth} from "./hooks/context/auth-context";
import {ProjectListScreen} from "./screens/project-list";

function App() {
    const {user} = useAuth()
    return (
        <div className="App">
            {
                user?.token ? <ProjectListScreen/> : <LoginComponent></LoginComponent>
            }
        </div>
    );
}

export default App;
