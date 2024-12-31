import jwt from "jsonwebtoken"
import { SECRET_JWT } from "../lib/config";
import { HttpCode, Message } from "../lib/enums/Error";
import { Errors } from "../lib/ErrorHander";
import { T } from "../lib/types/common";

class AuthService {
    constructor() { }

    public async createToken(payload: T) {
        try {
            return await jwt.sign(
                payload,
                SECRET_JWT,
                { expiresIn: "3h" },
                (err, token) => {
                    if (err) {
                        throw new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATE_FAILED)
                    } else {
                        return token
                    }
                }
            )
        } catch (err: any) {
            console.log(`JWT ERROR: createToken, ${err.message}`)
            throw err
        }
    }


}

export default AuthService