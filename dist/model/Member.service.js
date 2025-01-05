"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const ErrorHander_1 = require("../lib/ErrorHander");
const Error_1 = require("../lib/enums/Error");
const Member_schema_1 = __importDefault(require("../schema/Member.schema"));
const argon = __importStar(require("argon2"));
class MemberService {
    constructor() {
        this.memberModel = Member_schema_1.default;
    }
    signup(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { memberNick, memberPassword } = data;
                if (memberNick.length < 2 || memberPassword.length < 3)
                    throw new ErrorHander_1.Errors(Error_1.HttpCode.BAD_REQUEST, Error_1.Message.CREATE_FAILED);
                data.memberPassword = yield argon.hash(memberPassword);
                try {
                    const member = yield this.memberModel.create(data);
                    return member.toObject();
                }
                catch (err) {
                    console.log(`DB ERROR: ${err.message}`);
                    throw new ErrorHander_1.Errors(Error_1.HttpCode.BAD_REQUEST, Error_1.Message.USED_INFO);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { memberNick, memberPassword } = data;
                const exist = yield this.memberModel.findOne({ memberNick })
                    .select("+memberPassword")
                    .lean()
                    .exec();
                if (!exist)
                    throw new ErrorHander_1.Errors(Error_1.HttpCode.INTERNAL_SERVER_ERROR, Error_1.Message.NO_DATA_FOUND);
                const isMatch = yield argon.verify(exist.memberPassword, memberPassword);
                if (!isMatch)
                    throw new ErrorHander_1.Errors(Error_1.HttpCode.BAD_REQUEST, Error_1.Message.WRONG_PASSWORD);
                return yield this.memberModel.findOne({ memberNick }).lean();
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = MemberService;
