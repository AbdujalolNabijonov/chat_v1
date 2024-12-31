import { Errors } from "../lib/ErrorHander";
import { HttpCode, Message } from "../lib/enums/Error";
import MemberModel from "../schema/Member.schema"
import { MemberInput, Member } from "src/lib/types/member";



export default class MemberService {
    private readonly memberModel;
    constructor() {
        this.memberModel = MemberModel
    }

    public async signup(data: MemberInput): Promise<Member> {
        try {
            try {
                return await this.memberModel.create(data);
            } catch (err: any) {
                console.log(`DB ERROR: ${err.message}`)
                throw new Errors(HttpCode.BAD_REQUEST, Message.USED_INFO);
            }
        } catch (err: any) {
            throw err
        }
    }
}