import { createSelector } from 'reselect';

// Therer are 2 types of selectors: i) Input selectors that does not use 'createSector()'
//                                 ii) Output selectors that does use 'createSelctors()' and 'input' selectors to build itself.

// Input selectors
const selectCart = state => state.cart;        // This is an input selector , This will takes the whole state and returns a slice of it .. like state.cart


// The output selectors takes two arguments ,the 1st one is the array of input selectors and the 2nd one is going to be a function that will return the value we want ..
// The function, which is in the 2nd parameter of the output selector, will take each output of the input selectors inside the array, as it's parameter.

// Output selectors
export const  selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems

)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

export const  selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(( accumulatedQuantity, cartItem ) => accumulatedQuantity + cartItem.quantity , 0)  // Here we have used the reduce() method to get the summation of all the product quantities.
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(( accumulatedQuantity, cartItem ) => accumulatedQuantity + ( cartItem.price * cartItem.quantity ), 0)

)

// Because we used the "createSelector" to build the output selector so it is now a momoize selector.