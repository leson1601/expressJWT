"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const dbConn_1 = require("./config/dbConn");
const body_parser_1 = __importDefault(require("body-parser"));
const register_route_1 = __importDefault(require("./routes/register.route"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const verifyJWT_1 = require("./middlewares/verifyJWT");
const refreshToken_route_1 = __importDefault(require("./routes/refreshToken.route"));
const logout_route_1 = __importDefault(require("./routes/logout.route"));
const employee_route_1 = __importDefault(require("./routes/employee.route"));
var cookieParser = require('cookie-parser');
dotenv_1.default.config();
// Connect to Mongodb
(0, dbConn_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use(cookieParser());
app.use("/register", register_route_1.default);
app.use("/login", login_route_1.default);
app.use("/refresh", refreshToken_route_1.default);
app.use("/logout", logout_route_1.default);
app.use(verifyJWT_1.verifyJWT);
app.use("/employees", employee_route_1.default);
app.use("/test", (req, res) => {
    const userInfo = req.body.userInfo;
    return res.send("test");
});
mongoose_1.default.connection.once("open", () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
});
