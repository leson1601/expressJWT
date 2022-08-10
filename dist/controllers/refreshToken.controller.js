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
const user_model_1 = require("../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies)
        return res.sendStatus(403);
    const refreshToken = req.cookies.refreshToken;
    const foundUser = yield user_model_1.User.findOne({ refreshToken: refreshToken });
    if (!foundUser)
        return res.sendStatus(403);
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, function (err, decoded) {
        if (err || foundUser.username !== decoded.userInfo.user) {
            return res.sendStatus(403);
        }
        const accessToken = jsonwebtoken_1.default.sign({
            userInfo: { user: foundUser.username, roles: foundUser.roles }
        }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "15s" });
        return res.status(200).json({ accessToken });
    });
});
exports.default = handleRefreshToken;
