import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from  '../custom-button/custom-button.component';

import {signInWithGoogle, auth, createUserProfileDocument} from '../../firebase/firebase.utils';

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
        
        try{
            await auth.signInWithEmailAndPassword(email, password);  // This signInWithEmailAndPassword is a built in function that comes with auth. library of firebase
            this.setState({ email: '', password: '' })   // This will empty the input field after submitting

        }catch(error){
            console.error(error)
        }
            
        console.log(this.state);
    }
    
    
    handleChange = event => {        // This handleChange() method is created because when there is a change happens in the input field it will track the data input and set to the ths.state.
        const { value, name } = event.target;
        
        this.setState ({ [name]: value })
        
        
    }

    render(){
        return(

            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your Email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' value={this.state.email} label='email' handleChange={this.handleChange} required />
                    
                    <FormInput name='password' type='password' value={this.state.password} label='password' handleChange={this.handleChange} required />
                   
                    <div className='button'>
                        <CustomButton type='submit' value='Submit Form'> Sign In </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn > Sign In with Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;