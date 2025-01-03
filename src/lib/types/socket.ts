import { Member } from "./member";

export interface InfoMessagePayload {
    event: string;
    totalClients: number;
    memberData: any;
    action: string;
}

export interface MessagePayload{
    event:string;
    text:string,
    memberData:Member;
    action:string;
}

export interface GetMessagesPayload{
    event:string;
    list:MessagePayload[];
}