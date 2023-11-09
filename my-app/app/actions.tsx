'use server'
import { songModel } from "@/lib/models"
import '../lib/models'
import { revalidatePath } from "next/cache"
import dbConnect from "@/lib/dbConnect"

export async function addSong(formData: FormData){
    await dbConnect()
    const song = songModel
    const songDoc = new song({
        name: formData.get("song")
    })
    await songDoc.save()
    console.log("!!!!!!added song", songDoc._id.toString())
    revalidatePath('/search')
}

export async function deleteSong(formData: FormData){
    // await dbConnect()
    await songModel.findByIdAndDelete(formData.get('songid'))
    console.log("!!!!!!deleted song", formData.get('songid'))
    revalidatePath('/search')
}


