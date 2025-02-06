import React,{ useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MovieCreation } from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import {logoutUser} from '../../../_actions/user_action'
import { Dispatch, Action  } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../_reducers/index'; // RootState는 앱의 전체 state 타입

export default function ButtonAppBar() {

  const userLoginState = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action<string>>>();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(userLoginState.loginSuccess);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    //로그인 로그아웃 변경
    setIsLoggedIn(userLoginState.loginSuccess);

  }, [userLoginState.loginSuccess]);
 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  //로그아웃
  const logoutHandler = async () => {
   // event.preventDefault();
     
    // dispatch(logoutUser())
    //   .then(response => {
    //     //response'은(는) 'null'일 수 있습니다.  logoutUser가 try/catch라서??
    //     if (response.success) {
    //       setIsLoggedIn(false)
    //       navigate("/");
    //     } else {
    //       alert('로그아웃 실패 했습니다.')
    //     }
    //   })
    try{
      const response = await dispatch(logoutUser());
     
      if(response){
        setIsLoggedIn(false) //로그인 버튼으로 변경경
        localStorage.removeItem("userId");// 로컬스토리지에서 삭제
        navigate('/'); //메인페이지 이동
      }
    }catch(err){
      console.error(err);
      alert('로그아웃 중에 에러가 발생했습니다다');
    }


  };


  // return(
  //   <div>
  //   {!isLoggedIn ? (
  //     <div>
  //       <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
  //         <Button color="inherit">
  //           Login
  //         </Button>
  //       </Link>
  //     </div>
  //     ):(
  //     <Button type="button" color="inherit" onClick={logoutHandler}>
  //       Logout
  //     </Button>
  //     )
  //   }
  //   </div>
  // )

  return (
    <Box sx={{ flexGrow: 1, mb:10}} >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
          </Typography>
          {!isLoggedIn ? (
            <div>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">
                  Login
                </Button>
              </Link>
            </div>
          ):(
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem color="inherit" onClick={logoutHandler}>
                    Logout
                </MenuItem>
              </Menu>
            </div>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}