import * as express from "express";
import * as http from "http";
import { Server } from "socket.io"
import { CORS_LIST } from "./lib/config";

const app = express();
const server = http.createServer(app);

const socketClients = new Map()
const clientMessages = []


const io = new Server(server,
    {
        cors:
            { origin: CORS_LIST }
    });

io.on("connection", (data) => {
    const infoPayload = {}
    io.emit("info", JSON.stringify({}))
})

