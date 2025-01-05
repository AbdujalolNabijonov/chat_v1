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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../lib/config");
const Error_1 = require("../lib/enums/Error");
const ErrorHander_1 = require("../lib/ErrorHander");
class AuthService {
    constructor() { }
    createToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve, reject) => {
                    jsonwebtoken_1.default.sign(payload, config_1.SECRET_JWT, { expiresIn: `${config_1.TOKEN_DURATION}h` }, (err, token) => {
                        if (err) {
                            reject(new ErrorHander_1.Errors(Error_1.HttpCode.UNAUTHORIZED, Error_1.Message.TOKEN_CREATE_FAILED));
                        }
                        else {
                            resolve(token);
                        }
                    });
                });
            }
            catch (err) {
                console.log(`JWT ERROR: createToken, ${err.message}`);
                throw err;
            }
        });
    }
    verifyMember(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield jsonwebtoken_1.default.verify(token, config_1.SECRET_JWT);
            }
            catch (err) {
                console.log(`JWT ERROR: verifyMember, ${err.message}`);
            }
        });
    }
}
exports.default = AuthService;
