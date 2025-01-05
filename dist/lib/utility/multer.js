"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const getMulterStorage = (address) => {
    return multer_1.default.diskStorage({
        destination: (req, file, cd) => {
            const path = `./uploads/${address}`;
            cd(null, path);
        },
        filename: (req, file, cb) => {
            const ext = path_1.default.parse(file.originalname).ext;
            const newName = (0, uuid_1.v4)() + ext;
            cb(null, newName);
        }
    });
};
const targetUploader = (address) => {
    const storage = getMulterStorage(address);
    return (0, multer_1.default)({ storage });
};
exports.default = targetUploader;
