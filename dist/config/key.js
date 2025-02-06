"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prod_1 = __importDefault(require("./prod"));
const dev_1 = __importDefault(require("./dev"));
const config = process.env.NODE_ENV === 'production' ? prod_1.default : dev_1.default;
//npm run dev면 몽고디비 개발 주소 사용
//npm run start면 따로 설정된 주소 사용
exports.default = config;
