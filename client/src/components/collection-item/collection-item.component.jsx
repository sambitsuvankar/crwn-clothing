import React from 'react';

// import './collection-item.styles.scss';
// import CustomButton from '../custom-button/custom-button.component';


import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.action'; 

import { CollectionitemContainer, CollectionFooterContainer, AddButton, BackgroundImage, NameContainer, PriceContainer} from './collection-item.styles'


const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
    <CollectionitemContainer >
        <BackgroundImage className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer >
                <NameContainer >{ name }</NameContainer>
                <PriceContainer>{ price }$</PriceContainer>
            </CollectionFooterContainer>     
            <AddButton onClick={()=> addItem(item)} inverted> ADD TO CART </AddButton>
    </CollectionitemContainer>
)}


const mapDispatchToProps = dispatch => ({
    addItem : item => dispatch(addItem(item))
})
export default connect(null, mapDispatchToProps)(CollectionItem);