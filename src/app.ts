import express from "express";
import http from "http";
import { Server } from "socket.io"
import router from "./router/router";
import { CORS_LIST, MORGAN_FORMAT } from "./lib/config";
import { GetMessagesPayload, InfoMessagePayload, MessagePayload } from "./lib/types/socket";
import morgan from "morgan"
import { T } from "./lib/types/common";
import cors from "cors"
import AuthService from "./model/Auth.service";
import { Member } from "./lib/types/member";

const app = express();


app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan(MORGAN_FORMAT));
app.use(cors({ origin: true, credentials: true }))

//ROUTER
app.use('/', router)

//SOCKET
const server = http.createServer(app);
const socketClients = new Map()
const clientMessages: T = {}
let totalClientsList: T = {}
let socketRoom: string;


const io = new Server(
    server,
    { cors: { origin: CORS_LIST } }
);

io.on("connection", async (client) => {
    console.log("=== Socket Connection ===")

    const authService = new AuthService()
    client.on("joinRoom", async (roomName) => {

        socketRoom = JSON.parse(roomName)
        client.join(socketRoom)

        if (!totalClientsList[socketRoom]) totalClientsList[socketRoom] = 1;
        else totalClientsList[socketRoom]++

        console.log(`=== RoomName: ${JSON.parse(roomName)} ===`)

        if (client.request?.headers?.authorization) {
            const token = client.request.headers.authorization.split(" ")[1];
            const member = await authService.verifyMember(token) as Member

            const payload = { ...member, socketRoom }
            socketClients.set(client, payload);
        }

        const infoPayloadConnection: InfoMessagePayload = {
            event: "info",
            totalClients: totalClientsList[socketRoom],
            memberData: socketClients.get(client),
            timer: new Date(),
            action: "joined"
        }
        io.to(socketRoom).emit("info", JSON.stringify(infoPayloadConnection))

        const relatedMembers = Array.from(socketClients.values()).filter((ele) => ele.socketRoom === socketRoom)
        io.to(socketRoom).emit("getMembers", JSON.stringify(relatedMembers))
        const getMessagesPayload: GetMessagesPayload = {
            event: "getMessages",
            list: clientMessages[socketRoom]??[]
        }
        io.to(socketRoom).emit("getMessages", JSON.stringify(getMessagesPayload))
    })

    client.on("message", (data) => {
        const message = JSON.parse(data);
        if (!clientMessages[socketRoom]) clientMessages[socketRoom] = [];

        const messagePayload: MessagePayload = {
            event: "message",
            text: message.text,
            memberData: socketClients.get(client),
            timer: new Date(),
            action: "joined"
        }

        clientMessages[socketRoom].push(messagePayload)
        const getMessagesPayload: GetMessagesPayload = {
            event: "getMessages",
            list: clientMessages[socketRoom]
        }
        io.to(socketRoom).emit("getMessages", JSON.stringify(getMessagesPayload))
    })


    client.on("disconnect", () => {
        totalClientsList[socketRoom]--
        const infoPayloadDisconnect: InfoMessagePayload = {
            event: "info",
            totalClients: totalClientsList[socketRoom],
            memberData: socketClients.get(client),
            timer: new Date(),
            action: "left"
        }
        console.log("=== Socket Disconnected ===")
        socketClients.delete(client)

        io.to(socketRoom).emit("info", JSON.stringify(infoPayloadDisconnect))

        const relatedMembers = Array.from(socketClients.values()).filter((ele) => ele.socketRoom === socketRoom)
        io.to(socketRoom).emit("getMembers", JSON.stringify(relatedMembers))
    })
})

export default server

