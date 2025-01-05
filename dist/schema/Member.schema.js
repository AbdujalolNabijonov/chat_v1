"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSchema = void 0;
const mongoose_1 = require("mongoose");
const Error_1 = require("../lib/enums/Error");
exports.memberSchema = new mongoose_1.Schema({
    memberNick: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },
    memberPhone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },
    memberImage: {
        type: String,
        default: ""
    },
    memberPassword: {
        type: String,
        select: false,
        required: true,
        validate: {
            validator: (data) => data.length > 5 && !data.includes(" "),
            message: Error_1.Message.PASSWORD_LENGTH
        },
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Member", exports.memberSchema);
