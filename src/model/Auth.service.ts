import jwt from "jsonwebtoken"
import { SECRET_JWT, TOKEN_DURATION } from "../lib/config";
import { HttpCode, Message } from "../lib/enums/Error";
import { Errors } from "../lib/ErrorHander";
import { T } from "../lib/types/common";


class AuthService {
    constructor() { }

    public async createToken(payload: T) {
        try {
            return new Promise((resolve, reject) => {
                jwt.sign(
                    payload,
                    SECRET_JWT,
                    { expiresIn: `${TOKEN_DURATION}h` },
                    (err, token) => {
                        if (err) {
                            reject(new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATE_FAILED))
                        } else {
                            resolve(token)
                        }
                    }
                )
            })
        } catch (err: any) {
            console.log(`JWT ERROR: createToken, ${err.message}`)
            throw err
        }
    }


}

export default AuthService