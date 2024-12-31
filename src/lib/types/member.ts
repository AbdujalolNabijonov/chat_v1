import { ObjectId } from "mongoose"

export interface Member {
    _id: ObjectId
    memberNick: string
    memberImage: string
    updatedAt: Date
    createdAt: Date
}


export interface MemberSignupInput {
    memberNick: string;
    memberImage?: string;
    memberPassword: string
}

export interface MemberLoginInput{

}
