'use client'

import { deleteSong, refresh } from "../actions"
import { IntSong } from "@/lib/models"
import { updatePath } from "../actions"

import useSWR from "swr"
import { fetcher } from "../actions"
import Script from "next/script"
import { revalidatePath } from "next/cache"
import { useState } from "react"
import { useEffect } from "react"
import { retrieveData } from "../actions"
import { songModel } from "@/lib/models"
import dbConnect from "@/lib/dbConnect"

export function DeleteForm({songId}:{songId:string}){

    return (
        <form action={deleteSong}>
            <input type='hidden' name='songid' value={songId} />
            <button type='submit'>Delete</button>
        </form>
    )
}

export function DisplayData({data}:{data: Array<IntSong>}){
    const songs = data
    function handleClick(){
        console.log("!!!updating..")
        updatePath('test')
    }

    return (
        <>
            <ul >
                {songs.map((song)=>(<li key={song.id}>{song.name} <DeleteForm songId={song.id} /></li>))}
            </ul>
            <button id='update' onClick={handleClick}>Update</button>
        </>
    )
}

export function DisplayTest({data2}:{data2: Array<IntSong>}){
    const [data, setData] = useState<{id:string,name:string}[]>(data2)
    const [refreshToken, setRefreshToken] = useState(11)
    useEffect(()=>{
        retrieveData('test')
            .then((value)=>{
                setData(value)
            }).finally(()=>{
                setTimeout(()=>setRefreshToken(Math.random()), 1)
            })

    }, [refreshToken])
    function handleClick(){
        console.log("!!!updating..")
        updatePath('test')
    }

    return (
        <>
            <ul >
                {data.map((song)=>(<li key={song.id}>{song.name} <DeleteForm songId={song.id} /></li>))}
            </ul>
            <button id='update2' onClick={handleClick}>Update</button>
        </>
    )
}

// export function Display(){
    
//     const {data, error, isLoading} = useSWR('song', fetcher)
//     if (error) return <div>failed to load</div>
//     if (isLoading) return <div>loading...</div>

//     const songs = data

//     return (
//         <div>
//             <ul>
//                 {songs.map((song)=>(<li key={song.id}>{song.name}</li>))}
//             </ul>
//         </div>
//     )
// }

