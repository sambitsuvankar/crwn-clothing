
// As node does not use ES6 version of javascript inside it we have to use 'require' instead of 'import'

// Here we are setting up our Node server with the help of a library 'express' which really makes it so easy to create a node backend server

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');      // Its a native module, and what path does is , it lets us build pathing for our directory, And the reason for that in our final production build most build gets optimised and you dont actually know a lot of the times what the directory name you might be in. Path just allows it in the moment to calculate it for us .  
// In other words it allows us to dynamically build when we call it from our current directory to actually where we want to go.

if (process.env.NODE_ENV !== 'production') require('dotenv').config();   // This loads the 'dotenv' into our process environment which allows our process.env to access that secrete key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();   // Remember 'express' is just a library that allows us to build an API server easily.

const port = process.env.PORT || 5000       // Then we are gonna say that we want a 'port' that we will host our app on to be either the process.env.PORT or port 5000.   So our server is gonna be on a different port than our localhost.   So our localhost will be on 3000 and our server host will be on 5000.

// NOw inorder for our frontend can actually be able to access our web server we have to tell it that we want it to use that port whenever we make a API request . So for this we have added a property in the "package.json" file of our client which is ["proxy" : "http://localhost:5000",].

app.use(bodyParser.json());      // this says we are gonna make sure that any of the request coming in I want to process their body tag and convert it to JSON so we can use it.

app.use(bodyParser.urlencoded({ extended: true }))   // 'urlencoded' is a way for us to make sure that the url strings are getting in and passing out, which do not contain things like spaces, symbols, or if they do they get properly escaped .


// What happens when we deploy it to production. Is that we have this live web server which is the NODE SERVER which is being run in our heroku url that we passed in .
// Whenever heroku recieves a Requests its going to determine based on the url path what to do .

if( process.env.NODE_ENV === 'production' ) {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req,res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })     // This means any Url the user hits that passes a function and in this function we get a req and res . and what  we want is our 'response; is to send all the static file 

}           // If we are in production now what we want to do is that we want to be able to serve all of the static files in our build

app.listen(port, error => {
    if( error ) throw error;
    console.log('Server running on port '+ port);
})


// What do we need to do next is to set up our first route that allows us to make the stripe charge.
// The reason which we need to make our stripe charge through our backend server is because the way our stripe is set up inorder to the charge to be legitimate it needs to actually come with a secrete key that we get from stripe that we need to send with the request to our stripe inorder to make the charge so that the stripe can know the charge is coming from our account .

// Once we have our actual stripe key integrated into our backend the stripe will let us make charges.
// Now what we actually need to do is build that route that allows us to one recieve Requests from our frontend application but it only actually take that request that our frontend application is making and then pass it as a charge to stripe . 

// And then we actually have to link the 'stripe-button.component' inorder to create the request to the new route that we end up building in our server.js.

// Untill now what we were doing that we were passing this 'onToken' method to our '<StripeCheckOut>' component which was giving us back the token Object which we actually need to pass the stripe through the backend route that we are making. because that token is going to be the legitimate part that we are trying to make . It has all the information regarding the credit card info, the cost of the charge itself 

/*                               Clientside App
                                        |
                                        |
                                        |
                                send payment token
                                        |
                                        |
                                        |
                                       \/
                                    /payment -----------> Make payment charge to stripe ---> [Stripe]
                                        |
                                        |
                                  Express Server                    */


app.post('/payment', (req, res)=> {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes)=> {
        if(stripeErr){
            res.status(500).send({ error: stripeErr })
        }else {
            res.status(200).send({ success: stripeRes})
        }
    })
})