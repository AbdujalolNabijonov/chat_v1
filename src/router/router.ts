import {Router} from "express"
import memberController from "src/controller/member.controller";

const router = Router();

router.post("/sigup", memberController.signup)
router.get("/login", memberController.login)

export default router
