import * as express from "express";
import * as http from "http";
import {Server} from "socket.io"

const app = express();
const server = http.createServer(app);

const socketClients = new Map()
const clientMessages =[]

const io = new Server(server);
io.on("connection", (data)=>{
    const infoPayload={}
    io.emit("info", JSON.stringify({}))
})

