import { createStore, applyMiddleware } from 'redux';

import { persistStore } from 'redux-persist';    // redux-persist helps the data to store inside our local storage and get the data at the time of reloading the page

import logger from 'redux-logger';     // logger helps in log the action to the console.

import rootReducer from './root-reducer';

// import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';

// const middlewares = [thunk];

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}
// NOTE :-> In nodeJs 'environment(env)' is a Property, when we type 'yarn start' , It runs in a development environment and when we type ' yarn build' it runs in our production environment.


export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run( rootSaga );

export const persistor = persistStore(store);

// export default { store, persistor }; 



// NOTE: If redux-thunk middleWare is enabled, anytime you attempt to dispatch a function instead of an Object , The middleware will call the function with dispatch method itself as the first argument

