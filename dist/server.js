"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./lib/config");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(config_1.MONGODB).then((data) => {
    console.info("Connected to MongoDB");
    app_1.default.listen(config_1.PORT !== null && config_1.PORT !== void 0 ? config_1.PORT : 3000, () => {
        console.log("Application is running successfully");
    });
}).catch((err) => {
    console.log(`DB ERROR: ${err.message}`);
});
