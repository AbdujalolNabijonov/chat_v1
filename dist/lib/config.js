"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_DURATION = exports.SECRET_JWT = exports.MORGAN_FORMAT = exports.MONGODB = exports.PORT = exports.CORS_LIST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
});
//export const CORS_LIST = ["DOMAIN"]
exports.CORS_LIST = true; //open for all requested clients;
exports.PORT = process.env.PORT;
exports.MONGODB = process.env.MONGODB_URL;
exports.MORGAN_FORMAT = ":method :url :response-time ms [:status] \n";
exports.SECRET_JWT = String(process.env.SECRET_TOKEN);
exports.TOKEN_DURATION = 3;
