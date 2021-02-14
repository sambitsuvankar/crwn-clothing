const INITIAL_STATE = {
    section: [{
        title: 'hats',
        imageURL: 'https://i.ibb.co/cvpntL1/hats.png',
        id: 1,
        linkURL: 'shop/hats' 
    },
    {
        title: 'Jackets',
        imageURL: 'https://i.ibb.co/px2tCc3/jackets.png',
        id: 2,
        linkURL: 'shop/Jackets'
    },
    {
        title: 'Sneakers',
        imageURL: 'https://i.ibb.co/0jqHpnp/sneakers.png',
        id: 3,
        linkURL: 'shop/sneakers'
    },
    {
        title: 'women',
        imageURL: 'https://www.travelfashiongirl.com/wp-content/uploads/2016/10/womens-winter-fashion.jpg',
        id: 4,
        size: 'large',
        linkURL: 'shop/womens'
    },
    {
        title: 'Mens',
        imageURL: 'https://images.unsplash.com/photo-1552668693-2be72c866be4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1234&q=80',
        id: 5,
        size: 'large',
        linkURL: 'shop/mens'
    }]
}


const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default directoryReducer;