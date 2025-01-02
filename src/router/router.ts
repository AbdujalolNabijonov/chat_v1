import { Router } from "express"
import memberController from "../controller/member.controller";
import targetUploader from "../lib/utility/multer";

const router = Router();

router.post("/signup", targetUploader("member").single('memberImage'), memberController.signup)
router.post("/login", memberController.login)
router.get("/logout", memberController.logout)

export default router
