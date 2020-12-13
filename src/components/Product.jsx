import React, { Component } from "react";
import Count from "./Count.jsx";

class Product extends Component {
  state = {
    quantity: 1,
  };
  constructor(props) {
    super(props);
  }

  getCount = (qnt) => {
    this.setState({
      quantity: qnt,
    });
  };

  addToCart = () => {
    let selectedProduct = {
      id: this.props.id,
      name: this.props.name,
      image: this.props.image,
      price: this.props.price,
      quantity: this.state.quantity,
    };

    this.props.addToCart(selectedProduct);
  };

  render() {
    return (
      <div className="product">
        <div className="product-image">
          <img src={this.props.image} alt="Product"></img>
        </div>
        <h4 className="product-name">{this.props.name}</h4>
        <p className="product-price">{this.props.price}</p>
        <Count getCount={this.getCount} />
        <div className="product-action">
          <button type="button" onClick={this.addToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
