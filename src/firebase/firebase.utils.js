import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyC3OKOuismwib7nB-zTKdXWmGdHevAtAOY",
   authDomain: "cwn-db-61a95.firebaseapp.com",
   projectId: "cwn-db-61a95",
   storageBucket: "cwn-db-61a95.appspot.com",
   messagingSenderId: "358606701228",
   appId: "1:358606701228:web:ae5cb35f657ca81391d509",
   measurementId: "G-WJQ95L8MHJ"
  }






firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' }) 

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;


///////////////////////////////////////////////////////////////////

// Very import section ✅✅✅✅✅✅❎✅✅✅✅✅

// What this "createUserProfileDocument" method does is , It will take the data of of authenticated user then it will create a snapshot of document reference of the Object. Then it will check wheather the user is previously loged in or not means the user login data was previously saved in the database or not. If it was saved in the database before then it will just return the snapShot reference. But if it found out that the user is logging in newly then it will save that document snapshot object of the new user into the database. 

export const createUserProfileDocument = async (userAuth, additionalData) => {   // Here the userAuth is the authenticated user obejct.
    if(!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`)   // Here we store the document reference object to the 'userRef' variable.
   
   const snapShot = await userRef.get()                     // her we create the snapShot object from the document reference.

   console.log(snapShot)

    if(!snapShot.exists){    // When we log in for the first time the documentSnapshot Object is not exist in the database.//  So when login for the first time the snapShot.exist = false.

        const { displayName, email } =  userAuth;     //Here we took the 'displayName' & 'email' property from the 'userAuth' object by using destructuring method
        const createdAt = new Date();

        try{
           await userRef.set({          // Here we write and update the properties to the database by using .set()
               displayName,email,createdAt, ...additionalData 
           })
        }catch (error){
           console.log('error creating user', error.message)
        }
    }

    return userRef;
};


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc(obj.title);
        batch.set(newDocRef, obj)
    });

    return await batch.commit()                                           // batch.commit() returns a Promise , when promise succed it will comeback as a result of void value means a null value. 

    // We did all of this so that we don't have to manually enter each collection and item into firebase. 
}


export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI (title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    console.log(transformedCollection);

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[ collection.title.toLowerCase() ] = collection;
        return accumulator;
    }, {} )
    
}


export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {   // this will return a signed in user data as an Object 'userAuth'
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}



// Notes
/* Query reference and query snapshot
-> A query is a request we make to firestore to give us something from the database.
-> firestore returns us two types of objects : references and snapshots. Of these objects they can be either documents or collection versions.
-> Firestore will always return us these objects , even if nothing exists at from that query


_____ Query Reference _____

-> A Query reference object is an object that represents the 'current' place in the database that we are querying.
-> We get them by calling either : firestore.doc('/users/:userId');   or   Firestore.collections('/users') 

-> The query reference object does not have the actual data of the collection of document. It instead has properties that tell us details about it, or the method to get the snapshot object which gives us the data we are looking for 
*/

/* 
___ Document reference vs collection reference____

-> We use documentRef objects to perform our CRUD methods( create, retrieve, update, delete ). The documentRef methods are .set(), .get(), .update(), and .delete() respectively.

-> We can also add documents to collection using the collectionRef object using the .add() method  ______ ex) collectionRef.add({ value : prop })

-> We get the snapshotObject from the referenceObject using the .get() method ///   i.e documentRef.get() or collectionRef.get()

-> documentRef returns a socumentSnapshot object.
-> collectionRef returns a querySnapshot object.
*/

/* ______ Document SnapShot ______

-> We get a documentSnapShot object from our documentReference object.

-> The document snapshot obejct allows us to check if a document exists at this query using the '.exist' property which returns a boolean.

-> We can also get the actual properties on the object by calling the .data() method, which returns us a JSON object of the Document. 
*/