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
    await dbConnect()
    await songModel.findByIdAndDelete(formData.get('songid'))
    revalidatePath('/search')
}

export async function updatePath(p: string){
    console.log('handleClicking...')
    revalidatePath('/search')
}

export async function retrieveData(test: string){
    const res = await songModel.find()
    const data = res.map((raw)=>({id: raw._id.toString(), name: raw.name}))
    return data
}

export async function refresh(){
    console.log("!!!refresh is called")
    revalidatePath('/search')
}

export const fetcher = async (modelName: string) => {
    let model
    if (modelName == 'songModel') {
        model = songModel
    }else{
        model = songModel
    }
    const res = await model.find()
    const data = res.map((raw)=>({id: raw._id.toString(), name: raw.name}))
    return data
}


