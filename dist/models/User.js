"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 2. 스키마 정의
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    creatdate: {
        type: Date,
        default: null
    },
    logindate: {
        type: Date,
        default: null
    },
    logoutdate: {
        type: Date,
        default: null
    },
    image: String,
    token: {
        type: String,
        required: false, // 필수 여부 확인
        default: '' // 기본값 확인
    },
    tokenExp: {
        type: Number
    }
});
//index.js의 save()전 실행 (비밀번호 암호화화)
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // 현재 User 문서
        const saltRounds = 10;
        if (user.isModified('password')) {
            // bcrypt.genSalt(saltRounds,function(err, salt){ //바밀번호 암호화 진행 npm.js.com참고
            //     if(err) return next(err);
            //     bcrypt.hash(user.password, salt, function(err, hash){  //myPlaintextPassword -> 원본 비밀번호 (암호화 전)
            //         if(err) return next(err);
            //         user.password = hash
            //         next();
            //     })
            // })
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds); // Salt 생성
                const hash = yield bcrypt_1.default.hash(user.password, salt); // 비밀번호 암호화
                user.password = hash;
                next();
            }
            catch (err) {
            }
        }
        else { //비번 변경 X
            next();
        }
    });
});
// 비밀번호 비교
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield bcrypt_1.default.compare(candidatePassword, this.password);
        }
        catch (err) {
            throw new Error('비밀번호 비교 실패');
        }
    });
};
//토큰 생성
userSchema.methods.generateToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // 현재 User 문서
        try {
            const token = jsonwebtoken_1.default.sign({ _id: user._id.toHexString() }, 'secretToken');
            user.token = token;
            yield user.save();
            return token;
        }
        catch (err) {
            throw new Error('토큰 생성 실패');
        }
    });
};
//토큰 찾기
userSchema.statics.findByToken = function (token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // 현재 User 문서
        try {
            //토큰 검증하여 아이디 가져오기
            const decoded = yield jsonwebtoken_1.default.verify(token, 'secretToken');
            //사용자 찾기
            const findUser = yield user.findOne({ _id: decoded._id, token });
            if (!findUser) {
                throw new Error('사용자를 찾을 수 없음!');
            }
            return findUser;
        }
        catch (err) {
            throw new Error('토큰 찾기기 실패');
        }
    });
};
// 4. 모델 생성
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
