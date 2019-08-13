import React from 'react';

class Offer extends React.Component {
    render() {
        return(
            <p>This is an {this.props.name} with price: {this.props.price}$</p>
        )
    }
}

export default Offer;