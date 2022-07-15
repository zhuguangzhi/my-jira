// 封装axios--------------------------------------------------------------------------------------

import axios from "axios";
import * as auth from 'auth-provider'
import qs from "qs";
import {cleanObject} from "../utils";
import {message} from "antd";

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState({response}: any) {
    console.log('response', response)
    // 如果http状态码正常，则直接返回数据
    if (response.status >= 400) {
        message.error(response.data.message)
    }
}


async function apiAxios(method: string, url: string, params: any, header?: any) {
    if (!header) {
        header = {}
    }
    const token = auth.getToken()
    header = {
        ...header,
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': header['Content-Type'] ? header['Content-Type'] : 'application/json'
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
    const result: Promise<any> = new Promise((resolve, reject) => {
        axios(httpDefault).then(res => {
            return resolve(res.data)
        }).catch(response => {
            errorState(response)
            return reject(response)
        })
    })
    return await result
    // return axios(httpDefault)
    // if (!response.ok) return false;
    // return await response.json()
}

export default {
    get: (url: string, params: { [key: string]: unknown }, header?: any) => apiAxios('GET', url + "?" + qs.stringify(cleanObject(params)), {}, header),
    post: (url: string, params: object, header?: any) => apiAxios('POST', url, params, header),
    put: (url: string, params: object, header?: any) => apiAxios('PUT', url, params, header),
    delete: (url: string, params: object, header?: any) => apiAxios('DELETE', url, params, header),
    patch: (url: string, params: object, header?: any) => apiAxios('PATCH', url, params, header)

}