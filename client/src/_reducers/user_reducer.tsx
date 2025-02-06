import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "../_actions/type";

const initialState = {
  loginSuccess: false //로그인 서버와 같아야 로그인 됨
};


export default function useReducers(state = initialState, action: any){
  switch(action.type){
    case LOGIN_USER: 
      return {...state, loginSuccess: action.payload };

    case REGISTER_USER: 
      return {...state, registerSuccess: action.payload};

    case AUTH_USER: 
      return {...state, useAuth: action.payload}; 

    case LOGOUT_USER: 
      return {...state, logoutSuccess: action.payload};
      
    default: return state;
  }
}