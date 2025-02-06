import axios from "axios";
import { Dispatch } from 'redux';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./type";

interface LoginResponse {
  loginSuccess: boolean;
  message: string;
  userId: string;
  // 다른 필드가 있으면 추가
}

// export function loginUser(dataToSubmit:any) {
//   return async (dispatch: any):Promise<LoginResponse | null> => {
//     try{
//       const response = await axios.post('/api/users/login',dataToSubmit);

//       dispatch({
//         type: LOGIN_USER,
//         payload: response.data
//       })
  
//       return response.data // Promise 반환

//     }catch(err){
//       console.log('로그인 중 에러가 발생!', err);
//        return null;  
//     }
//   }
// }

export function loginUser(dataToSubmit: any) {
  return async (dispatch: any): Promise<LoginResponse | null> => {
    try {
      const response = await axios.post('/api/users/login', dataToSubmit);
      if(!response){alert("qkljglkj")}
      // 로그인 성공 시 상태 업데이트
      dispatch({
        type: LOGIN_USER,
        payload: response.data,
      });

      // response.data 반환
      return response.data; // response.data가 로그인 결과를 포함
    } 
    catch (err:any) {
      //console.log('로그인 중 에러가 발생!', err);
      
      // 서버에서 응답한 오류 메시지를 그대로 반환
      if (err.response && err.response.data) {
        return err.response.data; // { success: false, message: '사용자를 찾지 못했습니다.' }
      }

      return null; // 오류 발생 시 null 반환
    }
  };
}


export function registerUser(dataToSubmit:any) {
  return async (dispatch:any) => {
    try{
      const response = await axios.post('/api/users/register',dataToSubmit);

      dispatch({
        type: REGISTER_USER,
        payload: response.data
      })
  
      return response.data // Promise 반환
    }catch(err){
      console.log('회원가입 중 에러가 발생!', err);
    }
  }
}

export function auth() {
  return async (dispatch:any) => {
    try{
      const response = await axios.post('/api/users/auth');

      dispatch({
        type: AUTH_USER,
        payload: response.data
      })
  
      return response.data // Promise 반환
    }catch(err){
      console.log('권한 확인 중중 에러가 발생!', err);
    }
  }
}

export function logoutUser()  {
  return async (dispatch: any): Promise<{ success: boolean } | null> => {
    try{
      const response = await axios.get('/api/users/logout');

      dispatch({
        type: LOGOUT_USER,
        payload: response.data
      })
  
      return response.data // Promise 반환
    }catch(err){
      console.log('로그아웃 중 에러가 발생!', err);
      return null; // 오류 발생 시 null 반환
    }
  }
}