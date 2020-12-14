import React, { Component } from "react";

class Header extends Component {
  state = {
    isCartOpen: false,
  };

  constructor(props) {
    super(props);
    this.handleCartOpen = this.handleCartOpen.bind(this);
    this.cartRef = React.createRef();
  }

  handleCartOpen() {
    console.log("handleCartOpen");
    this.setState({
      isCartOpen: !this.state.isCartOpen,
    });
  }

  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleClickOutside(event) {
    console.log(event.target);
    let element = this.cartRef.current;

    if (element.classList.contains("active")) {
      if (!element.contains(event.target)) {
        this.setState({
          isCartOpen: false,
        });
        event.stopPropagation();
      }
    }
  }

  render() {
    console.log("header --->" + this.props.cartProducts.length);
    let items = this.props.cartProducts.map((product) => {
      return (
        <li className="cart-item" key={product.id}>
          <img
            className="product-image"
            alt="Product"
            src={product.image}
          ></img>
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">{product.quantity}</p>
            <p className="amount">{product.price * product.quantity}</p>
          </div>
          <button
            className="product-remove"
            onClick={() => {
              console.log('product', product)
              this.props.removeProduct(product.id)}
            }
          >
            x
          </button>
        </li>
      );
    });

    return (
      <header>
        <div className="container">
          <div className="brand">
            <img
              className="logo"
              alt="Veggie Logo"
              src="https://raw.githubusercontent.com/itprofessionalsfrontend/shop/master/assets/veggie.png"
            ></img>
          </div>
          <div className="search">
            <div className="search-form">
              <input
                type="search"
                className="search-keyword"
                placeholder="Search vegetables and fruits..."
                onChange={this.props.search}
              ></input>
            </div>
          </div>
          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>Items</td>
                    <td>:</td>
                    <td>{this.props.productCount}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>:</td>
                    <td>{this.props.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a className="cart-icon" href="#" onClick={this.handleCartOpen}>
              <img
                src="https://raw.githubusercontent.com/itprofessionalsfrontend/shop/master/assets/bag.png"
                alt="Shopping Cart"
              ></img>
            </a>
            <div
              ref={this.cartRef}
              className={
                this.state.isCartOpen ? "cart-preview active" : "cart-preview"
              }
            >
              <ul className="cart-items">{items}</ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
