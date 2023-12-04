import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.connect(process.env.MONGODB_URI!)

export const db = {
    User: userModel(),
    Song: songModel(),
    Room: roomModel()
}

// mongoose models with schema definitions

function userModel(){
    const schema = new Schema({
        username: {type: String, required: true},
        hash: {type: String, required: true},
        // history: historyModel()
    }, {
        timestamps: true
    })

    schema.set('toJSON', {
        virtuals: true
    })

    return mongoose.models.User || mongoose.model('User', schema)
}

function songModel(){
    const schema = new Schema({
        name: {type: String, required: true}
    },{
        timestamps: true
    })

    schema.set('toJSON', {
        virtuals: true
    })

    return mongoose.models.Song || mongoose.model('Song', schema)
}

function roomModel(){
    const schema = new Schema({
        name: {type: String, required: true}
    }, {
        timestamps: true
    })

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret){
            ret.id = ret._id.toString()
            delete ret._id
            delete ret.__v
        }
    })

    return mongoose.models.Room || mongoose.model('Room', schema)
}

