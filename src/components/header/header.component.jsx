import React from 'react';
// import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink} from './header.styles'

// import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// import { auth } from '../../firebase/firebase.utils.js';

import { connect } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import { signOutStart } from '../../redux/user/user.action'

const Header = ({ currentUser, hidden, signOutStart })=> (
    <HeaderContainer >
        <LogoContainer  to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink  to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink  to='/shop'>
                CONTACT
            </OptionLink>
            {
                // currentUser ? <OptionDiv  onClick={()=> auth.signOut()}> SIGN OUT </OptionDiv> : <OptionLink  to='/signin'> SIGN IN</OptionLink>
                currentUser ? <OptionDiv  onClick={signOutStart}> SIGN OUT </OptionDiv> : <OptionLink  to='/signin'> SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden? null : <CartDropdown />
            
        }
    </HeaderContainer>
)


// const mapStateToProps = (state) => ({ currentUser : state.user.currentUser})     //This function naming can be anything but mapStateToProps is standard with redux codebases
// Here the "state" argument is specifiically "rootReducer" ,which has a property called 'user' and 'user' has a property called 'currentUser' that comes from userReducer.

const mapStateToProps = createStructuredSelector({ currentUser : selectCurrentUser , hidden: selectCartHidden})   // Here also we used react selector function to make the state property memoized inside the component

const mapDispatchToProps = dispatch => ({
    signOutStart : ()=> dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);      // 'Connect' is a higher order function that takes input of two functions and modifies them into another function. by connecting them.


// NOTE :
/*
 -> The "mapStateToProps" method takes The application data which is the main 'state' as the 1st parameter and it passes the data into the component (Header) as a Property. 
 -> In this case the "state.user.currentUser" data will be pass into the component as a Component Property i.e "this.props.currentUser"
 -> Whenever we export our 'Component' connected to 'mapStateToProps' we are making our component aware of the application data property . 
 */