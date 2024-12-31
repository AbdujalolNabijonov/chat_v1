import express from "express";
import * as http from "http";
import { Server } from "socket.io"
import { CORS_LIST } from "./lib/config";
import { InfoMessagePayload } from "./lib/types/socket";

const app = express();
//ROUTER

app.post("/auth",)




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

