"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.HttpCode = void 0;
var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (exports.HttpCode = HttpCode = {}));
var Message;
(function (Message) {
    Message["USED_INFO"] = "You are inserting already used nick!";
    Message["SOMETHING_WENT_WRONG"] = "Something went wrong!";
    Message["CREATE_FAILED"] = "Create failed!";
    Message["TOKEN_CREATE_FAILED"] = "Token creation failed!";
    Message["NO_DATA_FOUND"] = "There is no member with that nick!";
    Message["WRONG_PASSWORD"] = "You inserted wrong password!";
    Message["TOKEN_NOT_PROVIDED"] = "Token was not provided";
    Message["PASSWORD_LENGTH"] = "Password should be at least 6 characters and no space";
})(Message || (exports.Message = Message = {}));
