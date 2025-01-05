"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Member_service_1 = __importDefault(require("../model/Member.service"));
const ErrorHander_1 = require("../lib/ErrorHander");
const Auth_service_1 = __importDefault(require("../model/Auth.service"));
const config_1 = require("../lib/config");
const Error_1 = require("../lib/enums/Error");
const memberService = new Member_service_1.default();
const authService = new Auth_service_1.default();
const memberController = {};
memberController.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("METHOD: signup");
        const data = req.body;
        data.memberImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.replace(/\\/g, "/");
        const result = yield memberService.signup(data);
        const token = yield authService.createToken(result);
        res.cookie("accessToken", token, {
            maxAge: 1000 * 3600 * config_1.TOKEN_DURATION,
            httpOnly: false
        });
        res.status(Error_1.HttpCode.CREATED).json(result);
    }
    catch (err) {
        console.log(`ERROR: createMember: ${err.message}`);
        if (err instanceof ErrorHander_1.Errors)
            res.status(err.code).json(err);
        else
            res.status(ErrorHander_1.Errors.standard.code).json(err);
    }
});
memberController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("METHOD: login");
        const data = req.body;
        const result = yield memberService.login(data);
        const token = yield authService.createToken(result);
        res.cookie("accessToken", token, {
            maxAge: 1000 * 3600 * config_1.TOKEN_DURATION,
            httpOnly: false
        });
        res.status(Error_1.HttpCode.OK).json(result);
    }
    catch (err) {
        console.log(`ERROR: login: ${err}`);
        if (err instanceof ErrorHander_1.Errors)
            res.status(err.code).json(err);
        else
            res.status(ErrorHander_1.Errors.standard.code).json(ErrorHander_1.Errors.standard);
    }
});
memberController.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("METHOD: logout");
        res.cookie("accessToken", null, { maxAge: 0, httpOnly: false });
        res.status(Error_1.HttpCode.OK).json("success");
    }
    catch (err) {
        console.log(`Error: logout, ${err.message}`);
        res.status(Error_1.HttpCode.INTERNAL_SERVER_ERROR).json(ErrorHander_1.Errors.standard);
    }
});
exports.default = memberController;
