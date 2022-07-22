import React from 'react';
import {useAuth} from "./hooks/context/auth-context";
// import {ProjectListScreen} from "./screens/project-list";
// import {LoginComponent} from "./screens/login";
import {FullPageLoading} from "./components/FullPageLoading";

const LoginComponent = React.lazy(() => import('./screens/login'))
const ProjectListScreen = React.lazy(() => import('./screens/project-list'))


function App() {
    const {user} = useAuth()
    return (
        <div className="App">
            {/*懒加载 加载间隙执行 FullPageLoading*/}
            <React.Suspense fallback={<FullPageLoading/>}>
                {user?.token ? <ProjectListScreen/> : <LoginComponent></LoginComponent>}
            </React.Suspense>
            {/*{user?.token ? <ProjectListScreen/> : <LoginComponent/>}*/}
        </div>
    );
}

export default App;
