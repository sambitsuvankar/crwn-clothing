// In redux The reducer function is gonna have 2 parameters i) state, ii) action .. According to the action we pass the previous state will change . But at the time of passing the state parameter the will be no state property. So we need to create an "INITIAL_STATE" property before creating the (userReducer) function.

import  UserActionTypes  from './user.types';

const INITIAL_STATE = {
    currentUser : null,
    error: null
}  // This is the exact same thing that we do in our class Component in App.js which is setting up the initial state ; =  this.state = { currentUser : null }

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER :    // This switch statement states that whenever the "action.type"  is set to "SET_CURRENT_USER" then the case condition will fire ,And if the action.type don't match then as per the default condition it will return the state which default value is set as INITIAL_STATE
            return{    // it will return all the values that was inside the state as we have mentioned it through spread operator. and also the currentUser.
                ...state,    
                currentUser: action.payload
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentUser: null,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return{
                ...state,
                error: action.payload 
            }
        case UserActionTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_UP_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;