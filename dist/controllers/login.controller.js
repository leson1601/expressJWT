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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res.status(400).json({ message: 'user and pwd are required' });
    const foundUser = yield user_model_1.User.findOne({ username: user });
    if (!foundUser)
        return res.sendStatus(401);
    const match = yield bcrypt_1.default.compare(pwd, foundUser.password);
    if (!match)
        return res.sendStatus(401);
    const accessToken = jsonwebtoken_1.default.sign({
        userInfo: { user: foundUser.username, roles: foundUser.roles }
    }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "15s" });
    const refreshToken = jsonwebtoken_1.default.sign({
        userInfo: { user: foundUser.username }
    }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "1d" });
    foundUser.refreshToken = refreshToken;
    const result = yield foundUser.save();
    res.cookie("refreshToken", refreshToken);
    return res.status(200).json({ accessToken });
});
exports.default = handleLogin;
