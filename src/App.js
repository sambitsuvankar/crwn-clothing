import React from 'react';
import './App.css';
import  HomePage  from './pages/homepage/homepage.component.jsx';

import { Route, Switch,  } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component.jsx';

import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

import { auth } from './firebase/firebase.utils';


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
    this.unsubscribeFromAuth =  auth.onAuthStateChanged(user => { this.setState({ currentUser: user }); console.log({user}) })
    
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