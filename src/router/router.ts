import {Router} from "express"
import memberController from "../controller/member.controller";

const router = Router();

router.post("/signup", memberController.signup)
router.post("/login", memberController.login)

export default router
