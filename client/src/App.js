
/////// Here We have written the App.js with the functional Component by the Use of React Hooks {useEffect}

import React, {useEffect} from 'react';
import './App.css';
import  HomePage  from './pages/homepage/homepage.component.jsx';

import { Route, Switch, Redirect } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';

import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

// import { auth, createUserProfileDocument, /*addCollectionAndDocuments*/ } from './firebase/firebase.utils';
import { connect } from 'react-redux';

import { setCurrentUser, checkUserSession } from './redux/user/user.action';

import { selectCurrentUser } from './redux/user/user.selectors';

// import { selectCollectionForPreview } from './redux/shop/shop.selector'


const App = ({ checkUserSession, currentUser }) => {
  
  useEffect( () => {
    checkUserSession();
  }, [checkUserSession]);

  
  return (
    <div >
      <Header />
      <Switch>
          <Route exact path='/' component={HomePage} />   
          
          <Route path='/shop' component={ShopPage} />

          <Route exact path='/checkout' component={CheckoutPage} />

          <Route exact path='/signin' render= {() => currentUser ? (<Redirect to ='/' />) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  );
  

}

const mapStateToProps = (state) => ({     //here we are attaching the 'currentUser' value as a Property to the "App" component through 'connect'   
  currentUser: selectCurrentUser(state),  // Here also we used the react selector function to make the data inside the component memoized
  // collectionsArray :  selectCollectionForPreview(state)   // Here we pushed the shop data array as 'collectionArray' as a props inside our componentDidMount.
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user)),  // 'dispatch' is a way for redux to know that whatever object we are passing in that is gonna be an action object that redux gonna pass to every reducer. 
  checkUserSession : () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);  // Here we have connected the 'mapDispatchToProps' to the 'App' so that "setCurrentUser" can be sent as a props inside the App 



// NOTE:
// <Route exact path='/' component={HomePage} />    //// Here the 'component' describes the targeted webpage. 'path' describes the URL path , and 'exact' possess a boolean values, either it is true or false. 
// The default value of exact is always true. 

// <Switch> </Switch>  this performs a functionality in which as long as it matches the path '/' it switch the browser page to that page immidiately. 