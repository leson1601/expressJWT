"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                res.sendStatus(403);
            }
            else {
                if (decoded) {
                    req.body.userInfo = decoded.userInfo;
                }
                else {
                    res.status(401).json({ message: 'No Information in access token' });
                }
            }
        });
        next();
    }
    else {
        res.status(400).json({ message: 'Access token is required' });
    }
};
exports.verifyJWT = verifyJWT;
