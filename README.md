# 프로젝트 개요
이 프로젝트는 React와 TS 사용하여 영화 목록을 표시하고, Express를 사용하여 API 요청 및 사용자 인증을 처리합니다.

로그인 시스템은 토큰 기반 인증(JWT)을 사용하여 구현되었습니다. 


## 주요기능
외부 API에서 가져온 영화 목록을 화면에 표시

츨연진 더보기로 api호출하여 더 보기 기능

JWT를 사용한 토큰 기반 로그인 기능


인증된 사용자는 로그인 상태를 유지하며 영화를 열람




## 사이트 이미지

![image](https://github.com/user-attachments/assets/05d295fb-6b0d-4c3c-a54d-1eba75c6227e)

![image](https://github.com/user-attachments/assets/8dda60fc-4547-4ed7-b6a4-916b97f484fc)

![image](https://github.com/user-attachments/assets/b5bd3093-557a-4a9d-90b6-2ad566ea5ee9)

![image](https://github.com/user-attachments/assets/06989d70-abfe-416f-a9d6-0701e44824f8)





## 기술 스택

### Backend (서버)


Node.js: JavaScript 런타임 환경


Express: 경량 웹 프레임워크


MongoDB: NoSQL 데이터베이스


Mongoose: MongoDB ODM 라이브러리


Body-Parser: HTTP 요청 body 데이터 파싱


Nodemon: 코드 변경 시 서버 자동 재시작


Bcrypt: 비밀번호 해싱


JWT: 인증 및 보안 토큰 기반 인증


Cookie-Parser: 쿠키 데이터 파싱


### Frontend (클라이언트)

React: UI 라이브러리


React Router Dom: 클라이언트 사이드 라우팅


Axios: HTTP 요청 라이브러리


Ant Design (AntD): UI 컴포넌트 라이브러리


Redux: 상태 관리 라이브러리


React-Redux: Redux와 React 연결


Redux-Promise: 비동기 액션 미들웨어


Redux-Thunk: 비동기 로직 처리


### 기타
Concurrently: 여러 명령어 동시에 실행




