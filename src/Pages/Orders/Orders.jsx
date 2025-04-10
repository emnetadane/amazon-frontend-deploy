import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../Utiles/firebase";
import classes from "./Orders.module.css"
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Orders() {
  const [ {user} ] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
console.log(user)
  useEffect(() => {
    if (user) {
      // const ordersRef = collection(doc(db, "users", user.uid), "orders");
      // const ordersQuery = query(ordersRef, orderBy("created", "desc"));

      // const unsubscribe = onSnapshot(

      //   ordersQuery,
      //   (snapshot) => {
      //     setOrders(
      //       snapshot.docs.map((doc) => ({
      //         id: doc.id,
      //         data: doc.data(),
      //       }))
      //     );
      //     setLoading(false);
      //   },
      //   (error) => {
      //     console.error("Error fetching orders: ", error);
      //     setLoading(false);
      //   }
      // );

      // return () => unsubscribe();

      onSnapshot(
        query(
          collection(db, "users", user.uid, "orders"),
          orderBy("created", "desc")
        ),
        (snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        }
        
      );
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, []);

//  if (loading) {
//     return <div>Loading...</div>;
//   } 
console.log(orders)
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div>
              {orders.map((eachOrder) => (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard key={order.id} flex={true} product={order} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
