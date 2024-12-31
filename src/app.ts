import express from "express";
import * as http from "http";
import { Server } from "socket.io"
import router from "./router/router";
import { CORS_LIST, MORGAN_FORMAT } from "./lib/config";
import { InfoMessagePayload } from "./lib/types/socket";
import morgan from "morgan"
const app = express();


app.use("/upload", express.static("upload"));
app.use(morgan(MORGAN_FORMAT));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//ROUTER
app.use('/', router)

//SOCKET
const server = http.createServer(app);
const socketClients = new Map()
const clientMessages = []
let totalClients: number = 0


const io = new Server(server,
    {
        cors:
            { origin: CORS_LIST }
    });

io.on("connection", (client) => {
    const memberNick = client.request.headers.memberNick
    const infoPayload: InfoMessagePayload = {
        event: "info",
        totalClients,
        memberData: null,
        action: "joined"
    }
    io.emit("info", JSON.stringify({}))
})

export default server

