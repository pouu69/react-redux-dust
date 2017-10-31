import { combineReducers } from 'redux';
import reducer from './dust';

const rootReducer = combineReducers({
	dust : reducer
});

export default rootReducer;