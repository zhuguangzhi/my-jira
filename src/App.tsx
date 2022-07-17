import React from 'react';
import {LoginComponent} from "./screens/login";
import {useAuth} from "./hooks/context/auth-context";
import {ProjectList} from "./screens/project-list";

function App() {
    const {user} = useAuth()
    console.log('user', user)
    return (
        <div className="App">
            {
                user?.token ? <ProjectList/> : <LoginComponent></LoginComponent>
            }
        </div>
    );
}

export default App;
