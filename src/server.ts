import server from "./app"
import { MONGODB, PORT } from "./lib/config"
import mongoose from "mongoose"


mongoose.connect(MONGODB as string).then((data) => {
    console.info("Connected to MongoDB")
    server.listen(PORT ?? 3000, () => {
        console.log(`Application is running successfully on Port: ${PORT}`)
    })
}).catch((err) => {
    console.log(`DB ERROR: ${err.message}`)
})
