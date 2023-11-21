import mongoose from "mongoose"

const Schema = mongoose.Schema
mongoose.connect(process.env.MONGODB_URI!)

export const db = {
    User: userModel()
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

function historyModel(){

}

