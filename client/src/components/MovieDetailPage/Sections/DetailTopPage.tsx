import React,{useState} from 'react'
import { API_URI, API_KEY, IMAGE_BASE_URL } from '../../Confing';
import Rating from '@mui/material/Rating';
import { Box, Typography, Stack, Button, IconButton } from "@mui/material";
import { Home, Search, Favorite, FavoriteBorder, BookmarkBorder, Bookmark, PlayArrow, Close } from '@mui/icons-material';
import Modal from 'react-modal';
import ReactPlayer from 'react-player/youtube';
import ReactModal from 'react-modal';

//npm install @types/react-modal --save-dev
//npm install react-modal react-player

function DetailTopPage({movieInfo, videoInfo}:{movieInfo: any, videoInfo: any}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [checkFavorite, setCheckFavorite] = useState<boolean>(false);
  const [checkBookmark, setCheckBookmark] = useState<boolean>(false);

  //const formattedDate = movieInfo.release_date.replace(/-/g, '/');
  const totalMinutes = movieInfo.runtime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeString = `${hours}h${minutes}m`;
 
  const videoUrl = `https://www.youtube.com/embed/${videoInfo.key}`;

  const checkFavoriteHandler = () => {
    setCheckFavorite(prevCheck => !prevCheck);
  }

  const checkBookmarkHandler = () => {
    setCheckBookmark(prevCheck => !prevCheck);
  }

  const openModal = () => {

    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  Modal.setAppElement('#root'); // 접근성 관련 설정 (필수)

  const customStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 9998, // 배경 오버레이를 가장 위로
    },
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '992px',
      height: '620px',
      backgroundColor: '#000',
      zIndex: 9999, // 모달을 최상단으로 설정
      borderRadius: '7px',
      border: '2px solid #000',
      padding: '0px',
    },
  };
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', marginBottom:20 }}>
      {/* 포스터 이미지 */}
      <img 
        //key={movieInfo.id}
        src={`${IMAGE_BASE_URL}/w500${movieInfo.poster_path}`}
        alt={movieInfo.title}
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '13%', 
          transform: 'translate(-50%, -50%)', 
          width: '300px', 
          height: '450px', 
          zIndex: 2,
          borderRadius:'20px' 
        }} 
      />

      {/* 반투명 검은색 오버레이 */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(31.5, 31.5, 31.5, 0.84)', // 반투명 검은색 오버레이
          zIndex: 1, // 이 오버레이가 배경 이미지 위에 표시되도록 설정
        }} 
      />

      {/*  배경 이미지 */}
      <img 
        //key={movieInfo.id}
        src={`${IMAGE_BASE_URL}/w500${movieInfo.backdrop_path}`}
        alt={movieInfo.title}
        width='100%'
        height='500px'
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          zIndex: 0 
          
        }}
      />

      <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '60%', 
          transform: 'translate(-50%, -50%)', 
          width: '1000px', 
          height: '450px', 
          zIndex: 1,
          borderRadius:'20px',
          color:'white' 
        }} >
        {/* 객체는 직접 접근*/}
        <section>
          <div>
            <span style={{fontSize:'30px', fontWeight:'bolder'}}>{movieInfo.title}</span>
            <span style={{fontSize:'30px', fontWeight:'lighter'}}>
              {movieInfo.release_date ? `(${movieInfo.release_date.slice(0,4)})` : '날짜 정보 없음'}
            </span>
          </div>
          
          {/* <div>{movieInfo.release_date.slice(0,4)}/{movieInfo.release_date.slice(5,7)}/{movieInfo.release_date.slice(8,10)}</div> */}
          
          <div style={{marginBottom:'15px'}}>
            <span>{movieInfo.release_date}({movieInfo.origin_country})</span>
            &nbsp;•&nbsp;
            <span>
              {Array.isArray(movieInfo.genres) && movieInfo.genres.map((genre: { id: number, name: string }) => (
                  genre.name
                )).join(',')
              }
            </span>
            &nbsp;•&nbsp;
            <span>{timeString}</span>
          </div>
          
          <div style={{marginBottom:'15px'}}>
            <span>평점:{Math.round((movieInfo.vote_average / 2)* 100) /100}</span>
            <Rating name="half-rating-read" value={movieInfo.vote_average / 2} precision={0.5} readOnly />
            <span>&nbsp;&nbsp;당신은 어떻한가요?</span>
          </div>

          <div style={{marginBottom:'15px'}}>           

          <IconButton color="primary" onClick={checkFavoriteHandler}>
            {checkFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>

          <IconButton color="primary" onClick={checkBookmarkHandler}>
            {checkBookmark ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
            
          <IconButton color="primary" onClick={openModal}>
            <PlayArrow/>
            <Typography variant="body1" sx={{ marginLeft: 1 }}>트레일러 재생</Typography>
          </IconButton>
  
          </div>

          <div style={{marginBottom:'15px'}}>태그라인:{movieInfo.tagline}</div>
          <div style={{fontSize:'20px', fontWeight:'bolder'}}>개요</div>
          <div>{movieInfo.overview}</div>
        </section>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Video Modal" style={customStyles}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={0}>
          <Typography variant="body1" sx={{ marginLeft: 1 , color:'white'}}>트레일러 재생</Typography>
          <IconButton onClick={closeModal} aria-label="close" size="small">
            <Close sx={{color:'white'}}/>
          </IconButton>
        </Box>
        <ReactPlayer url={videoUrl} playing={false} controls width="100%" height="582px" />
        
      </Modal>
      </div>

  </div>
  )
}

export default DetailTopPage