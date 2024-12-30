import * as dotenv from "dotenv"
import server from "./app"
import { PORT } from "./lib/config"
dotenv.config()


server.listen(PORT, ()=>{
    console.log("Application is running successfully")
})
