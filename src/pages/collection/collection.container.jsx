import { connect } from 'react-redux';
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { selectIsCollectionsLoaded } from  '../../redux/shop/shop.selector'

import WithSpinner from  '../../components/with-spinner/with-spinner.component'

import CollectionPage from './collection.component'


// What 'compose' does is it will evaluate from right to left order, It will pass 'CollectionsOverview' in to the 'WithSpinner'. And the 'connect' will pass the 'isLoading' property in to the 'WithSpinner' 
// By passing the 'CollectionsOverview' into the 'WithSpinner' we Passing components into the Higher Order components(HOC)
const mapStateToProps = createStructuredSelector({
    isLoading : state => !selectIsCollectionsLoaded(state)
})


const CollectionsPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionsPageContainer;


// NOTE : Notice How constainers don't render anything. They just pass props down to components.