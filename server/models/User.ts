
import mongoose, { Document, Model, Schema } from "mongoose"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// 1. 스키마 인터페이스 정의 (타입스크립트의 타입 지원)
export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    lastname: string,
    role: number,
    image: string,
    creatdate: Date,
    logindate: Date,
    logoutdate: Date,
    token: string,
    tokenExp: number,
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateToken(): string; 
    //findByToken(token: string): Promise<IUser | null>;
}

// IUserModel은 스태틱 메서드를 정의하는 인터페이스입니다.
export interface IUserModel extends Model<IUser> {
    findByToken(token: string): Promise<IUser | null>;
}

// 2. 스키마 정의
const userSchema = new Schema<IUser>(
    {
        name:{
            type: String,
            maxLength: 50
        },
        email:{
            type: String,
            trim: true,
            unique: 1
        },
        password:{
            type: String,
            minlength:5
        },
        lastname:{
            type: String,
            maxlength:50
        },
        role:{
            type: Number,
            default: 0
        },
        creatdate:{
            type:Date,
            default: null
        },
        logindate:{
            type:Date,
            default: null
        },
        logoutdate:{
            type:Date,
            default: null
        },
        image: String,
        token:{
            type:String,
            required: false, // 필수 여부 확인
            default: '' // 기본값 확인
        },
        tokenExp:{
            type:Number
        }
    }
)

//index.js의 save()전 실행 (비밀번호 암호화화)
userSchema.pre<IUser>('save', async function(next){
    const user = this; // 현재 User 문서
    const saltRounds = 10;

    if(user.isModified('password')){
        // bcrypt.genSalt(saltRounds,function(err, salt){ //바밀번호 암호화 진행 npm.js.com참고
        //     if(err) return next(err);
        
        //     bcrypt.hash(user.password, salt, function(err, hash){  //myPlaintextPassword -> 원본 비밀번호 (암호화 전)
        //         if(err) return next(err);
                
        //         user.password = hash
        //         next();
        //     })
        // })

        try{
            const salt = await bcrypt.genSalt(saltRounds);  // Salt 생성

            const hash = await bcrypt.hash(user.password, salt);  // 비밀번호 암호화
          
            user.password = hash
            
            next();
        }catch(err){

        }
    }else{//비번 변경 X
        next();
    }
})

// 비밀번호 비교
userSchema.methods.comparePassword = async function(candidatePassword: string) {
    try{
        return await bcrypt.compare(candidatePassword, this.password)
    }catch(err){
        throw new Error('비밀번호 비교 실패')
    }
}

//토큰 생성
userSchema.methods.generateToken = async function() {
    const user = this; // 현재 User 문서

    try{

        const token =  jwt.sign({_id: user._id.toHexString()},'secretToken');

        user.token = token;

        await user.save();

        return token;
    }catch(err){
        throw new Error('토큰 생성 실패')
    }
}

//토큰 찾기
userSchema.statics.findByToken = async function(token: string){
    const user = this; // 현재 User 문서

    try{
        //토큰 검증하여 아이디 가져오기
        const decoded  = await jwt.verify(token,'secretToken')as { _id: string };
        //사용자 찾기
        const findUser = await user.findOne({_id:decoded._id, token});

        if(!findUser){
            throw new Error('사용자를 찾을 수 없음!')
        }

        return findUser;
    }catch(err){
        throw new Error('토큰 찾기기 실패')
    }

}



// 4. 모델 생성
const User = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;