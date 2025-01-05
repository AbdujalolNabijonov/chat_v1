"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
const Error_1 = require("./enums/Error");
class Errors extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }
}
exports.Errors = Errors;
Errors.standard = {
    code: Error_1.HttpCode.INTERNAL_SERVER_ERROR,
    message: Error_1.Message.SOMETHING_WENT_WRONG
};
