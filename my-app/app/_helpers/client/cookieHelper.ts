'use client'


export const getCookies = (cookieString: string)=>{
    const cStr = cookieString
    const result = cStr.split(';').reduce((accu: any, curr: any)=>{
        const [name, value] = curr.split('=')
        accu[name.trim()] = value
        return accu
    }, {})
    return result
}


