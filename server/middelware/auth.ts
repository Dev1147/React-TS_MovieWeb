import express, { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

// interface AuthRequest extends Request {
//     token?: string;
//     user?: IUser;
// }

// Request 타입 확장
//토큰, 세션/쿠키 등에 많이 사용한다고 함, 안그러면 수동 캐스팅을 해야 하는데 번거로움
declare global {
    namespace Express {
      interface Request {
        token?: string;
        user?: IUser;
      }
    }
  }

let auth = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.x_auth; //req.cookies["x_auth"]; // 또는 req.cookies.x_auth;
    //console.log("토큰??",token);
    if(!token){
        return res.status(400).json({success: false, message: '토큰이 없습니다.'})
    }

    try{
        // 토큰 검증 후 사용자 찾기
        User.findByToken(token)
        .then((user) => {
            if (!user) {
            return res.status(400).json({ success: false, message: '유효한 사용자가 아닙니다.' });
            }
            // (req as any).token = token;
            // (req as any).user = tokenUser; //(req as any) 타입에 맞게 캐스팅
            req.token = token;
            req.user = user;
            next();
        }).catch((err) =>{
            return res.status(400).json({ success: false, message: '토큰 검증 실패.' });
        })

        
    }catch(err){
        throw new Error('토큰 찾기 실패')
    }
}

export default auth;