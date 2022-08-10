"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = require("../controllers/employee.controller");
const employeeRouter = express_1.default.Router();
employeeRouter.get('/', employee_controller_1.getEmployees);
//export this employeeRouter to use in our index.js
exports.default = employeeRouter;
