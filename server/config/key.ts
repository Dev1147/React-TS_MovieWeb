import prodConfig from './prod';
import devConfig from './dev';

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

//npm run dev면 몽고디비 개발 주소 사용
//npm run start면 따로 설정된 주소 사용
export default config;
