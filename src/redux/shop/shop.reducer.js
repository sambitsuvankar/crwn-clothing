// import SHOP_DATA from "../../pages/shop/shop.data"
// import SHOP_DATA from './shop.data';

import ShopActionTypes from './shop.types';

// const INITIAL_STATE = {
//     collection: SHOP_DATA
// }

const INITIAL_STATE = {
    collection: null
}

const shopReducer = (state = INITIAL_STATE, action ) => {
    switch ( action.type ){
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state
    }
}

export default shopReducer;