import { DisplayTest } from "@/_components/DisplayTest"
import { db } from "@/_helpers/server/db"
import { addSong } from "@/_helpers/server/serverActions"


export default async function Page(){
    const songs = await db.Song.find()
    const mySongs = songs.map((song)=>({id: song._id.toString(), name: song.name})) //convert mongoDB document to plain object

    return (
        <>
            <form action={addSong}>
                <label htmlFor="song">Add a song name:</label>
                <input type="text" id="song" name="song" required />
                <button type="submit">Add</button>
            </form>
            {/* <DisplayData data={mySongs} /> */}
            {/* <Display /> */}
            <DisplayTest data2={mySongs} />
        </>
    )
}

