// In redux The reducer function is gonna have 2 parameters i) state, ii) action .. According to the action we pass the previous state will change . But at the time of passing the state parameter the will be no state property. So we need to create an "INITIAL_STATE" property before creating the (userReducer) function.

const INITIAL_STATE = {
    currentUser : null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER" :    // This switch statement states that whenever the "action.type"  is set to "SET_CURRENT_USER" then the case condition will fire ,And if the action.type don't match then as per the default condition it will return the state which default value is set as INITIAL_STATE
            return{    // it will return all the values that was inside the state as we have mentioned it through spread operator. and also the currentUser.
                ...state,    
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;