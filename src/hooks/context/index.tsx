import React, {ReactNode} from "react";
import {AuthProvider} from "./auth-context";
import {Provider} from "react-redux";
import {store} from "../../store";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


export const AppProvider = ({children}: { children: ReactNode }) => {
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Provider>
    </QueryClientProvider>

}