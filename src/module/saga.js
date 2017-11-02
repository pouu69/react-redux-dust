import { take, call, put, fork } from 'redux-saga/effects'
import * as DustModule from './dust-saga';

function* fetchDust(action){
	while(true){
		try{
			const action = yield take(DustModule.ActionTypes.REQUEST_FETCH_DUST);
			const { payload } = yield call( DustModule.getDust, action.payload );
			if(payload){
				yield put(DustModule.successFetchDust({ ...payload }));
			}
		}catch(e){
			yield put(DustModule.failedFetchDust({message: e}));
		}
	}
}

export default function* rootSaga(){
	yield fork(fetchDust);
}