import { combineReducers } from 'redux';
import reducer from './dust-saga';

const rootReducer = combineReducers({
	dust : reducer
});

export default rootReducer;