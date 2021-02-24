import React from 'react';
// import SHOP_DATA from './shop.data.js';

import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils.js';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';


// class ShopPage extends React.Component{
//     constructor(props){
//         super(props)

//         this.state = {
//             collections : SHOP_DATA
//         }
//     }


const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage); 


class ShopPage extends React.Component{
  constructor(){
    super();

    this.state = {
      loading: true
    }
  }

  unsubscribeFromSnapshot = null;


  componentDidMount(){

    const { updateCollections } = this.props;

    const collectionRef = firestore.collection('collections');    // This will create a snapshot object from the firebase 'collections';

    fetch('https://firestore.googleapis.com/v1/projects/cwn-db-61a95/databases/(default)/documents/collections')
    .then(response => response.json())
    .then(collections => console.log(collections));


    // In promise pattern_______
    collectionRef.get().then( snapshot => {      //What collectionRef.get() does for us that it makes an API call to fetch back tha data associated with this 'collectionRef' which will exactly same as our sanpShot object. 
        console.log(snapshot);
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        console.log(collectionsMap);
  
        updateCollections(collectionsMap);
        this.setState({ loading: false })
  
      }
    )     // In this pattern the only time we ever get our data from our backend is when we remount our shop, this because we are no longer leveraging the live update stream style that the 'Observable' pattern lended us when we are using "onSnapshot" . In above promise pattern we are literally doing one API call inside our "componentDidMount()" leveraging the Promise chain style of doing Asynchronous event handling. 


    // In Observer/ Observable pattern_______
/*    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      console.log(snapshot);
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      console.log(collectionsMap);

      updateCollections(collectionsMap);
      this.setState({ loading: false })

    }) */   //This means whenever the snapShot obejct gets updated or get rendered for the firsttime this 'collectionRef' will send us the snapShot reprensenting the code of our collection object array at the ti,e when this code gets rendered.


  }

  render(){
    const { match } = this.props;         // Just because our "ShopPage" is nested inside our "App.js" through Route , So it will pass 3 Object like 'match', 'location, 'history' as Props 
    const { loading } = this.state;
    return(
            <div className='shop-page'>
              <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} /> 
              <Route path ={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>} />
            </div>
    )
  }   // NOTE : 'render' takes a function in which parameter it passes the props of 'Route' like location,history, match and returns a component
}

const mapDispatchToProps = dispatch => ({
  updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
})
  

export default connect(null, mapDispatchToProps) (ShopPage);