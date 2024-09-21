// Products.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useStateValue } from "../StateProvider";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [{ basket }, dispatch] = useStateValue();
  useEffect(() => {
    const productsCollection = collection(db, "products");
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  const handleCart = (product) => {
    // Add the product to the basket
    dispatch({
      type: "ADD_TO_BASKET",
      item: product,
    });
  };
  return (
    <div className="products_div">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="product_item" key={product.id}>
            <div className="card">
              <div className="card-image">
                <img
                  src={product.imgSrc}
                  alt={product.cardContent}
                  className="product_image"
                />
              </div>
              <div className="card-content">
                <p>{product.cardContent}</p>
                <p>{product.price}</p>
              </div>
              <div className="card-action card-centering">
                <Button
                  onClick={() => handleCart(product)}
                  className="addtocartBtn"
                  variant="outlined"
                  color="secondary"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;
