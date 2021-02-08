import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils.js';

import { connect } from 'react-redux';

const Header = ({ currentUser })=> (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? <div className='option' onClick={()=> auth.signOut()}> Sign Out </div> : <Link className='option' to='/signin'> Sign In</Link>
            }
        </div>
    </div>
)


const mapStateToProps = (state) => ({ currentUser : state.user.currentUser})     //This function naming can be anything but mapStateToProps is standard with redux codebases
export default connect(mapStateToProps)(Header);      // 'Connect' is a higher order function that takes input of two functions and modifies them into another function. by connecting them.


// NOTE :
/*
 -> The "mapStateToProps" method takes The application data which is the main 'state' as the 1st parameter and it passes the data into the component (Header) as a Property. 
 -> In this case the "state.user.currentUser" data will be pass into the component as a Component Property i.e "this.props.currentUser"
 -> Whenever we export our 'Component' connected to 'mapStateToProps' we are making our component aware of the application data property . 
 */