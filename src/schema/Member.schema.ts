import { Schema, model } from "mongoose"


export const memberSchema = new Schema({
    memberNick: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },
    memberImage: {
        type: String,
        default: ""
    }
}, { timestamps: true })


export default model("Member", memberSchema)