import dotenv from "dotenv"
dotenv.config()

//export const CORS_LIST = ["DOMAIN"]
export const CORS_LIST = true //open for all requested clients;
export const PORT = process.env.PORT
export const MONGODB = process.env.MONGODB_URL
export const MORGAN_FORMAT = ":method :url :response-time ms [:status] \n";
export const SECRET_JWT = String(process.env.SECRET_TOKEN)
export const TOKEN_DURATION = 3