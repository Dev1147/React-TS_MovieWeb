"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prodConfig = {
    mongoURI: process.env.MONGO_URI || 'your-production-uri'
};
exports.default = prodConfig;
//HEROU 사이트에서 몽공디비 주소 넣고 MONGO_URI가 키임
