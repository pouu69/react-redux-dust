import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import chai, { expect as expectChai, assert} from 'chai'
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
		// Given
		let context = {
			store : null,
			action : null
		}

		beforeEach( () => {
			context = { 
				store : mockStore(initState),
				action: Actions.getDust
			}
		});


		it('1-1. fetch를 시작하여 성공하면 "SUCCESS_FETCH_DUST" 액션이 생성됩니다. ', () => {
			// Given
			const region = 'seoul';
			const action = context.action(region);
			const expected = {type: Actions.ActionTypes.SUCCESS_FETCH_DUST};

			// When
			const dispatch = context.store.dispatch(action);
			return dispatch.then(() => {

				// Then
				const realActions = context.store.getActions();
				expectChai(realActions[1]).to.deep.include(expected);
			});
		});

		it('1-2 fetch를 시작하여 실패하면 "FAILED_FETCH_DUST" 액션이 생성됩니다.', () => {
			// Given
			const region = 'abc';
			const action = context.action(region);
			const expected = {type: Actions.ActionTypes.FAILED_FETCH_DUST};

			// When
			const dispatch = context.store.dispatch(action);
			return dispatch.then(() => {

				// Then
				const realActions = context.store.getActions();
				expectChai(realActions[1]).to.deep.include({type: Actions.ActionTypes.FAILED_FETCH_DUST});
			});
		});
	});

	describe('2. Reducer', () => {
		// Given
		const reducers = Actions.default;

		it('1. initState 반환', () => {
			// Given
			const action = {};
			const state = undefined;

			// When
			const result = reducers(state, action);

			// Then
			expect(result).toEqual(initState);
		});

		it('2. SUCCESS_FETCH_DUST 실행', () => {
			// Given
			const successFetchDustAction = {
				type: Actions.ActionTypes.SUCCESS_FETCH_DUST,
				payload
			}
			const expectResult = { 
				pending: false,
				progress: { isFetching: false },
				dust: { val: 40, region: 'seoul', status: 'high' } 
			}

			// When
			const result = reducers({}, successFetchDustAction);


			// Then
			expect(result).toEqual(expectResult); 
		});

		it('3. FAILED_FETCH_DUST 실행', () => {
			// Given
			const failedFetchDustAction = {
				type: Actions.ActionTypes.FAILED_FETCH_DUST,
				payload: { message: "error" }
			}
			const expectResult = {
				pending: false,
				failed: { message: "error" },
				progress : { isFetching: false }
			}

			// When
			const result = reducers({}, failedFetchDustAction);

			// Then
			expect(result).toEqual(expectResult); 
		});
	});
});