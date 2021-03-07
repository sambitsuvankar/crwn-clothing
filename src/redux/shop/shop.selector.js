import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopSection = createSelector (
    [selectShop],
    shop => shop.collections
)


export const selectCollectionForPreview = createSelector(
    [selectShopSection],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []   // Object.keys() will return an Array of keys, then we map over the keys Array.

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
    collections => collections ?  collections[collectionUrlParam] : null                             // This is for Object data type
    // collection => collection.find(
    //     cllctn => cllctn.id === COLLECTION_ID_MAP[collectionUrlParam]        // This for Array data type
    // )
));

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

export const selectIsCollectionsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching 
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections   // This !! operator will return a  boolean value regarding wheather the shop.components has any value or not
)



// NOTE: the reason for which we have created the "selectIsCollectionsLoaded" is when we are freshly reloaded our homepage ,the shop.collections item would not been fetched at that point of moment.
//       Just because we have not clicked the route path homepage/shop yet so the "shop.component" life cycle component would not have been rendered till now so Our API would not be fetched and isFetching would be : false
//      In this moment if we clicked on any component directly fromm the homepage then the 'isFetching' property would enter in the collection page as 'false' and by that time our collectionpage would get rendered instead of the spinner without getting the shop.collections data . And that will brake our page. 