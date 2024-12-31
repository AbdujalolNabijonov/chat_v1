import { T } from "../lib/types/common";
import { Request, Response } from "express"
import MemberService from "../model/Member.service";
import { Errors } from "../lib/ErrorHander";
import AuthService from "../model/Auth.service";
import { MemberLoginInput, MemberSignupInput } from "src/lib/types/member";
import { TOKEN_DURATION } from "../lib/config";

const memberService = new MemberService()
const authService = new AuthService();

const memberController: T = {}

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: signup")
        const data: MemberSignupInput = req.body;
        const result = await memberService.signup(data);

        const payload: T = { ...result };
        delete payload._id;
        const token = await authService.createToken(payload);
        console.log("token", token)
        res.cookie(
            "accessToken",
            token,
            {
                maxAge: 1000 * 3600 * TOKEN_DURATION,
                httpOnly: false
            }
        )

        res.status(201).json({ member: result })
    } catch (err: any) {
        console.log(`ERROR: createMember: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(err)
    }
}

memberController.login = (req: Request, res: Response) => {
    try {
        console.log("METHOD: login")
        const data: MemberLoginInput = req.body;

        const result = null
        res.send("hello world!")
    } catch (err: any) {
        console.log(`ERROR: login: ${err}`)
        res.send("bye world!")
    }
}


export default memberController