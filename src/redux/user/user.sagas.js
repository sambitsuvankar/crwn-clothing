import { takeLatest , put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.action'
// We are just gonna listen our GOOGLE_SIGN_IN_START and then we are gonna trigger our actual signIn from the saga.


// Google sign in Process
export function* signInWithGoogle(){
    try{
        const { user } = yield auth.signInWithPopup(googleProvider );      // this 'user' is the same Object that we got as 'userAuth' from ' auth.onAuthStateChanged'
        console.log(user)

        const userRef = yield call(createUserProfileDocument,user)      // This is exactly the same as "const userRef = await createUserProfileDocument(userAuth);"  
        const userSnapShot = yield userRef.get();                       // This is to get our sanpshot object ;
        console.log(userSnapShot)
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))            // 'put()' puts things back into our regular redux flow     

    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle )      // by mapDispatchToProps "GOOGLE_SIGN_IN_START" action will trigger when the button will be clicked. And the 'takeLatest()' method from redux-saga will listen to that action ASAP and run our generator function 'signInWithGoogle' along with the action call. 
};

// Email sign in Process
export function* signInWithEmail({payload: {email,password}}){
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        console.log(user)
        const userRef = yield call(createUserProfileDocument, user);   // Here 'user' will pass as a parameter to 'createUserProfileDocument' function.
        const userSnapShot = yield userRef.get();
        console.log(userSnapShot)
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))

    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)        // 'EMAIL_SIGN_IN_START' action has 'email and password' in it's payload which will be passed to 'signInWithEmail' generator function as an argument
}


export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();          // The 'getCurrentUser()' function from 'firebase.utils' return the 'userAuth' Object.

        if(!userAuth) return;    // if the 'userAuth' object is null that means user signed out then it will immidiately return.

        const userRef = yield call(createUserProfileDocument,userAuth);       // But if the 'userAuth' exists then it will save as the current user.
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
    }catch(error){
        yield put(signInFailure(error));
    }
}


export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}


export function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess())
    }catch(error){
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut )
}


export function* signUp({payload: {email,password,displayName}}){
    try{
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument,user, {displayName} );
        const userSnapShot = yield userRef.get();
        yield put(signUpSuccess({ id: userSnapShot.id, displayName: displayName, ...userSnapShot.data() }))
    }catch(error){
        yield put(signUpFailure(error))
    }
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* userSaga(){
    yield all(
        [call(onGoogleSignInStart),
         call(onEmailSignInStart),
         call(onCheckUserSession),
         call(onSignOutStart),
         call(onSignUpStart)]
        )
}