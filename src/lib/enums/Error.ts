export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum Message {
    USED_INFO = "You are inserting already used nick!",
    SOMETHING_WENT_WRONG = "Something went wrong!",
    CREATE_FAILED = "Create failed!",
    TOKEN_CREATE_FAILED = "Token creation failed!",
    NO_DATA_FOUND = "There is no member with that nick!",
    WRONG_PASSWORD = "You inserted wrong password!",
    TOKEN_NOT_PROVIDED = "Token was not provided",
    BEING_USED_ONE = "Current user is being used now",

    PASSWORD_LENGTH = "Password should be at least 6 characters and no space"
}