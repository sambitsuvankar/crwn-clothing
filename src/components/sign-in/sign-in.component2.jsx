// In this version we have used class component with constructor having our state.

import React from 'react';
import './sign-in.styles.scss';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from  '../custom-button/custom-button.component';

// import {signInWithGoogle, auth} from '../../firebase/firebase.utils';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action.js';

class SignIn extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    
    handleSubmit = async event => {    // This handleSubmit() method is created for preventing the default event on submit. and this will erase the input field after submitting the form. 
        event.preventDefault();

        const { email, password } = this.state;
          
/*        try{
            await auth.signInWithEmailAndPassword(email, password);  // This signInWithEmailAndPassword is a built in function that comes with auth. library of firebase
            this.setState({ email: '', password: '' })   // This will empty the input field after submitting

        }catch(error){
            console.error(error)
        }                     */
        

        // No more setState. Redux will handle the state from here on out with saga...........
        const { emailSignInStart } = this.props;

        emailSignInStart( email, password )
            
        console.log(this.state);
        console.log(this.props);
    }
    
    
    handleChange = event => {        // This handleChange() method is created because when there is a change happens in the input field it will track the data input and set to the ths.state.
        const { value, name } = event.target;
        
        this.setState ({ [name]: value }) 
    }

    render(){
        const { googleSignInStart } = this.props
        return(

            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your Email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' value={this.state.email} label='email' handleChange={this.handleChange} required />
                    
                    <FormInput name='password' type='password' value={this.state.password} label='password' handleChange={this.handleChange} required />
                   
                    <div className='button'>
                        <CustomButton type='submit' value='Submit Form'> Sign In </CustomButton>
                        <CustomButton type ='button' onClick={googleSignInStart} isGoogleSignIn > Sign In with Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart:  (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)( SignIn );