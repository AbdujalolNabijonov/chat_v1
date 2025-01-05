"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const router_1 = __importDefault(require("./router/router"));
const config_1 = require("./lib/config");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const Auth_service_1 = __importDefault(require("./model/Auth.service"));
const app = (0, express_1.default)();
app.use("/uploads", express_1.default.static("uploads"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)(config_1.MORGAN_FORMAT));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
//ROUTER
app.use('/', router_1.default);
//SOCKET
const server = http_1.default.createServer(app);
const socketClients = new Map();
const clientMessages = {};
let totalClientsList = {};
let socketRoom;
const io = new socket_io_1.Server(server, { cors: { origin: config_1.CORS_LIST } });
io.on("connection", (client) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=== Socket Connection ===");
    const authService = new Auth_service_1.default();
    client.on("joinRoom", (roomName) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        socketRoom = JSON.parse(roomName);
        client.join(socketRoom);
        if (!totalClientsList[socketRoom])
            totalClientsList[socketRoom] = 1;
        else
            totalClientsList[socketRoom]++;
        console.log(`=== RoomName: ${JSON.parse(roomName)} ===`);
        if ((_b = (_a = client.request) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization) {
            const token = client.request.headers.authorization.split(" ")[1];
            const member = yield authService.verifyMember(token);
            const payload = Object.assign(Object.assign({}, member), { socketRoom });
            socketClients.set(client, payload);
        }
        const infoPayloadConnection = {
            event: "info",
            totalClients: totalClientsList[socketRoom],
            memberData: socketClients.get(client),
            timer: new Date(),
            action: "joined"
        };
        io.to(socketRoom).emit("info", JSON.stringify(infoPayloadConnection));
        const relatedMembers = Array.from(socketClients.values()).filter((ele) => ele.socketRoom === socketRoom);
        io.to(socketRoom).emit("getMembers", JSON.stringify(relatedMembers));
        const getMessagesPayload = {
            event: "getMessages",
            list: (_c = clientMessages[socketRoom]) !== null && _c !== void 0 ? _c : []
        };
        io.to(socketRoom).emit("getMessages", JSON.stringify(getMessagesPayload));
    }));
    client.on("message", (data) => {
        const message = JSON.parse(data);
        if (!clientMessages[socketRoom])
            clientMessages[socketRoom] = [];
        const messagePayload = {
            event: "message",
            text: message.text,
            memberData: socketClients.get(client),
            timer: new Date(),
            action: "joined"
        };
        clientMessages[socketRoom].push(messagePayload);
        const getMessagesPayload = {
            event: "getMessages",
            list: clientMessages[socketRoom]
        };
        io.to(socketRoom).emit("getMessages", JSON.stringify(getMessagesPayload));
    });
    client.on("disconnect", () => {
        totalClientsList[socketRoom]--;
        const infoPayloadDisconnect = {
            event: "info",
            totalClients: totalClientsList[socketRoom],
            memberData: socketClients.get(client),
            timer: new Date(),
            action: "left"
        };
        console.log("=== Socket Disconnected ===");
        socketClients.delete(client);
        io.to(socketRoom).emit("info", JSON.stringify(infoPayloadDisconnect));
        const relatedMembers = Array.from(socketClients.values()).filter((ele) => ele.socketRoom === socketRoom);
        io.to(socketRoom).emit("getMembers", JSON.stringify(relatedMembers));
    });
}));
exports.default = server;
