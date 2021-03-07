
import { all, call } from 'redux-saga/effects';
import { cartSagas } from './cart/cart.sagas';

import { shopSagas } from './shop/shop.sagas';
import { userSaga } from './user/user.sagas'
 
export default function* rootSaga(){
    yield all([
        call(shopSagas),
        call(userSaga),
        call(cartSagas)
    ])
}      // What 'all()' does? 'all()' take an array of sagas 

       // By using yield all , we are able to call() all the sagas inside of this array and initialize them all in separate task stream