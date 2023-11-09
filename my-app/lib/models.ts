import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";

dbConnect()

console.log("!!!!!!called from ./lib/models.ts")

//here are my interfaces
export interface IntSong{
    name: string
}


//here are my schemas
const SongSchema = new mongoose.Schema({
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
export const reviewModel = mongoose.models.Review || mongoose.model("Review", Review)
export const songModel = mongoose.models.Song || mongoose.model("Song", SongSchema)


// export const Review_m = mongoose.model("Review")




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
