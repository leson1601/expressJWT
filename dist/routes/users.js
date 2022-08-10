"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRouter = express_1.default.Router();
userRouter.get('/', (req, res) => {
    res.send('User signed in');
});
// Create user
userRouter.post('/', (req, res) => {
    const { user, pwd } = req.body;
    console.log(user, pwd);
    res.send('User signed up');
});
//export this userRouter to use in our index.js
exports.default = userRouter;
