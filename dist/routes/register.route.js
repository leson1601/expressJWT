"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_controller_1 = __importDefault(require("../controllers/register.controller"));
const registerRouter = express_1.default.Router();
// Create user
registerRouter.post('/', register_controller_1.default);
//export this registerRouter to use in our index.js
exports.default = registerRouter;
