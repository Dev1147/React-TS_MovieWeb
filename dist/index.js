"use strict";
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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./middelware/auth"));
const key_1 = __importDefault(require("./config/key"));
const app = (0, express_1.default)();
const port = 5000;
//json 파싱을 위한 미들웨어 설정
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//mongoDB 연결
mongoose_1.default.connect(key_1.default.mongoURI)
    .then(() => { console.log('mongogMongoDB Connected...'); })
    .catch((err) => { console.log('mongogMongoDB Connected Error', err); });
//메인 페이지 확인    
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
//서버 접속 확인
app.get('/hello', (req, res) => {
    res.send('서버에 접속했어요!');
    console.log("안녕하세요!");
});
//사용자 등록 API
app.post('/api/users/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const localDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
    //console.log(req.body)
    //데이터가 없는 경우 처리
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: '회원가입: 필수 입력란이 누락되었습니다.' });
    }
    // const user = new User(req.body);
    // user
    //     .save()
    //     .then(()=>{
    //         return res.status(200).json({success:true, message:'회원가입 성공!'})
    //     })
    //     .catch((err: Error)=>{
    //         return res.status(500).json({success:false, err})
    //     })
    try {
        const existingtUser = yield User_1.default.findOne({ email });
        if (existingtUser) {
            return res.status(400).json({ success: false, message: '이메일이 이미 등록되어 있습니다.' });
        }
        const user = new User_1.default(req.body); //사용자 정보
        user.creatdate = localDate;
        yield user.save(); //비동기 작업 처리: user.save()가 완료될 때까지 기다림
        return res.status(200).json({ success: true, message: '회원가입 성공!' });
    }
    catch (err) {
        return res.status(500).json({ success: false, err });
    }
}));
//로그인 API
app.post('/api/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //console.log(req)
    try {
        const loginUser = yield User_1.default.findOne({ email });
        if (!loginUser) {
            return res.status(400).json({ success: false, message: '사용자를 찾지 못했습니다' });
        }
        const isMatch = yield loginUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: true, message: '비밀번호 불일치!' });
        }
        const token = yield loginUser.generateToken();
        // 쿠키에 JWT 토큰 설정 (httpOnly, secure 옵션을 추가하여 보안성 강화)
        res.cookie('x_auth', token, {
            httpOnly: true, // 클라이언트에서 JavaScript로 접근 불가
            secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 Secure 플래그 적용
            maxAge: 3600000, // 1시간 (토큰 만료 시간 설정)
            sameSite: "strict" // CSRF 방지
        });
        // res.cookie('auth_token', token)
        //     .status(200).json({success: true, userId: loginUser._id,  message: '로그인 성공!'})
        //로그인 날짜 업데이트
        loginUser.logindate = new Date(); //현재날짜
        yield loginUser.save();
        return res.status(200).json({ success: true, message: '로그인 성공!' });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: '로그인 중 문제가 발생했습니다.' });
    }
}));
//auth API
app.get('/api/users/auth', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; // `user`를 `req.user`로 접근
    if (!user) {
        return res.status(401).json({ isAuth: false, message: "Unauthorized. Please log in." });
    }
    res.status(200).json({
        _id: user._id,
        isAdmin: user.role === 0 ? false : true,
        isAuth: true,
        email: user.email,
        name: user.name,
        lastname: user.lastname || '',
        role: user.role,
        image: user.image || ''
    });
}));
//로그아웃API
app.get('/api/users/logout', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.token; // auth 미들웨어에서 설정한 token
    const user = req.user;
    // console.log("token??",token);
    // console.log("user??",user?._id);
    if (!user) {
        return res.status(400).json({ success: false, message: '유효한 사용자가 아닙니다.' });
    }
    try {
        const nowDate = new Date(); //현재날짜
        yield User_1.default.findByIdAndUpdate(user._id, {
            token: "",
            logoutdate: nowDate
        });
        // DB에서 해당 유저의 토큰을 제거
        // const findUser = await User.findOneAndUpdate(
        //     { _id: user._id },
        //     { $unset: { token: 1 } }, // `token` 필드를 제거
        //     { new: true } // 업데이트된 문서를 반환
        // );
        return res.status(200).json({ success: true, message: '로그아웃 성공!' });
    }
    catch (err) {
        return res.status(400).json({ success: false, message: '로그아웃 중 문제가 발생했습니다.' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//개발 중 에러 미리 정리용 주석
//원인:    "@types/express": "^5.x.x",
//          "express": "^4.21.2",
// @types/express와 express 버전 차이로 발생한 에러 
//해결: npm uninstall @types/express
//      npm install @types/express@4.17.13  버전 다운그레이드함 (express는 현재 4점대가 최신)
// (req: Request<{}, {}, registerReq>, res: Response)=>{ 빨간줄로
// 이 호출과 일치하는 오버로드가 없습니다.
// 마지막 오버로드에서 다음 오류가 발생했습니다.
//Error: Cannot set headers after they are sent to the client
//중보 응답 및 호출 원인 토큰생성하고 return을 다시 시도해서서
