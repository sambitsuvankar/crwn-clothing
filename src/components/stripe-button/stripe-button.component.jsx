import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import axios from 'axios'

import './stripe-button.styles.scss'


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IKmdGH6ZOEwVpfT1B6V9QWFYvBbAQQdL6wcwGfuO6JKg2meeOucVIbISxnCSvyvnfMPcTEqTT6vZ1C8wL7vQ2IZ00MVd8g8zT';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then( response => {
            alert(' Payment successful ', JSON.parse(response))
        }).catch(error => {
            console.log('Payment error:', JSON.parse(error));
            alert(' There is an issue with your payment. Please make sure you use the provided credit card');
        });
    }


    return(
        <StripeCheckout 
            label= 'Pay Now'
            name = 'CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={ `Your total is ${price}`}
            amount= {priceForStripe}
            panelLabel= 'Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;