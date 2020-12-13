import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";
import Products from "./Products.jsx";

class Home extends Component {
  state = {
    products: [],
    searchKeyword: "",
    loading: true,
    cartProducts: [],
    itemCount: 0,
    totalPrice: 0,
  };

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  getProducts() {
    axios
      .get(
        "https://gist.githubusercontent.com/OBakir90/e91e6036294986a9bfe63d17f76097d0/raw/d8bd540226229695ae220bd5f832c13ce5aa7fb5/products.json"
      )
      .then((response) => {
        this.setState({ products: response.data, loading: false });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSearch(event) {
    this.setState({ searchKeyword: event.target.value });
  }

  componentDidMount() {
    this.getProducts();
  }

  addToCart = (selectedProduct) => {
    let cartProductItems = this.state.cartProducts;
    if (this.checkProduct(selectedProduct.id)) {
      let productIndex = cartProductItems.findIndex(
        (p) => p.id === selectedProduct.id
      );
      cartProductItems[productIndex].quantity += selectedProduct.quantity;
    } else {
      cartProductItems.push(selectedProduct);
    }
    this.setState({
      cartProducts: cartProductItems,
      itemCount: this.state.cartProducts.length,
      totalPrice: this.getTotalPrice(cartProductItems),
    });
  };

  removeProduct(id) {
    let cartProductItems = this.state.cartProducts;
    let filteredProducts = cartProductItems.filter(
      (item) => item.products.id !== id
    );
    console.log(filteredProducts);
  }

  checkProduct(productId) {
    return this.state.cartProducts.some((product) => {
      return product.id === productId;
    });
  }

  getTotalPrice(cartProductList) {
    console.log(cartProductList);
    let priceArray = cartProductList.map((p) => p.price * p.quantity);
    console.log(priceArray);

    let result = priceArray.reduce(
      (total, currentValue) => total + currentValue
    );
    return result;
  }

  render() {
    let productList = this.state.products.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(this.state.searchKeyword.toLowerCase()) ||
        !this.state.searchKeyword
    );
    //MOVED INTO PRODUCTS COMPONENT
    // .map((product) => {
    //   return (
    //     <Product
    //       key={product.id}
    //       name={product.name}
    //       price={product.price}
    //       image={product.image}
    //     ></Product>
    //   );
    // });

    return (
      <>
        <Header
          search={this.handleSearch}
          cartProducts={this.state.cartProducts}
          productCount={this.state.itemCount}
          totalPrice={this.state.totalPrice}
          removeItem={this.removeProduct}
        ></Header>
        <Products
          productList={productList}
          loading={this.state.loading}
          addToCart={this.addToCart}
        ></Products>
        <Footer></Footer>
      </>
    );
  }
}

export default Home;
