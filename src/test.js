import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('ZN9oOPpbmTsHigwPLMA5').collection('cartItems').doc('KIS1F7quFvSbCHHFku6R')

firestore.doc('/users/ZN9oOPpbmTsHigwPLMA5/cartItems/KIS1F7quFvSbCHHFku6R')     // This is equivalent of the line above.

firestore.collection('/users/ZN9oOPpbmTsHigwPLMA5/cartItems')   // This is to get all the collection of the cartItems  