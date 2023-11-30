'use client'
import { useRouter } from "next/navigation"


export function useFetch(){
    const router = useRouter()

    return {
        get: request('GET'),
        post: request('POST')
    }

    function request(method: string){
        return (url: string, body?: any) => {
            const requestOpt: any = {
                method
            }
            if (body){
                requestOpt.headers = {'Content-Type': 'application/json'}
                requestOpt.body = JSON.stringify(body)
            }
            return fetch(url, requestOpt).then(handleResponse)
        }
    }

    // helper functions
    async function handleResponse(response: any){
        const isJson = response.headers?.get('content-type')?.includes('application/json')
        const data = isJson ? await response.json() : null

        // check for error response...
        if (!response.ok){
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error)
        }

        return data
    }
}
