"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
let auth = (req, res, next) => {
    const token = req.cookies.x_auth; //req.cookies["x_auth"]; // 또는 req.cookies.x_auth;
    //console.log("토큰??",token);
    if (!token) {
        return res.status(400).json({ success: false, message: '토큰이 없습니다.' });
    }
    try {
        // 토큰 검증 후 사용자 찾기
        User_1.default.findByToken(token)
            .then((user) => {
            if (!user) {
                return res.status(400).json({ success: false, message: '유효한 사용자가 아닙니다.' });
            }
            // (req as any).token = token;
            // (req as any).user = tokenUser; //(req as any) 타입에 맞게 캐스팅
            req.token = token;
            req.user = user;
            next();
        }).catch((err) => {
            return res.status(400).json({ success: false, message: '토큰 검증 실패.' });
        });
    }
    catch (err) {
        throw new Error('토큰 찾기 실패');
    }
};
exports.default = auth;
