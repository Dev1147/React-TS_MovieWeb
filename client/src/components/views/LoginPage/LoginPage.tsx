import React,{FormEvent, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import { useNavigate, Link } from 'react-router-dom';
import { TextField ,Button, Checkbox, FormControlLabel} from "@mui/material";
import { Dispatch, Action  } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../_reducers/index'; // RootState는 앱의 전체 state 타입

function LoginPage() {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action<string>>>();
  const navigate = useNavigate(); 
  
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  
  const rememberMeChecked = localStorage.getItem("rememberMe") === "true";
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  useEffect(() =>{
    localStorage.setItem("rememberMe", rememberMe.toString())

  },[rememberMe])

  const handleRememberMe = () => {
    setRememberMe(preState => !preState)
  };
  //이메일
  const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setEmail(event.currentTarget.value)
  }
  //패스워드
  const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setPassword(event.currentTarget.value)
  }

  //이메일, 비밀번호 유효성 검사하여 로그인 비활성/활성
  const isFormValid = Email.length > 0 && Password.length > 0;
  
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();

      // 이메일 또는 비밀번호가 비어있는지 체크
    if (!Email || !Password) {
      alert('이메일과 비밀번호를 입력하세요!');
      return;
    }


    let body = {
      email: Email,
      password: Password
    }

    //#region  then/catch
    // dispatch(loginUser(body))
    // .then(response=>{

    //   if(response.loginSuccess){
    //     //props.history.push('/') // React Router v6 이상에서 history가 더 이상 props로 전달되지 않기 때문입니다.
    //     localStorage.setItem('userId', response.userId);// 로컬스토리지에 저장
    //     navigate('/');
    //   }else{
    //     alert("아이디또는 비밀번호가 틀렸습니다.")
    //   }
    // }) 
    // .catch((error) => {
    //   console.error(error);
    //   alert('An error occurred during login.');

    // });
    //#endregion
    
    //loginSuccess, userId 서버에는 정상 타입스크립트에서 에러는 thunk를 사용, 서로 anynx해야함
    try{
      const response = await dispatch(loginUser(body));
     
      if (!response) {
        alert('서버 응답이 없습니다. 네트워크 상태를 확인하세요.');
        return;
      }
      
      if(response && response.loginSuccess){
        localStorage.setItem('userId', response.userId);// 로컬스토리지에 저장
        navigate('/');
      }else {
        // 서버에서 전달한 메시지 표시
        alert(response.message);
      }
    }catch(err){
      //console.error(err);
      alert('로그인 중에 에러가 발생했습니다');
    }

  }

  const onRegisterHandler = () => {
    navigate('/register');
  }
   
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center',width:'100xh', height:'100vh'}}>
      <div style={{}}>
        <form onSubmit={onSubmitHandler}>
          <TextField 
            id="outlined-id" 
            label="Email" 
            variant="outlined" 
            fullWidth
            required
            margin="normal"
            value={Email} 
            onChange={onEmailHandler}/>
          <TextField 
            id="oulined-passwrod" 
            label="Password"
            variant="outlined"
            fullWidth
            required
            margin="normal" 
            value={Password}
            type="password" 
            onChange={onPasswordHandler}/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid} // 이메일과 비밀번호가 모두 입력되어야만 버튼 활성화
            fullWidth
          >
            Login
          </Button>
          <Button              
            variant="contained"
            color="primary"
            onClick={onRegisterHandler}
            sx={{mt:1, width:'100%'}}
          >
            Register
          </Button>
          <FormControlLabel
          
          control={
            <Checkbox
              checked={rememberMe}
              onChange={handleRememberMe}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Remember me"
        /> 
         <Link to="/login" style={{ }}>홈으로</Link>
        </form>
      </div>
      


    </div>
  )
}

export default LoginPage