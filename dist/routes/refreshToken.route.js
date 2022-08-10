"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshToken_controller_1 = __importDefault(require("../controllers/refreshToken.controller"));
const refreshTokenRouter = express_1.default.Router();
const salt = parseInt(process.env.SALT);
// Create user
refreshTokenRouter.get('/', refreshToken_controller_1.default);
//export this refreshTokenRouter to use in our index.js
exports.default = refreshTokenRouter;
