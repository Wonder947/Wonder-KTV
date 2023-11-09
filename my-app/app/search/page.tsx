
import '../../lib/models'
import { songModel } from '../../lib/models'
import { addSong } from '../actions'
import dbConnect from '@/lib/dbConnect'
import { deleteSong } from '../actions'

function DeleteForm({songId}:{songId:string}){
    const id = songId.toString()

    return (
        <form action={deleteSong}>
            <input type='hidden' name='songid' value={id} />
            <button type='submit'>Delete</button>
        </form>
    )
}



export default async function Page(){
    await dbConnect()
    const songs = await songModel.find()

    return (
        <>
            <form action={addSong}>
                <label htmlFor="song">Add a song name:</label>
                <input type="text" id="song" name="song" required />
                <button type="submit">Add</button>
            </form>
            <ul>
                {songs.map((song)=>(<li key={song._id}>{song.name} <DeleteForm songId={song._id} /></li>))}
            </ul>
        </>
    )
}

