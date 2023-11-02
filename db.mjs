import './config.mjs';
import mongoose from "mongoose";

mongoose.connect(process.env.DSN);

// my schemas go here
const YoutubeSongSchema = new mongoose.Schema({
    name: {type: String, required: true},
    path: {type: String, required: true}, // source of the video, currently using youtubeVideoId
    accompaniment: {type: Boolean, required: true}, //original, or with accompaniment
    duration: String,
    description: String
});

const UserSchema = new mongoose.Schema({
  registered: {type: Boolean, required: true},
  username: String,
  password: {type: String, minLength: 8},
  history: String,
  room: String  
});

const RoomSchema = new mongoose.Schema({
    name: {type: String, required: true},
    playlist: [mongoose.Types.ObjectId],
    members: [mongoose.Types.ObjectId],
    board: String
})

const RecordSchema = new mongoose.Schema({
    timeAdded: {type: String, required: true},
    songName: {type: String, required: true}
})

const HistorySchema = new mongoose.Schema({
    user: {type: String, required: true},
    records: [RecordSchema]
})


mongoose.model('Song', YoutubeSongSchema);
mongoose.model('User', UserSchema);
mongoose.model('Room', RoomSchema);
mongoose.model("History", HistorySchema);

