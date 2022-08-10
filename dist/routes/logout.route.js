"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logout_controller_1 = __importDefault(require("../controllers/logout.controller"));
const logoutRouter = express_1.default.Router();
logoutRouter.get('/', logout_controller_1.default);
//export this logoutRouter to use in our index.js
exports.default = logoutRouter;
