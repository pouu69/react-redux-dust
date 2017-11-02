import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../module';
import rootSaga from '../module/saga';
import DevTools from '../containers/DevTools';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware( sagaMiddleware ),
  DevTools.instrument()
);

export default function configureStore() {
  const store = createStore(rootReducer, undefined, enhancer);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('../module', () =>
      store.replaceReducer(require('../module').default)
    );
    module.hot.accept('../module/saga', () => {
      const getNewSagas = require('../module/saga');
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(function* replacedSaga (action) {
          yield getNewSagas()
        })
      })
    })

  }



  return store;
}