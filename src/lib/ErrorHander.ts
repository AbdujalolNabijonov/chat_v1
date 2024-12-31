import { HttpCode, Message } from "./enums/Error";

export class Errors extends Error {
    readonly code: number;
    readonly message: string;

    static standard = {
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG
    }

    constructor(code: number, message: string) {
        super()
        this.code = code;
        this.message = message
    }
}