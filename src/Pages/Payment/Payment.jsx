import React, { useContext, useState, useEffect } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../Utiles/firebase"; // Ensure this is correctly initialized
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import the required Firestore functions
import { Type } from "../Utiles/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // State management for card errors and payment processing
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Get the authenticated user dynamically (instead of globally)
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Calculating total items and total cost
  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);
  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  // Handler for card details changes
  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  // Payment handler
  const handlePayment = async (e) => {
    e.preventDefault();

    // Ensure Stripe and elements are loaded
    if (!stripe || !elements) {
      setCardError("Stripe has not been initialized properly.");
      return;
    }

    // Ensure the user is logged in (this part has been updated)
    if (!currentUser) {
      setCardError("User not logged in.");
      return;
    }

    try {
      setProcessing(true);
      console.log("Initiating payment...");

      // Create payment intent via backend API
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}` // Total needs to be in cents
      );
      const clientSecret = response.data?.clientSecret;

      // Handle missing client secret
      if (!clientSecret) {
        throw new Error("Failed to get payment client secret.");
      }

      console.log("Client Secret received:", clientSecret);

      // Confirm card payment with Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
   console.log(paymentIntent);
      // Handle payment errors
      if (error) {
        console.error("Stripe Payment Error:", error.message);
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      console.log("Payment Successful:", paymentIntent);

      // Save order data in Firestore (ensure the user is available)
      if (currentUser && currentUser.uid) {
        await setDoc(
          doc(db, "users", currentUser.uid, "orders", paymentIntent.id),
          {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          }
        );

        console.log("Order saved to Firestore");

        // Navigate to orders page after success
        navigate("/Orders", { state: { msg: "You have placed a new order" } });

        // Optionally empty the basket (reset state)
        dispatch({ type: Type.EMPTY_BASKET });
      } else {
        console.error("User ID not available. Order not saved.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>{currentUser?.email || "No Email"}</div>
          <div>123 React Ave</div>
          <div>Maryland</div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                    <div>
                      <button type="submit" disabled={processing}>
                        {processing ? (
                          <div className={classes.loading}>
                            <ClipLoader color="gray" size={12} />
                            <p>Please Wait...</p>
                          </div>
                        ) : (
                          "Pay Now"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
