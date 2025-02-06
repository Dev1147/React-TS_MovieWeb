import React from 'react'
import Button, {Box, Typography}  from '@mui/material';

function TestPage() {
  return (
    <div>
        <Box
      sx={{
        position: "relative",
        width: "100vw",  // ✅ 전체 화면 너비
        height: "100vh", // ✅ 전체 화면 높이
        overflow: "hidden",
      }}
    >
      {/* ✅ 배경 이미지 */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(https://source.unsplash.com/1600x900/?movie)`, // ✅ 영화 관련 랜덤 이미지
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ✅ 어두운 오버레이 */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "90%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
        }}
      />

      {/* ✅ 화면 중앙 텍스트 */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
          zIndex: 2, // ✅ 배경보다 앞에 표시되도록 설정
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          넷플릭스 스타일 배경 🎬
        </Typography>
        <Typography variant="h5" mt={2}>
          지금 스트리밍하세요!
        </Typography>
      </Box>
    </Box>
    </div>
  )
}

export default TestPage