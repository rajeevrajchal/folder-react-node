import axios, { AxiosRequestConfig, Method } from 'axios'

interface CallAxiosAPI {
    url: string
    method: Method
    data?: any
    headers?: any
    params?: any
    isAuthentication?: boolean
}

const baseUrl = process.env.NEXT_APP_API_URL

export const callAxios = async <T>({ url, method, data, headers, params }: CallAxiosAPI) => {
    const config: AxiosRequestConfig<any> = {
        method: method || 'GET',
        url: `${baseUrl}/${url}`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...headers,
        },
        data,
        params,
        timeout: 20000, // 20 seconds
    }
    return axios(config)
        .then(res => {
            return res
        })
        .catch(async err => {
            console.log('err', err);
            
            // const status = err?.response?.status
            // const message = err?.response?.data?.message
            // if (parseInt(status, 10) === 401) {
            //     throw new Error(status || 'Server Down')
            // }
        })
}
