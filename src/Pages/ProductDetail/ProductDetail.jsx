import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const [product, setProduct] = useState(null); // Set null initially
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // New error state
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const res = await axios.get(`${productUrl}/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Added productId dependency

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : product ? (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      ) : (
        <p style={{ textAlign: "center" }}>No product found.</p>
      )}
    </LayOut>
  );
}

export default ProductDetail;
