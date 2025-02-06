import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Typography, Stack, Button } from "@mui/material";
import { API_URI, API_KEY, IMAGE_BASE_URL } from '../Confing';
import Rating from '@mui/material/Rating';
import { IconButton } from '@mui/material';
import { Home, Search, Favorite, FavoriteBorder, BookmarkBorder, Bookmark, PlayArrow } from '@mui/icons-material';
import VideoDetailPage from './Sections/VideoDetailPage';
import CastDetailPage from './Sections/CastDetailPage';
import DetailTopPage from './Sections/DetailTopPage';

function MovieDetailPage() {
  const {movieId} = useParams<{ movieId: string }>(); //객체이므로 {} app.tsx에도 맞게 설정
  
  const [movieInfo, setMovieInfo] = useState<any>({});
  const [crewInfo, setCrewInfo] = useState<any>({});
  const [videoInfo, setVideoInfo] = useState<any>({});




  useEffect(() => { 
    
    let endpointInfo: string = `${API_URI}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
    
    let endpointCast: string = `${API_URI}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`; // ko-KR, en-US
    let endpointVideo: string = `${API_URI}movie/${movieId}/videos?api_key=${API_KEY}`;


    // fetch(endpointInfo)
    //   .then(response => response.json())
    //   .then(data =>{
    //     console.log(data)
    //     setMovieInfo(data);
        
    //   })
    const  fetchMovie = async () => {
      try{
        const response = await fetch(endpointInfo);
        const data = await response.json();
        //console.log(data)
        setMovieInfo(data);
      }catch(err){
        console.error("영화 정보 가져오기 실패",err)
      }
    }

    fetchMovie();

    fetch(endpointCast)
      .then(response => response.json())
      .then(data =>{
        //console.log(data)
        setCrewInfo(data.cast);
      })

    fetch(endpointVideo)
      .then(response => response.json())
      .then(data =>{
        //console.log(data.results)
        setVideoInfo(data.results[1])
      })
  },[])

  return (
    <div>

      {/* 객체안에 배열이 있을 경우 */}
      {/* {Array.isArray(movieInfo.genres) && movieInfo.genres.length > 0 ? (
        movieInfo.genres.map((genre: { id: number, name: string }) => (
          genre.name
        )).join(',')
      ) : (
        <p>불러오는 중...</p>
      )} */}

      <DetailTopPage movieInfo={movieInfo} videoInfo={videoInfo}/>

      <VideoDetailPage videoInfo={videoInfo}/>

      <CastDetailPage crewInfo={crewInfo}/>
      
      
      

      <div style={{fontWeight:'bolder', fontSize:'20px'}}>리뷰</div>
      <hr/>
      <div  style={{ position: 'relative', width: '100%', height: '500px', marginBottom:20 }}></div>




      
    </div>
  )
}

export default MovieDetailPage