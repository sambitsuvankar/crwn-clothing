import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

import CartItem from '../cart-item/cart-item.component';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action.js';

import { selectCartItems } from '../../redux/cart/cart.selectors';

import { withRouter } from 'react-router-dom';

const CartDropdown = ({ cartItems, dispatch, history }) =>{
    console.log(history)
    return(
    <div className='cart-dropdown' >
        <div className='cart-items'>
            {   
                cartItems.length ? (
                cartItems.map( cartItem => (<CartItem key={cartItem.id} item={cartItem}/>)) 
                ) : (
                    <span className='empty-message'>Your cart is empty!</span>
                ) 
            }
        </div>
        <CustomButton onClick={()=> {history.replace('../checkout');  dispatch(toggleCartHidden()) }}>GO TO CHECKOUT</CustomButton>
    </div>
)}


const mapStateToProps = ( state ) => ({ cartItems : selectCartItems(state) })        // Here we used the react selector function to make it memoize

export default withRouter( connect(mapStateToProps)(CartDropdown));

//NOTE :- If we do not pass the "mapDispatchToProps" inside the "connect" then It still pass the 'dispatch' as a property into the 'CartDropdown' component ... So we can still use that dispatch to pass the action inside our component.  