'use server'

import { revalidatePath } from "next/cache"
import { db } from "./db"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getSongByName } from "./songActions"

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


// rooms functions
export async function createNewRoom(roomname: string){
    const Room = db.Room
    const newRoom = new Room({name: roomname})
    await newRoom.save()
    console.log("added new Room", newRoom.id)
}

export async function getRooms(){
    const Room = db.Room
    const rooms = await Room.find()
    const result = rooms.map((room)=>{
        return room.toJSON()
    })
    // console.log("rooms", result)
    return result
}

export async function getRoomInfo(id: string){
    const Room = db.Room
    const room = await Room.findById(id)
    const result = room.toJSON()
    // console.log("room info", result)
    return result
}

export async function addSongToRoom(songName: string, roomId: string){
    console.log('adding song:', songName, 'to room:', roomId)
    const Room = db.Room
    const room = await Room.findById(roomId)
    let song = await getSongByName(songName)
    song = song.toJSON()
    const addedTime = new Date().getTime()/1000
    room.songList.push({songId:song.id, songName:song.name, addedTime: addedTime, ytVideoId: song.ytVideoId})
    await room.save()
}

export async function deleteSongFromRoom(songAddedTime: number, roomId: string){
    const Room = db.Room
    const room = await Room.findById(roomId)
    room.songList = room.songList.filter((song: any)=>{
        return song.addedTime != songAddedTime
    })
    await room.save()
}


