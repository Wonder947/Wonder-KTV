'use client'

import { useFetch } from "@/_helpers/client/useFetch"
import { useRouter } from "next/navigation"

export default function LogoutBtn(){
    const fetch = useFetch()
    const router = useRouter()

    async function handleLogout(){
        try{
            await fetch.get('/api/account/logout')
            router.push('/start')
            router.refresh() // this is added to prevent showing the secured page if use back button of the browser after logged out
        }
        catch(err){
            console.log('from handleLogout', err)
        }
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}


