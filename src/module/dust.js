import { createAction, handleActions } from 'redux-actions';

/* initial state */
const initState = {
	progress : {
		isFetching: false
	},
	pending: false,
	failed: false,
	dust : {
		val: 0,
		region: "N/A",
		status: "N/A"
	}
}

/* Action types */
const START_FETCH_DUST   = 'dust/START_FETCH_DUST';
const SUCCESS_FETCH_DUST = 'dust/SUCCESS_FETCH_DUST';
const FAILED_FETCH_DUST  = 'dust/FAILED_FETCH_DUST';

export const ActionTypes = {
	START_FETCH_DUST,
	SUCCESS_FETCH_DUST,
	FAILED_FETCH_DUST
}


/* Action creators */
export const startFetchDust   = createAction(START_FETCH_DUST);
export const successFetchDust = createAction(SUCCESS_FETCH_DUST);
export const failedFetchDust  = createAction(FAILED_FETCH_DUST);

/* Side effects */
export const getDust = (region) => async (dispatch) => {
	dispatch(startFetchDust());

	try{
		const response = await fetch(getApi(region), {
			method: 'GET',
			headers: {
				Accept: 'application/json'
  			}
  		});
		const data = await response.json();
		if(data.val === "") throw "Emtpy Data";
		dispatch(successFetchDust({ ...data, region }));
	}catch(e){
		dispatch(failedFetchDust({message: "error"}));
	}
}

/* utils */
const updateObj = (oldObj, newVal) => Object.assign({}, oldObj, newVal)
const getApi = (region) => `https://9z2zrff9fe.execute-api.ap-northeast-2.amazonaws.com/v1/dust?region=${region}`

/* reducers */
export default handleActions({
	[START_FETCH_DUST]: (state, action) => {
		return updateObj(state, {
			pending: true,
			failed: false,
			progress : {
				isFetching: true
			}
		});
	},

	[SUCCESS_FETCH_DUST]: (state, action) => {
		const { val, region , status } = action.payload;

		return updateObj(state, {
			pending: false,
			progress : {
				isFetching: false
			},
			dust: {
				val: val,
				region: region,
				status: status
			}
		});
	},

	[FAILED_FETCH_DUST]: (state, action) => {
		const { message } = action.payload;

		return updateObj(state, {
			pending: false,
			failed: {
				message: message
			},
			progress : {
				isFetching: false
			}
		});
	}
}, initState);