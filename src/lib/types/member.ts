import { ObjectId } from "mongoose"

export interface Member {
    _id: ObjectId
    memberNick: string
    memberPhone: string
    memberImage: string
    updatedAt: Date
    createdAt: Date
}


export interface MemberSignupInput {
    memberNick: string;
    memberImage?: string;
    memberPassword: string
    memberPhone:string
}

export interface MemberLoginInput {
    memberNick: string;
    memberPassword: string;
}
