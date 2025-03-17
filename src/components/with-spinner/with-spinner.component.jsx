import React from 'react';

// import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles.jsx';

import Spinner  from './with-spinner.component'

/*  const WithSpinner = WrappedComponent =>{   // Our 'WithSpinner' is a Higher Order Component that takes one component as an argument and gives us back a spinner component that will render the component that we have passed in when the loading is become 'false'

    const Spinner = ({ isLoading, ...otherProps }) => {    // isLoading is going to be only a boolean value.
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        )  :  (
            <WrappedComponent { ...otherProps } />
        )
    };

    return Spinner;
    
}  

export default WithSpinner;    */


const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {   // isLoading is going to be only a boolean value.
        return isLoading ? <Spinner/> :   <WrappedComponent { ...otherProps } />
    
}

export default WithSpinner;