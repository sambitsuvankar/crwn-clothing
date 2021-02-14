import React from 'react';
// import SHOP_DATA from './shop.data.js';

import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'

import CollectionPage from '../collection/collection.component';


// class ShopPage extends React.Component{
//     constructor(props){
//         super(props)

//         this.state = {
//             collections : SHOP_DATA
//         }
//     }


    const ShopPage = ({ match }) => (    // Just because our "ShopPage" is nested inside our "App.js" through Route , So it will pass 3 Object like 'match', 'location, 'history' as Props 
            <div className='shop-page'>
              <Route exact path={`${match.path}`} component={CollectionsOverview} />
              <Route path ={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>     
    )
 
    

export default ShopPage