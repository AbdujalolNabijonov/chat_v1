import express from "express";
import  http from "http";
import { Server } from "socket.io"
import router from "./router/router";
import { CORS_LIST, MORGAN_FORMAT } from "./lib/config";
import { InfoMessagePayload } from "./lib/types/socket";
import morgan from "morgan"
import { T } from "./lib/types/common";
import cors from "cors"

const app = express();


app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan(MORGAN_FORMAT));
app.use(cors({ origin: true,credentials:true }))

//ROUTER
app.use('/', router)

//SOCKET
const server = http.createServer(app);
const socketClients = new Map()
const clientMessages = []
let totalClientsList: number = 0


const io = new Server(server,
    {
        cors:
            { origin: CORS_LIST }
    });

io.on("connection", (client) => {
    const memberNick = client.request.headers.membernick
    let roomName = "";
    totalClientsList++

    client.on("joinRoom", (data) => {
        const { room } = JSON.parse(data)
        if (socketClients.get(client)) {
            client.emit("error", { message: "Alreadey used nick name" })
        } else {
            socketClients.set(client, memberNick)
            client.join(room)
            roomName = room
            io.to(room).emit("newMember", {
                event: "newMember",
                totalClientsList,
                memberNick: memberNick,
                action: "joined"
            })
        }
    })
})

export default server

