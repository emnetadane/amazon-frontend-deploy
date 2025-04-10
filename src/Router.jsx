import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Components/NotFound/NotFound";

// Stripe public key
const stripePromise = loadStripe(
  "pk_test_51QSKAlKiduBgTnCbXWDtLFfQYfurKH8TKdPYWafpXjV9MmG8WlEbUW3vJTcPcuqTlOaJW1mhIsXRqzUaDhmxWDAe007VRWuiTG"
);

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/Payment"
          element={
            <ProtectedRoute
              msg={"You must log in to pay"}
              redirect={"/auth"} // Redirect to the login page if not logged in
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Orders"
          element={
            <ProtectedRoute
              msg={"You must log in to access your orders"}
              redirect={"/auth"} // Redirect to login if not logged in
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Public routes for product browsing */}
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Routing;
