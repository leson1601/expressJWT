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
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const logoutRouter = express_1.default.Router();
// Create user
logoutRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies)
        return res.sendStatus(403);
    const refreshToken = req.cookies.refreshToken;
    const foundUser = yield user_model_1.User.findOne({ refreshToken: refreshToken });
    if (!foundUser) {
        res.clearCookie("refreshToken", { httpOnly: true });
        return res.sendStatus(204);
    }
    foundUser.refreshToken = "";
    const result = yield foundUser.save();
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.sendStatus(204);
}));
//export this logoutRouter to use in our index.js
exports.default = logoutRouter;
