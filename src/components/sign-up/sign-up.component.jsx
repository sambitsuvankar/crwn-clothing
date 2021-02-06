import React from 'react';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils.js';


class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;  //The values of the destructured variables we have got from the submission of <FormInput>

        if(password !== confirmPassword){
            alert("password don't match");
            return;
        };

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });

            this.setState({             // This will clear our form... after submittng the form..
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            })

        }catch(error){
            console.error(error)
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name]: value})      // This will set the this.set properties on any changes in the input field.
    }


    render(){
        const {displayName, email, password, confirmPassword } = this.state;   // Here we destructured the value of this.state and save them into multiple variables. // From the 'value' properties in the <FormInput>  we have set the values of those keys in the this.state.
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account </h2>
                <span>Sign up with your Email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>

                    <FormInput type='text' name='displayName' value ={displayName} onChange={this.handleChange} label='Display Name' required />
                    <FormInput type='email' name='email' value ={email} onChange={this.handleChange} label='Email' required />    
                    <FormInput type='password' name='password' value ={password} onChange={this.handleChange} label='Password' required />
                    <FormInput type='password' name='confirmPassword' value ={confirmPassword} onChange={this.handleChange} label='Confirm Password' required />
                    
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                    
                </form>
            </div>
        )
    }
}

export default SignUp