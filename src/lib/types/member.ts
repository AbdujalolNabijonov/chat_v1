import { ObjectId } from "mongoose"

export interface Member {
    _id: ObjectId
    memberNick: string
    memberImage: string
    updatedAt: Date
    createdAt: Date
}


export interface MemberInput {
    memberNick: string;
    memberImage?: string
}
