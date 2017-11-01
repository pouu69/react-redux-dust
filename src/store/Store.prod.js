import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../module';

export default function configureStore() {
  const store = createStore(rootReducer,   applyMiddleware(thunk));
  return store;
}