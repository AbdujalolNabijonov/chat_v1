import dotenv from "dotenv"
dotenv.config()

//export const CORS_LIST = ["DOMAIN"]
export const CORS_LIST = true //open for all requested clients;
export const PORT = process.env.PORT
export const MONGODB = process.env.MONGODB_URL