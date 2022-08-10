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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const registerRouter = express_1.default.Router();
const salt = parseInt(process.env.SALT);
// Create user
registerRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res.status(400).json({ message: 'user and pwd are required' });
    const foundUser = yield user_model_1.User.findOne({ username: user });
    if (!foundUser) {
        const hashedPwd = yield bcrypt_1.default.hash(pwd, salt || 10);
        yield user_model_1.User.create({
            username: user,
            password: hashedPwd,
        });
        return res.sendStatus(201);
    }
    else {
        return res.sendStatus(409);
    }
}));
//export this registerRouter to use in our index.js
exports.default = registerRouter;
