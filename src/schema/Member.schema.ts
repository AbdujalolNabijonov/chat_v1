import { Schema, model } from "mongoose"


const memberSchema = new Schema({
    memberNick: {
        type: String,
        require: true,
        index: { unique: true, sparse: true }
    },
    memberImage: {
        type: String
    }
}, { timestamps: true })


export default model("Member", memberSchema)