'use server'
import { songModel } from "@/lib/models"
import '../lib/models'
import { revalidatePath } from "next/cache"

export async function addSong(formData: FormData){
    const song = songModel
    const songDoc = new song({
        name: formData.get("song")
    })
    await songDoc.save()
    console.log("!!!!!!added song", songDoc._id.toString())
    revalidatePath('/search')
}

export async function deleteSong(formData: FormData){
    await songModel.findByIdAndDelete(formData.get('songid'))
    console.log("!!!!!!deleted song", formData.get('songid'))
    revalidatePath('/search')
}


