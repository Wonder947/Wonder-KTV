'use server'

import { revalidatePath } from "next/cache"
import { db } from "./db"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function addSong(formData: FormData){
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


// helper functions
export async function authenticate({username, password}: {username: string, password: string}){
    const user = await db.User.findOne({username})
    if (!(user && bcrypt.compareSync(password, user.hash))){
        throw 'Username or password is incorrect'
    }
    // create a jwt token that is valid for 10 days
    const token = jwt.sign({sub: user.id}, process.env.JWT_SECRET!, {expiresIn: '10d'})

    return {
        user: user.toJSON(),
        token
    }
}
