import { T } from "../lib/types/common";
import { Request, Response } from "express"
import MemberService from "../model/Member.service";
import { Errors } from "../lib/ErrorHander";
import AuthService from "../model/Auth.service";

const memberService = new MemberService()
const authService = new AuthService();

const memberController: T = {}

memberController.signup = async (req: Request, res: Response) => {
    try {
        console.log("METHOD: signup")
        const data = req.body;
        const result = await memberService.signup(data);

        const payload: T = { ...result };
        delete payload._id;
        const token = await authService.createToken(payload);
        res.cookie("accessToken", token)

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
        res.send("hello world!")
    } catch (err: any) {
        console.log(`ERROR: login: ${err}`)
        res.send("bye world!")
    }
}


export default memberController