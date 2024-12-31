import { Message } from "src/lib/enums/Message";
import MemberModel from "../schema/Member.schema"
import { MemberInput, Member } from "src/lib/types/member";



export default class MemberService {
    private readonly memberModel;
    constructor() {
        this.memberModel = MemberModel
    }

    public async createMember(data: MemberInput): Promise<Member> {
        try {
            try {
                return await this.memberModel.create(data);
            } catch (err: any) {
                console.log(`DB ERROR: ${err.message}`)
                throw new Error(Message.USED_INFO);
            }
        } catch (err: any) {
            throw err
        }
    }
}