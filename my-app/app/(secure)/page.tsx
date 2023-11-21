'use client'
import { useUserService } from "@/_services/useUserService"
import { useEffect } from "react"

export default function Page(){
    const userService = useUserService()
    const user = userService.currentUser

    useEffect(()=>{
        userService.getCurrent()
    }, [])

    return (
        <>
            <h2>Welcome to the HomePage</h2>
            <h2>Welcome back @ {user?.username}</h2>
        </>
    )
}

