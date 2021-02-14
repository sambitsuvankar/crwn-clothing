import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collections-overview.styles.scss'

import  CollectionPreview  from '../collection-preview/collection-preview.component.jsx'

import {  selectCollectionForPreview } from '../../redux/shop/shop.selector';


const CollectionsOverview = ({ collections, keys }) => (
    <div className='collection-overview'>
        {
            collections.map(({id, ...otherCollectionProps}) => (                  //"...otherCollectionProps"  = {title, routerName. items}
            <CollectionPreview key={id} {...otherCollectionProps} />        // Here we set the props value through spread operator. that means title='title', routerName="routerName", item='item'
             ))
            
        }   
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)