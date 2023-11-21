'use client'

import { deleteSong, retrieveData, updatePath } from "@/_helpers/server/serverActions"
import { useEffect, useState } from "react"

export function DisplayTest({data2}:{data2: any}){
    const [data, setData] = useState<{id:string,name:string}[]>(data2)
    const [refreshToken, setRefreshToken] = useState(11)
    useEffect(()=>{
        retrieveData('test')
            .then((value)=>{
                setData(value)
            }).finally(()=>{
                setTimeout(()=>setRefreshToken(Math.random()), 1000)
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

function DeleteForm({songId}:{songId:string}){

    return (
        <form action={deleteSong}>
            <input type='hidden' name='songid' value={songId} />
            <button type='submit'>Delete</button>
        </form>
    )
}