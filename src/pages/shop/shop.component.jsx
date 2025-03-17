import React, { lazy, Suspense, useEffect } from 'react';
// import SHOP_DATA from './shop.data.js';

import { Route } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner.component'
// import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'

// import CollectionsPageContainer from '../collection/collection.container.jsx';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils.js';

import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionsPageContainer = lazy(() => import('../collection/collection.container.jsx'));



const ShopPage = ({ fetchCollectionsStartAsync, match }) => {     // Just because our "ShopPage" is nested inside our "App.js" through Route , So it will pass 3 Object like 'match', 'location, 'history' as Props 

  useEffect(() => {
    fetchCollectionsStartAsync();
  }, [fetchCollectionsStartAsync])   // here we passed 'fetchCollectionsStartAsync' as the 2nd parameter because , When ever we reload our page the 'useEffect()' of this component as well as the parent component which is App.js get triggered simultaneously. and there the "checkUserSession()" action checks the current user status, So just because the App.js component gets updated the 'ShopPage' component will also get updated again .. So to avoid triggering the useEffect of the ShopPage component twice we have passed one condition 'fetchCollectionsStartAsync'.

  return(
          <div className='shop-page'>
            <Suspense fallback={<Spinner/>}>
              <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} /> 
              <Route path ={`${match.path}/:collectionId`} component={ CollectionsPageContainer } />
            </Suspense>
          </div>
  )
}   // NOTE : 'render' takes a function in which parameter it passes the props of 'Route' like location,history, match and returns a component



const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStart())   // This will dispatch the FETCH_COLLECTIONS_START action to the component as a Property. 
})
  

export default connect( null, mapDispatchToProps) (ShopPage);


//////////////////
// NOTE : Its actually a good time to discuss how useEffect is getting triggered as well as rerender cycles .
//      -> We know our shopPage will only get rerendered if the props change and if we use 'setState' inside  if we use state Hook,
//      ->  OR the parent of this component which is the App.js ends up calling its own rerender. And the only time we know that would happen is when our 'currentUser' Update.
//      -> If we do not listen for that kind of change, we will endup calling the 'useEffect()' in our shop.Component.jsx twice.
//      ->  