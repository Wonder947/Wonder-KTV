'use server'

import { db } from "./db"


// this function provides an endpoint for user to get Song doc of myDb by name
// it first looks into the db by name, 
// if find, return the Song doc
// else not found, search by name on youtube
// save the youtube result into db
// return that Song doc
export async function getSongByName(name: string, original: string){
    const Song = db.Song
    const dbRes = await Song.find({name: name}) // to be revised
    if (dbRes.length!=0){
        console.log('using database!!!!',dbRes[0])
        return dbRes[0]
    }
    // else get it from youtube
    const ytResult = await getSongFromYoutube(name, original)
    // then save it to the db
    const song = new Song({
        name: name,
        ytVideoId: ytResult
    })
    await song.save()
    console.log('using youtube api !!!!', song)
    return song
}

// input song name, return videoId
export async function getSongFromYoutube(name: string, original: string){
    const apiKey = process.env.YOUTUBE_API_KEY
    const q = 'ktv' + (original==='original' ? '原唱 ' : '伴奏 ') + name
    console.log("youtube query parameter is :", q)
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${apiKey}`;
    let result

    try {
        const response = await fetch(url)
        if (!response.ok){
            throw new Error("failed to fetch data from youtube api")
        }
        result = await response.json()
        result = result.items[0].id.videoId
        console.log("yt video id", result)
        return result        
    } catch (error) {
        console.error('YouTube API error:', error)
    }
}

