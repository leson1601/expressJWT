"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const loginRouter = express_1.default.Router();
// Create user
loginRouter.post('/', login_controller_1.default);
//export this loginRouter to use in our index.js
exports.default = loginRouter;
