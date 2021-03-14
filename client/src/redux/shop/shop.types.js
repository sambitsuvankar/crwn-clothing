const ShopActionTypes = {
    UPDATE_COLLECTIONS: 'UPDATE_COLLECTIONS',
    FETCH_COLLECTIONS_START: 'FETCH_COLLECTIONS_START',       // It tells the redux that we are starting to fetch the data. This is actually before any data gets fetched ,It is our 1st API calls before our firestore begins
    FETCH_COLLECTIONS_SUCCESS: 'FETCH_COLLECTIONS_SUCCESS',  // which is where it comes back to us with a successful API request and hopefully the data that we nedd is comeback as well
    FETCH_COLLECTIONS_FAILURE: 'FETCH_COLLECTIONS_FAILURE'
}

export default ShopActionTypes;