import { T } from "../lib/types/common";
import { Request, Response } from "express"
import Member from "../model/Member.service";

const memberService = new Member()
const memberController: T = {}

memberController.createMember = async (req: Request, res: Response) => {
    try {
        const result = memberService.createMember()
        res.status(201).json({ member: result })
    } catch (err: any) {
        console.log(`ERROR: createMember: ${err.message}`);
        res.status(400).json(err)
    }
}



export default memberController