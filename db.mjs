import './config.mjs';
import mongoose from "mongoose";

mongoose.connect(process.env.DSN);

// my schemas go here
const YoutubeSong = new mongoose.Schema({
    name: {type: String, required: true},
    accompaniment: Boolean,
    duration: String,
    description: String
});

mongoose.model('Song', YoutubeSong);


