import React from 'react';
import Product from './Products/products.js'
import DeleteProduct from './Products/DeleteProduct.js'
//import Offer from './Offers/offers.js'
import sales from './sales.json';
import './App.css';
import { identifier } from '@babel/types';

const name = {
              '1':'Ann',
              '2':'Bob',
              '3':'C'
};

class DeleteFruit extends React.Component {

}

class App extends React.Component {
 
  state = {
    userText: '',
    counter: sales.count,
    clickedCount: 0,
    products: [
      {id: '1', name: 'apple', price: '10', qty: 0},
      {id: '2', name: 'lemon', price: '20', qty: 0},
      {id: '3', name: 'pear', price: '30', qty: 0}
    ]
  }

   itemClicked = (id) => {
    //const oldClickedCount = this.state.clickedCount;
    //this.setState({ clickedCount: oldClickedCount + 1 })
    const productIndex = this.state.products.findIndex(el => {
      return el.id === id;
    });
    if (productIndex >= 0) {
      const oldQty = this.state.products[productIndex].qty;
      let newProducts = [...this.state.products];
      newProducts[productIndex].qty = oldQty + 1;
      this.setState({ products: newProducts });
    }
    //this.setState({ this.state.products[productIndex].qty: oldQty + 1 });
  }

  clickHandler = () => {
    const oldCount = this.state.counter;
    const newCount = oldCount + 1;
    this.setState({ counter: newCount });
  }

  onChangeHandler = (event) => {
    this.setState({ userText: event.target.value })
  }

  deleteHandler = () => {
    const productIndex = this.state.products.findIndex(el => {
        return el.name === this.state.userText;
    });
    if (productIndex >= 0) {
      let newProducts = [...this.state.products];
      newProducts.splice(productIndex,1);
      this.setState({ products: newProducts });
      this.setState({ userText: this.state.userText + ' deleted!' });
    }
    else {
      this.setState({ userText: 'Not found!' });
    }
  }
   
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.userText === ''){
      nextState.userText = 'Please type something';
      //return false;
    }
    else if (nextState.userText === '0' || nextState.userText === ' ') {
      nextState.userText = 'Nice try';
      //return false;
    }
    return true;
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hello, {name[2]}!
          </p>
          {this.state.products.map(el => {
            return <Product 
              key={el.id}
              name={el.name}
              price={el.price}
              link={this.itemClicked(el.id)}
              qty={el.qty} />
          })}
          <DeleteProduct 
              changed={this.onChangeHandler} 
              text={this.state.userText} 
              deletes={this.deleteHandler} />
          <button onClick={this.clickHandler}>Buy now!</button>
          <p>Total sales: {this.state.counter}</p>
        </header>
      </div>
    );


/*      <Product name={this.state.products[0].name} price='100'/>
        <Product name='Apple' price='2'/>
        <Offer  name='Car' price='5000'/> */

  }
}

export default App;
