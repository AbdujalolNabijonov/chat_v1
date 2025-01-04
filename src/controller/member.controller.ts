import { T } from "../lib/types/common";
import { Request, Response } from "express"
import MemberService from "../model/Member.service";
import { Errors } from "../lib/ErrorHander";
import AuthService from "../model/Auth.service";
import { MemberLoginInput, MemberSignupInput } from "src/lib/types/member";
import { TOKEN_DURATION } from "../lib/config";
import { HttpCode } from "../lib/enums/Error";

const memberService = new MemberService()
const authService = new AuthService();

const memberController: T = {}

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: signup")
        const data = req.body;
        data.memberImage = req.file?.path.replace(/\\/g,"/")
        const result = await memberService.signup(data);
        const token = await authService.createToken(result);
        res.cookie(
            "accessToken",
            token,
            {
                maxAge: 1000 * 3600 * TOKEN_DURATION,
                httpOnly: false
            }
        )

        res.status(HttpCode.CREATED).json(result)
    } catch (err: any) {
        console.log(`ERROR: createMember: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(err)
    }
}

memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: login")
        const data: MemberLoginInput = req.body;

        const result = await memberService.login(data)

        const token = await authService.createToken(result) as string
        res.cookie(
            "accessToken",
            token,
            {
                maxAge: 1000 * 3600 * TOKEN_DURATION,
                httpOnly: false
            }
        )
        res.status(HttpCode.OK).json(result)
    } catch (err: any) {
        console.log(`ERROR: login: ${err}`)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)
    }
}

memberController.logout = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: logout");
        res.cookie("accessToken", null, { maxAge: 0, httpOnly: false });
        res.status(HttpCode.OK).json("sucess")
    } catch (err: any) {
        console.log(`Error: logout, ${err.message}`);
        res.status(HttpCode.INTERNAL_SERVER_ERROR).json(Errors.standard)
    }
}


export default memberController