import React from 'react';
import './App.css';
import  HomePage  from './pages/homepage/homepage.component.jsx';

import { Route, Switch,  } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component.jsx';

import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';


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
  constructor(){
    super()

    this.state = {
      currentUser: null      // To save the authentication state change.
    }
  }

  unsubscribeFromAuth = null  // The first stage when the user is not signed in.

  componentDidMount(){
    this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {    // When the user sign in, then the 'userAuth' = an obejct of authorized person's data. / and when the user sign out, then the state change & userAuth became null.  
       if(userAuth) {    // this means if userAuth exists means if the person is signed in.
         const userRef = await createUserProfileDocument(userAuth); // passing the userAuth data inside createUserProfileDocument will help the new login user's data get saved into the database.

         userRef.onSnapshot(snapShot => {
              console.log(snapShot.data())    // snapShot.data() is the data that we stored in our database.

              this.setState({
                currentUser:{
                  id: snapShot.id,
                  ...snapShot.data()
                }
              })
              console.log(this.state)
         })
      }
      this.setState({ currentUser: userAuth}, ()=> console.log(this.state))    // If the person signed out then the 'userAuth' became null and the "if" clause won't be executed. and the currentuser value will set to be null again.
    })
  }

  componentWillUnmount(){     // To get the user status back to previous.
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div >
        <Header currentUser={this.state.currentUser} />
        <Switch>
            <Route exact path='/' component={HomePage} />   
            
            <Route path='/shop' component={ShopPage} />
  
            <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }

}

export default App;



// NOTE:
// <Route exact path='/' component={HomePage} />    //// Here the 'component' describes the targeted webpage. 'path' describes the URL path , and 'exact' possess a boolean values, either it is true or false. 
// The default value of exact is always true. 

// <Switch> </Switch>  this performs a functionality in which as long as it matches the path '/' it switch the browser page to that page immidiately. 