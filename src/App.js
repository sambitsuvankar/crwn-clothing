import React from 'react';
import './App.css';
import  HomePage  from './pages/homepage/homepage.component.jsx';

import { Route, Switch, Redirect } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';

import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

import { auth, createUserProfileDocument, /*addCollectionAndDocuments*/ } from './firebase/firebase.utils';
import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/user.action';

import { selectCurrentUser } from './redux/user/user.selectors';

// import { selectCollectionForPreview } from './redux/shop/shop.selector'


/* const HatsPage = (props) => (
   <div>
   {console.log(props)};
     <button onClick={()=> props.history.push('/jackets')}>Jackets</button>
       <h1>HATS PAGE:  {props.match.params.hatsID}</h1>
     </div>
 )
 const JacketsPage = (props) => (
     <div>
    
     <Link to="/hats/15">HATS</Link>
       <h1>JACKETS PAGE</h1>
     </div>
 )  */

class App extends React.Component {
  // constructor(){
  //   super()

  //   this.state = {
  //     currentUser: null      // To save the authentication state change.
  //   }
  // }

  
  unsubscribeFromAuth = null  // The first stage when the user is not signed in.

  componentDidMount(){        // componentDidMount() runs every time we refresh the page as it is a lifecycle method.
    const { setCurrentUser,  } = this.props; 
    console.log(this.props)

    this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {    // When the user sign in, then the 'userAuth' = an obejct of authorized person's data. / and when the user sign out, then the state change & userAuth became null.  
       if(userAuth) {    // this means if userAuth exists means if the person is signed in.
         const userRef = await createUserProfileDocument(userAuth); // passing the userAuth data inside createUserProfileDocument will help the new login user's data get saved into the database.

         userRef.onSnapshot(snapShot => {     // onSnapshot() method gets fired everytime the 'snapShot' object gets updated.
              console.log(snapShot.data())    // snapShot.data() is the data that we stored in our database.

              setCurrentUser ({   // instead of this.setState we are passing an action object to our user action function.
                  id: snapShot.id,
                  ...snapShot.data()
                })
              
              console.log(this.props.setCurrentUser)
         })
      }
      setCurrentUser( userAuth , ()=> console.log(setCurrentUser))    // If the person signed out then the 'userAuth' became null and the "if" clause won't be executed. and the currentuser value will set to be null again.


      // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items }) ))       // This will set the shop data into the firebase 
    }, error => console.log(error));  
  }

  componentWillUnmount(){     // To get the user status back to previous.
    this.unsubscribeFromAuth();  // Calling the Unsubscribe function() when the component is about to unmount is the best way to make sure  we dont get any memory leaks in our application related to listeners still being open even if the component that cares about the listeners is no longer on the page. 
  }


  render(){
    return (
      <div >
        <Header />
        <Switch>
            <Route exact path='/' component={HomePage} />   
            
            <Route path='/shop' component={ShopPage} />

            <Route exact path='/checkout' component={CheckoutPage} />
  
            <Route exact path='/signin' render= {() => this.props.currentUser ? (<Redirect to ='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({     //here we are attaching the 'currentUser' value as a Property to the "App" component through 'connect'   
  currentUser: selectCurrentUser(state),  // Here also we used the react selector function to make the data inside the component memoized
  // collectionsArray :  selectCollectionForPreview(state)   // Here we pushed the shop data array as 'collectionArray' as a props inside our componentDidMount.
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))  // 'dispatch' is a way for redux to know that whatever object we are passing in that is gonna be an action object that redux gonna pass to every reducer. 
})

export default connect(mapStateToProps, mapDispatchToProps)(App);  // Here we have connected the 'mapDispatchToProps' to the 'App' so that "setCurrentUser" can be sent as a props inside the App 



// NOTE:
// <Route exact path='/' component={HomePage} />    //// Here the 'component' describes the targeted webpage. 'path' describes the URL path , and 'exact' possess a boolean values, either it is true or false. 
// The default value of exact is always true. 

// <Switch> </Switch>  this performs a functionality in which as long as it matches the path '/' it switch the browser page to that page immidiately. 