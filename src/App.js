
/////// Here We have written the App.js with the functional Component by the Use of React Hooks {useEffect}

import React, {lazy, useEffect, Suspense} from 'react';
// import  HomePage  from './pages/homepage/homepage.component.jsx';

import { Route, Switch, Redirect } from 'react-router-dom';

// import ShopPage from './pages/shop/shop.component.jsx';
// import CheckoutPage from './pages/checkout/checkout.component.jsx';

import Header from './components/header/header.component.jsx';

// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

// import { auth, createUserProfileDocument, /*addCollectionAndDocuments*/ } from './firebase/firebase.utils';
import { connect } from 'react-redux';

import { setCurrentUser, checkUserSession } from './redux/user/user.action';

import { selectCurrentUser } from './redux/user/user.selectors';

// import { selectCollectionForPreview } from './redux/shop/shop.selector'

import { GlobalStyle } from './global.styles';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component'

const HomePage = lazy(() => import('./pages/homepage/homepage.component.jsx'));   // This will lazy load our Home page component. Means when the apllication mounts for the first time it will get this chunk that represents everything except for the Homepage .
// Now the problem with this 'lazy' is because this is asynchronous this HomePage has an opertunity where it might not exist and it depends on how fast our server is .And when we request our HomePage from our backend servers it might take some time and the user will see nothing . So to solve this problem we have "react suspense" 
// "Suspense" is a new component that React has released that allows us to wrap any part of our application that might be rendering asynchronous component 

const ShopPage = lazy(()=> import('./pages/shop/shop.component.jsx'));
const SignInAndSignUpPage = lazy(()=> import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'));
const CheckoutPage = lazy(()=> import('./pages/checkout/checkout.component.jsx'));





const App = ({ checkUserSession, currentUser }) => {
  
  useEffect( () => {
    checkUserSession();
  }, [checkUserSession]);

  
  return (
    <div >
      <GlobalStyle/>
      <Header />
      <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Route exact path='/' component={HomePage} />   
              
              <Route path='/shop' component={ShopPage} />
              
              <Route exact path='/checkout' component={CheckoutPage} />
              
              <Route exact path='/signin' render= {() => currentUser ? (<Redirect to ='/' />) : (<SignInAndSignUpPage />)} />
            </Suspense>
          </ErrorBoundary>
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

// Compression :- Yarn add compression --> The 'Compression' library is a library that allows us to compress and Gzip all of the files and chunks that we end up sending out from our server.