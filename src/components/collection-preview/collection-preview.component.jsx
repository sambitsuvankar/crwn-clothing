import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

import { withRouter } from 'react-router-dom';

const CollectionPreview = ({ title, items, history, match }) => (       // Here the 'items' parameter is the same key value which is in shop.data.js file.
    <div className='collection-preview'>
        <h1 className='title' onClick={()=> history.push(`${match.path}/${title.toLowerCase()}`) }>{title.toUpperCase()}</h1>
        <div className='preview'>
            {
                items.filter((item, index) => index < 4).map((item)=> (   // Here we destructured the 'items' values, which contains 4 key:value pair. i.e id, name, imageUrl, price 
                    <CollectionItem key={item.id} item={item} />                        // We passed that 4 values as the 'props' of the 'CollectionItem' 
                ))
            }
        </div>
    </div>
)  
 
export default withRouter(CollectionPreview);