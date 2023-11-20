
import '../../lib/models'
import { songModel } from '../../lib/models'
import { addSong } from '../../lib/actions'
import dbConnect from '@/_copy/lib/dbConnect'
import { DisplayData, DisplayTest } from '../../lib/clientComponents'
// import { Display } from '../_components/clientComponents'




export default async function Page(){
    await dbConnect()
    const songs = await songModel.find()
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

