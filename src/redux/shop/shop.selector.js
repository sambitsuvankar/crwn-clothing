import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopSection = createSelector (
    [selectShop],
    shop => shop.collection
)


export const selectCollectionForPreview = createSelector(
    [selectShopSection],
    collection => Object.keys(collection).map(key => collection[key])   // Object.keys() will return an Array of keys, then we map over the keys Array.

)

// const COLLECTION_ID_MAP = {
//     hats:1,
//     sneakers: 2,
//     jackets:3,
//     womens: 4,
//     mens: 5
// }

export const selectCollection = memoize((collectionUrlParam) => createSelector(
    [selectShopSection],
    collections => collections[collectionUrlParam]                              // This is for Object data type
    // collection => collection.find(
    //     cllctn => cllctn.id === COLLECTION_ID_MAP[collectionUrlParam]        // This for Array data type
    // )
))

// NOTE
/*
Memoize does the same idea of memoization as reselect does for our selectors, except this time we're memoizing the return of our function which returns our selector:

(collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
 )
By wrapping this function in memoize, we're saying that whenever this function gets called and receives collectionUrlParam, I want to memoize the return of this function (in this case we return a selector). If this function gets called again with the same collectionUrlParam, don't rerun this function because we'll return the same value as last time, which we've memoized so just return the selector that's been stored.

*/