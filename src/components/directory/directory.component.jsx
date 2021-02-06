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
                    id: 1,
                    linkURL: 'hats' 
                },
                {
                    title: 'Jackets',
                    imageURL: 'https://i.ibb.co/px2tCc3/jackets.png',
                    id: 2,
                    linkURL: ''
                },
                {
                    title: 'Sneakers',
                    imageURL: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    id: 3,
                    linkURL: ''
                },
                {
                    title: 'women',
                    imageURL: 'https://www.travelfashiongirl.com/wp-content/uploads/2016/10/womens-winter-fashion.jpg',
                    id: 4,
                    size: 'large',
                    linkURL: ''
                },
                {
                    title: 'Mens',
                    imageURL: 'https://images.unsplash.com/photo-1552668693-2be72c866be4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1234&q=80',
                    id: 5,
                    size: 'large',
                    linkURL: ''
                }]
            }
        }

        render(){
            return (
                <div className='directory-menu'>
                    {
                        this.state.section.map( ({ title, imageURL, id, size, linkURL }) => (  // Here we destructured our 'section' Array and put thhose values into the .map() method's parameter.
                            <MenuItem key={id} title = {title.toUpperCase()} imageURL={imageURL} size={size} linkURL={linkURL} />
                        ))
                    }
                </div>
            )
        }
    }

    export default Directory;

