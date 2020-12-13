import React from "react";
import Product from "./Product.jsx";
import NoResults from "./NoResults.jsx";
import LoadingProducts from "../loaders/Products.jsx";

const Products = (props) => {
  console.log("products----" + props.productList);
  let productComponentList = props.productList.map((product) => {
    return (
      <Product
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
        addToCart={props.addToCart}
      ></Product>
    );
  });

  return (
    <div className="products-wrapper">
      {props.loading ? (
        <LoadingProducts />
      ) : props.productList.length !== 0 ? (
        <ul className="products">{productComponentList}</ul>
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default Products;
