import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "../Cart/Cart.module.css";
import { Type } from "../../Pages/Utiles/action.type";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  console.log(basket);

  // Calculate total price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  console.log(total);

  // Calculate total item count
  const totalItems = basket.reduce((acc, item) => acc + item.amount, 0);

  // Increment item amount
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  // Decrement item amount
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello, {user?.name || "Guest"}</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket.length === 0 ? (
            <p>
              Your cart is empty.{" "}
              <Link to="/products">Start shopping now!</Link>
            </p>
          ) : (
            basket.map((item, index) => (
              <div
                key={`${item.id}-${item.amount}`} // Ensures a unique key using item.id and item.amount
                className={classes.item_container}
              >
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowDropup />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDropdown />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {basket.length !== 0 && (
          <div className={classes.subtotal_container}>
            <div className={classes.subtotal}>
              <p>Subtotal ({totalItems} items)</p>
              <CurrencyFormat amount={total} />
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payment">Continue to checkout</Link>
            </div>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
