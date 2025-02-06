import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import Button from '@mui/material/Button';
import NavBar from './components/views/NavBar/NavBar';
import TestPage from './components/TestPage';
import { Provider } from 'react-redux'; // Provider를 임포트
import store from './store'; // store를 임포트

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/views/Footer/Footer';
import LandingPage from './components/views/LandingPage/LandingPage';
import MovieDetailPage from './components/MovieDetailPage/MovieDetailPage';
import LoginPage from './components/views/LoginPage/LoginPage';

function App() {

  return (
    <div>
      <Provider store={store}> {/* Provider로 애플리케이션 감싸기 */}
      <Router>

        <NavBar/>
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>

      <Footer/>
      </Provider>

      {/* <Button variant="contained" color="primary">
        MUI 버튼
      </Button> */}

      
      

      
    </div>
  )
}

export default App
