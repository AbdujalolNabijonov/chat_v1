"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = __importDefault(require("../controller/member.controller"));
const multer_1 = __importDefault(require("../lib/utility/multer"));
const router = (0, express_1.Router)();
router.post("/signup", (0, multer_1.default)("member").single('memberImage'), member_controller_1.default.signup);
router.post("/login", member_controller_1.default.login);
router.get("/logout", member_controller_1.default.logout);
exports.default = router;
