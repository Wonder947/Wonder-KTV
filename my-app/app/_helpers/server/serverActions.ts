'use server'

import { revalidatePath } from "next/cache"
import { db } from "./db"

export async function addSong(formData: FormData){
    // await dbConnect()
    // const song = songModel
    const Song = db.Song
    const songDoc = new Song({
        name: formData.get("song")
    })
    await songDoc.save()
    console.log("!!!!!!added song", songDoc._id.toString())
    revalidatePath('/search')
}

export async function retrieveData(test: string){
    const res = await db.Song.find()
    const data = res.map((raw)=>({id: raw._id.toString(), name: raw.name}))
    return data
}

export async function updatePath(p: string){
    console.log('handleClicking...')
    revalidatePath('/search')
}

export async function deleteSong(formData: FormData){
    await db.Song.findByIdAndDelete(formData.get('songid'))
    revalidatePath('/search')
}
