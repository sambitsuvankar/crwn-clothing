import React from 'react';
import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';


import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selector.js';


const CollectionPage = ({ collection }) =>{
    console.log(collection)
    const {  items, title } = collection
    return(
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item => (<CollectionItem key={ item.id } item={ item }/> ))
            }
        </div>
    </div>
)}

const mapStateToProps = (state, ownProps) => ({     //The 1st parameter is the total 'state' , and the 2nd parameter is the 'ownProps' that has already been passed into our component. ex: 'match' through 'Route'
        collection: selectCollection(ownProps.match.params.collectionId)(state)    // This is necessary because unlike other selectors, this selector needs a part of the state depending on the URL parameter.
})

export default connect( mapStateToProps )( CollectionPage );