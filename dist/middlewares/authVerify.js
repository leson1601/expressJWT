"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerify = void 0;
const authVerify = (req, res, next) => {
    console.log("authVerify");
    next();
};
exports.authVerify = authVerify;
