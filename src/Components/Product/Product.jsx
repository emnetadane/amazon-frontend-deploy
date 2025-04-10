
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "../../assets/Product.module.css";
import Loader from "../Loader/Loader";
function Product() {
  const [products, setProducts] = useState([]); // Use camelCase for consistency
  const [isLoading, setIsLoading] = useState(false); // Add loading state
 

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        isLoading(true)
      })
      .catch((err) => {
      //  console.log(err);
      //  isLoading(false); 
      });
  }, []);

 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct, index) => (
            <ProductCard renderAdd={true} key={index} product={singleProduct} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;

