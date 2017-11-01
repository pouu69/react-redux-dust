import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './module';
// import DevTools from './containers/DevTools';

// const enhancer = compose(
//   applyMiddleware(thunk)
// );

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  // if (module.hot) {
  //   module.hot.accept('./module', () =>
  //     store.replaceReducer(require('./module').default)
  //   );
  // }

  return store;
}