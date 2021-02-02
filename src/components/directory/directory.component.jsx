import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.style.scss';

class Directory extends React.Component{
    constructor(){

        super()
                      
            this.state = {
                section: [{
                    title: 'hats',
                    imageURL: 'https://i.ibb.co/cvpntL1/hats.png',
                    id: 1
                },
                {
                    title: 'Jackets',
                    imageURL: 'https://i.ibb.co/px2tCc3/jackets.png',
                    id: 2
                },
                {
                    title: 'Sneakers',
                    imageURL: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    id: 3
                },
                {
                    title: 'women',
                    imageURL: 'https://i.ibb.co/GCCdy8t/womens.png',
                    id: 4,
                    size: 'large',
                },
                {
                    title: 'Mens',
                    imageURL: 'https://i.ibb.co/R70vBrQ/men.png',
                    id: 5,
                    size: 'large',
                }]
            }
        }

        render(){
            return (
                <div className='directory-menu'>
                    {
                        this.state.section.map( ({ title, imageURL, id, size }) => (  // Here we destructured our 'section' Array and put thhose values into the .map() method's parameter.
                            <MenuItem key={id} title = {title.toUpperCase()} imageURL={imageURL} size={size} />
                        ))
                    }
                </div>
            )
        }
    }

    export default Directory;

