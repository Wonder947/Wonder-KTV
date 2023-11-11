import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

dbConnect()

console.log("!!!!!!called from ./lib/models.ts")

//here are my interfaces
export interface IntSong{
    id: string
    name: string
}


//here are my schemas
export const SongSchema = new mongoose.Schema({
    name: String
})

const Review = new mongoose.Schema({
    courseNumber: {type: String, required: true},
    courseName: {type: String, required: true},
    semester: {type: String, required: true},
    year:{type: Number, required: true},
    professor: {type: String, required: true},
    review: {type: String, required: true}
});


// here are my models
// export const songModel = mongoose.models.Song || mongoose.model("Song", SongSchema)
export const songModel = mongoose.model('Song') || mongoose.model('Song', SongSchema)

// export interface Songs extends mongoose.Document{
//     name: string
//     path: string
//     accompanient: boolean
//     duration: string
//     description: string
// }

// const SongSchema = new mongoose.Schema<Songs>({
//     name: {
//         type: String,
//         required: true
//     },
//     path: {
//         type: String,
//         required: true
//     },
//     accompanient: {
//         type: Boolean,
//         required: true
//     },
//     duration: String,
//     description: String
// })

// export default mongoose.models.Song || mongoose.model<Songs>('Song', SongSchema)
