import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chai, { expect as expectChai, assert} from 'chai' // You can use any testing library
import 'whatwg-fetch';
import * as Actions from '../../src/module/dust';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('1. Redux Test', () => {
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

	const payload = {
		val: 40,
		status: 'high',
		region: 'seoul'
	}

	describe('1. Async Actions', () => {
		let context = {
			store : null
		}

		beforeEach( () => {
			context.store = mockStore(initState);
		});


		it('1-1. fetch를 시작하여 성공하면 "SUCCESS_FETCH_DUST" 액션이 생성됩니다. ', () => {
			const region = 'seoul';
			return context.store.dispatch(Actions.getDust(region)).then(() => {
				const realActions = context.store.getActions();
				expectChai(realActions[1]).to.deep.include({type: Actions.ActionTypes.SUCCESS_FETCH_DUST});
			});
		});

		it('1-2 fetch를 시작하여 실패하면 "FAILED_FETCH_DUST" 액션이 생성됩니다.', () => {
			const region = 'abc';
			return context.store.dispatch(Actions.getDust(region)).then(() => {
				const realActions = context.store.getActions();
				expectChai(realActions[1]).to.deep.include({type: Actions.ActionTypes.FAILED_FETCH_DUST});
			});
		});
	});

	describe('2. Reducer', () => {
		const reducers = Actions.default;

		it('1. initState 반환', () => {
			expect(reducers(undefined , {})).toEqual(initState);
		});

		it('2. SUCCESS_FETCH_DUST 실행', () => {
			const successFetchDustAction = {
				type: Actions.ActionTypes.SUCCESS_FETCH_DUST,
				payload
			}
			const expectResult = { 
				pending: false,
				progress: { isFetching: false },
				dust: { val: 40, region: 'seoul', status: 'high' } 
			}
			expect(reducers({}, successFetchDustAction)).toEqual(expectResult); 
		});

		it('3. FAILED_FETCH_DUST 실행', () => {
			const failedFetchDustAction = {
				type: Actions.ActionTypes.FAILED_FETCH_DUST,
				payload: { message: "error" }
			}
			const expectResult = {
				pending: false,
				failed: { message: "error" },
				progress : { isFetching: false }
			}
			expect(reducers({}, failedFetchDustAction)).toEqual(expectResult); 
		});
	});
});