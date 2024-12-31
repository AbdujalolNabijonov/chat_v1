import { T } from "../lib/types/common";
import { Request, Response } from "express"
import MemberService from "../model/Member.service";
import { Errors } from "../lib/ErrorHander";

const memberService = new MemberService()
const memberController: T = {}

memberController.signup = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await memberService.signup(data)
        res.status(201).json({ member: result })
    } catch (err: any) {
        console.log(`ERROR: createMember: ${err.message}`);
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard)
    }
}




export default memberController