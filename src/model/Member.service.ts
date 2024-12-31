import { T } from "src/lib/types/common";
import { Errors } from "../lib/ErrorHander";
import { HttpCode, Message } from "../lib/enums/Error";
import MemberModel from "../schema/Member.schema"
import { MemberSignupInput, Member, MemberLoginInput } from "../lib/types/member";
import * as argon from "argon2"



export default class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel
    }

    public async signup(data: MemberSignupInput): Promise<Member> {
        try {
            const { memberNick, memberPassword } = data;
            if (memberNick.length < 2 || memberPassword.length < 3) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

            data.memberPassword = await argon.hash(memberPassword);
            try {
                const member = await this.memberModel.create(data)
                return member
            } catch (err: any) {
                console.log(`DB ERROR: ${err.message}`)
                throw new Errors(HttpCode.BAD_REQUEST, Message.USED_INFO);
            }
        } catch (err: any) {
            throw err
        }
    }
    public async login(data: MemberLoginInput): Promise<Member> {
        try {
            const { memberNick, memberPassword } = data;

            const exist = await this.memberModel.findOne({ memberNick })
                .select("+memberPassword")
                .lean()
                .exec();

            if (!exist) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.NO_DATA_FOUND);

            const isMatch = await argon.verify(exist.memberPassword, memberPassword);
            delete exist.memberPassword
            if (!isMatch) throw new Errors(HttpCode.BAD_REQUEST, Message.WRONG_PASSWORD)
            return exist
        } catch (err: any) {
            throw err
        }
    }
}