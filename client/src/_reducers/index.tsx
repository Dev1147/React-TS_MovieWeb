import {combineReducers} from 'redux';
import useReducers from './user_reducer';

const rootReducers = combineReducers({
    user: useReducers
})
//combineReducers가 반환하는 전체 상태 구조를 나타냄
export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;