export const addItemsToCart = ( cartItems, cartItemToAdd ) => {
    const existingCartItem = cartItems.find( cartItem => cartItem.id === cartItemToAdd.id );

    if(existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem );

    }
    return [...cartItems, { ...cartItemToAdd, quantity : 1}]    // at the initial stage when no items are selected ,if someone add an item to cart then the "if" statement will not fire , It will simply return the cartitems properties with the quantity = 1 added to it by default
}

export const removeItemFromCart = ( cartItems, cartItemsToRemove ) => {
    const existingCartItem = cartItems.find( cartItem => cartItem.id === cartItemsToRemove.id );

    if( existingCartItem.quantity === 1 ) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemsToRemove.id );
    }

    return cartItems.map(cartItem => cartItem.id === cartItemsToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)

}