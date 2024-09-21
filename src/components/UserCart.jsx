import { Button } from "@material-ui/core";
import React from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom"; // Import useHistory
import "../styles/Cart.css";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const UserCart = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  // Save the current basket to local storage
  const updateLocalStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket));
  };

  const handleProduct = async () => {
    try {
      const userDetailsCollection = collection(db, "user_details");

      await Promise.all(
        basket.map((item) =>
          addDoc(userDetailsCollection, {
            name: user.displayName,
            email: user.email,
            product_name: item.cardContent,
            price: item.price,
          })
        )
      );
      history.push("/payment");

      alert("Products are in the cart, please confirm booking.");
    } catch (error) {
      console.error("Error adding items to cart: ", error);
    }
  };

  const removeFromBasket = (index) => {
    console.log("Removing item at index:", index);
    const newBasket = [...basket];
    newBasket.splice(index, 1); // Remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      index: index,
    });
    updateLocalStorage(newBasket); // Update local storage
  };

  // Save basket to local storage whenever it changes
  React.useEffect(() => {
    updateLocalStorage(basket);
  }, [basket]);

  return (
    <div className="cart">
      {basket.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {basket.map((item, index) => (
            <div className="cart_products" key={index}>
              <img src={item.imgSrc} alt="product image" />
              <div className="product_details">
                <p>{item.cardContent}</p>
                <h6>{item.price}</h6>
              </div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromBasket(index)}
              >
                X
              </Button>
            </div>
          ))}
          <Button variant="contained" color="secondary" onClick={handleProduct}>
            Buy Now
          </Button>
        </>
      )}
    </div>
  );
};

export default UserCart;
