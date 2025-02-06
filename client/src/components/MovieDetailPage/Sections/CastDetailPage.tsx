import React,{useState} from 'react'
import { Box, Typography, Stack, Button } from "@mui/material";
import { IMAGE_BASE_URL } from '../../Confing';
function CastDetailPage({crewInfo}:{crewInfo: any}) {
  const [visibleCount, setvisibleCount] = useState(10);

  const leadMoreHandler = () => {
    setvisibleCount(visibleCount + 10);
    console.log(visibleCount)
  }
  
  return (
    <div  style={{marginBottom:30 }}>
        <div style={{fontWeight:'bolder', fontSize:'20px'}}>주요 출연진</div>
        <hr/>
        {Array.isArray(crewInfo) && crewInfo.length > 0 ? (
          <Box
            sx={{
              height:'340px',
              display: "flex",
              overflowX: "auto",
              gap: 2, 
              p: 2, 
              whiteSpace: "break-word", 
              scrollbarWidth: "thin", 
              "&::-webkit-scrollbar": { height: "6px" }, 
              "&::-webkit-scrollbar-thumb": { backgroundColor: "#888", borderRadius: "10px" },
            }}
          >
            {crewInfo.slice(0,visibleCount).map(( cast: { cast_id: number, name: string, character:string, profile_path:string}) => ( 
              <Stack key={cast.cast_id} spacing={1} alignItems="center" sx={{
                borderRadius: 5,  
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  
              }}>
                <img src={`${IMAGE_BASE_URL}/w500${cast.profile_path}` } width='175px'height='225px' style={{borderTopLeftRadius: "10px",borderTopRightRadius: "10px"}}/>
                {/* <div>{cast.name}</div>
                <div>{cast.character}</div> */}
                <Typography variant="body1" sx={{fontWeight:'bolder'}}>{cast.name}</Typography>
                <Typography variant="body1">{cast.character}</Typography>
                  
              </Stack>
              
            ))}
            <Button onClick={leadMoreHandler}>더 보기</Button>
          </Box>
          ):(
            <p>불러오는 중...</p>
          )
        }
      </div>
  )
}

export default CastDetailPage