import React, {useEffect} from 'react';
import './collection.styles.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { firestore } from '../../firebase/firebase.utils.js';

import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selector.js';


const CollectionPage = ({ collection }) =>{
    /* Consider this componet as a class Component....... the below methods are used in classComponents to mount and unmount the components.
    unsubscribeFromCollections = null;
    
    componentDidMount() {
        this.unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapShot => console.log(snapshot))
    }
    componentWillUnmount() {
        this.unsubscribeFromCollections()
    }
    */

    //  Now as this is a functional component we can do the same thing using useEffect() method from Hooks
    useEffect( () => {
        console.log("I am subscribing....")
        const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(snapShot => console.log(snapShot))
        
        return () => {   //This function which we return is called a clean up function.  And when a useEffect() calls a clean up function then the 'componentWillUnmount'.  So its all way to replicate the lifecycle method 'componentWillUnmount()'.
            console.log("I am unsubscribing.....")
            unsubscribeFromCollections();
        }
    }, [])   // We have passed this empty array because we want to mount our components only once.

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