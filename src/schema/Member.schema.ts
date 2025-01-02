import { Schema, model } from "mongoose"
import { Message } from "../lib/enums/Error"


export const memberSchema = new Schema({
    memberNick: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },
    memberPhone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },
    memberImage: {
        type: String,
        default: ""
    },
    memberPassword: {
        type: String,
        select: false,
        required: true,
        validate: {
            validator: (data: string): boolean => data.length > 5 && !data.includes(" "),
            message: Message.PASSWORD_LENGTH
        },
    }
}, { timestamps: true })


export default model("Member", memberSchema)