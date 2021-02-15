import { createStore, applyMiddleware } from 'redux';

import { persistStore } from 'redux-persist';    // redux-persist helps the data to store inside our local storage and get the data at the time of reloading the page

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}
// NOTE :-> In nodeJs 'environment(env)' is a Property, when we type 'yarn start' , It runs in a development environment and when we type ' yarn build' it runs in our production environment.


export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

// export default { store, persistor }; 


