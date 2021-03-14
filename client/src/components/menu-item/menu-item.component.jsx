import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.style.scss';

const MenuItem = ({ title, imageURL ,size, history, match, linkURL}) => (
            <div  className={`${size} menu-item`} onClick={()=> history.push(`${match.url}${linkURL}`)}> 
                <div className='background-image' style= {{backgroundImage : `url(${imageURL})`}} /> 
                <div className='content'>
                    <h1 className='title'>{title}</h1>
                    <span className='subtitle'>SHOP NOW</span>
                </div>
            </div>
)

export default withRouter(MenuItem);


// NOTES
// What "withRouter" is?  It is a higher order component . A higher order component is essentially a function that takes a component as an argument and turns that to a modified component.
// Just like our "MenuItems" that takes props as an argument and render it to a DOM Elements, A higher order component takes any component and modifies it in someway and returns the new modified component 
// In this case we power up our "MenuItems" component to have access to those things related to our router.
// We just pass our "MenuItems" component into this "withRouter" and "withRouter" will then return us back a super powered "MenuItem" component with access to those ('location, histroy, match') that we need access to.