import React from 'react';
import SHOP_DATA from './shop.data.js';
import CollectionPreview from '../../components/collection-preview-component/collection-preview.component';


class ShopPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            collections : SHOP_DATA
        }
    }


    render(){
        const {collections} = this.state
        return(
            <div className='shop-page'>
              {
                  collections.map(({id, ...otherCollectionProps}) => (                  //"...otherCollectionProps"  = {title, routerName. items}
                      <CollectionPreview key={id} {...otherCollectionProps} />        // Here we set the props value through spread operator. that means title='title', routerName="routerName", item='item'
                  ))
              }
            </div>
        )
    }
}

export default ShopPage