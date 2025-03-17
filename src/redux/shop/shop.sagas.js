import { takeLatest, call, put, all } from 'redux-saga/effects';    
// What takeEvery does is it listen for every action of a specific type that we pass to it. 
// Saga does not use "dispatch" , instead it uses "put" . 'put' is the saga effect of creating actions.

import ShopActionTypes from  './shop.types';       // It helps in listening to specific action types

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';


export function* fetchCollectionsAsync(){

    try{
        const collectionRef = firestore.collection('collections');    // This will create a snapshot object from the firebase 'collections';
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call( convertCollectionsSnapshotToMap, snapshot )   // What "call" does? well call is the effect inside of our generator function that invokes the method.
    
        // note:- we could write like this -> convertCollectionsSnapshotToMap(snapshot),  But we wanted to yield this incase this call takes longer than we expect.
        // This "call" method takes its 1st argument some function and the subsequent argument is the parameter to that function call 
        
        yield put(fetchCollectionsSuccess(collectionsMap))
    }catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }

    // In promise pattern_______
    // collectionRef.get().then( snapshot => {      //What collectionRef.get() does for us that it makes an API call to fetch back tha data associated with this 'collectionRef' which will exactly same as our sanpShot object. 
    //     console.log(snapshot);
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //     console.log(collectionsMap);
  
    //   }
    // ).catch(error => dispatch(fetchCollectionsFailure(error.message)) )
};

export function* fetchCollectionsStart(){            
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
};          // When the FETCH_COLLECTIONS_START action from shop.action  will invoke from shop.component, then the 'fetchCollectionsStart' generator function from shop.sagas will listen to this action , And it will run the  "fetchCollectionsAsync" along with it which is inside the takeEvery. 

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}

//-> Here we have successfully moved our asynchronous actions from redux-thunk function to redux-saga.



// NOTE -:
// -> What Sagas do? what sagaMiddleware does?  -> Its whole purpose is to run the sagas all concurrently
// -> Concurrently means it longs to run togather in a way that does not block the execution.
// -> Imagine we have multiple sagas that are listening and triggering these multiple functions, We might not want our code to wait for each of these functions to finish because that would be blocking our javascript code.
// -> "takeEvery" actually creates a non-blocking call inorder to not stop our application to continue running other sagas or whatever the user wants to do. 
// -> It does not pause the javascript waiting for anything inside our 'fetchCollectionsAsync' to comeback.
// -> Alternatively we are also able to cancel these tasks that are comming out of our functions