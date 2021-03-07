import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectIsCollectionsFetching } from '../../redux/shop/shop.selector'
import WithSpinner from '../with-spinner/with-spinner.component';

import CollectionsOverview from './collections-overview.component';

import { compose } from 'redux';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
});

// What 'compose' does is it will evaluate from right to left order, It will pass 'CollectionsOverview' in to the 'WithSpinner'. And the 'connect' will pass the 'isLoading' property in to the 'WithSpinner' 
// By passing the 'CollectionsOverview' into the 'WithSpinner' we Passing components into the Higher Order components(HOC)
const CollectionsOverviewContainer = compose(     
    connect(mapStateToProps),
    WithSpinner
)( CollectionsOverview )


// const collectionsOverviewContainer = connect(mapStateToProps)(WithSpinner( CollectionsOverview ))        // -> This is exactly same as the code written above with 'compose'

export default CollectionsOverviewContainer;