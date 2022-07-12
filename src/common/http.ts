// 封装axios--------------------------------------------------------------------------------------
import axios from "axios";

async function apiAxios(method: string, url: string, params: any, header?: any) {
    if (!header) {
        header = {}
    }

    // const accountStore = account()
    // 从state中取出token
    // if(accountStore.token){
    //     header.token = accountStore.token
    // } else {
    //     console.log('token为空')
    // }

    const httpDefault: any = {
        method: method,
        url: url,
        // `params` 是即将与请求一起发送的 URL 参数
        // `data` 是作为请求主体被发送的数据
        params: method === 'GET' ? params : null,
        data: method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH' ? params : {},
        timeout: 30000
    }

    // 如果headers中还需要其他信息可以在这边合并
    httpDefault.headers = {
        ...header
    }
    return axios(httpDefault);
    // if (!response.ok) return false;
    // return await response.json()
}

export default {
    get: (url: string, params?: any, header?: any) => apiAxios('GET', url, params, header),
    post: (url: string, params?: any, header?: any) => apiAxios('POST', url, params, header),
    put: (url: string, params?: any, header?: any) => apiAxios('PUT', url, params, header),
    delete: (url: string, params?: any, header?: any) => apiAxios('DELETE', url, params, header),
    patch: (url: string, params?: any, header?: any) => apiAxios('PATCH', url, params, header)

}