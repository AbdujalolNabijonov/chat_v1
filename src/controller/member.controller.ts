import { T } from "../lib/types/common";
import { Request, Response } from "express"
import MemberService from "../model/Member.service";

const memberService = new MemberService()
const memberController: T = {}

memberController.createMember = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await memberService.createMember(data)
        res.status(201).json({ member: result })
    } catch (err: any) {
        console.log(`ERROR: createMember: ${err.message}`);
        res.status(400).json(err)
    }
}



export default memberController