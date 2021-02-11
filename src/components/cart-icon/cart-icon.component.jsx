import React from 'react';
import './cart-icon.styles.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { connect } from 'react-redux'; 

import { toggleCartHidden } from '../../redux/cart/cart.action.js';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className= 'cart-icon' onClick={ toggleCartHidden }>
        <ShoppingIcon className='shopping-icon' />
        <span className = 'item-count' >{ itemCount }</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())  // Here also the "toggleCartHidden" action passed as a parameter inside the CartIcon component through 'connect'
});

const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)  
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);


// NOTE 
/*
-> Every time we perform a action our state changes... When the state changes all the component will get rerendered. Even if some of the state values might not change after an action but they are also get rerendered without even getting any update in the state. This will hamper the overaall performance of the application. For example, even if we do not add any items to cart but The 'itemsCount' will still get rerendered. 

-> To Solve this we have a library in redux called "reselect" . 

-> When we perform an action and the output of the perticular part of the state does not change, We don't necessarily rerender that part , This is called 'MEMOIZATION' , which does the caching of the selectors values.

-> We can achieve this kind of memoization using a library called "reselect".

-> Reselect allows us to write the selectors in such a way that it knows if the properties that it pulling from the state are the same, In the sense of their values has not change then it won't pass theminto our component.
*/