import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const updateCollections = ( collectionsMap ) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = ( collectionsMap ) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})


export const fetchCollectionsStartAsync = () => {
    
    return dispatch => {
    const collectionRef = firestore.collection('collections');    // This will create a snapshot object from the firebase 'collections';

    dispatch(fetchCollectionsStart());     // It is gonna dispatch the action 'FETCH_COLLECTIONS_START' ,which will switch our reducer state 'isFetching' to 'true'.    And then it gonna begin the async request written below.

    // In promise pattern_______
    collectionRef.get().then( snapshot => {      //What collectionRef.get() does for us that it makes an API call to fetch back tha data associated with this 'collectionRef' which will exactly same as our sanpShot object. 
        console.log(snapshot);
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        console.log(collectionsMap);
  
        dispatch(fetchCollectionsSuccess(collectionsMap));    // this will going to dispatch the "FETCH_COLLECTIONS_SUCCESS" action 
  
      }
    ).catch(error => dispatch(fetchCollectionsFailure(error.message)) )
 }    // In this pattern the only time we ever get our data from our backend is when we remount our shop, this because we are no longer leveraging the live update stream style that the 'Observable' pattern lended us when we are using "onSnapshot" . In above promise pattern we are literally doing one API call inside our "componentDidMount()" leveraging the Promise chain style of doing Asynchronous event handling. 
}


// In the above case This is where the redux-thunk comes in--- It's just a function that return a function that get access to the 'dispatch'.
// So now we can dispatch multiple actions and handle Asynchronous code inside of it 