import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { BiSearchAlt2, BiCart } from "react-icons/bi";

import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";

const Header = () => {
  // Ensures basket is always an array and uses dispatch for actions
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // Calculate total items in the basket
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  // Sample language options (this could be fetched dynamically)
  const languages = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Spanish" },
    { code: "FR", name: "French" },
  ];

  // Check for user email (assuming 'user' contains email information)
  const userEmail = user?.email || "";

  return (
    <section className={classes.fixed}>
      <header className={classes.header_container}>
        {/* Logo and Delivery Section */}
        <div className={classes.logo_container}>
          <Link to="/" aria-label="Amazon Home">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
              alt="Amazon logo"
              loading="lazy"
            />
          </Link>
          <div className={classes.delivery}>
            <span aria-hidden="true">
              <CiLocationOn />
            </span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <form
          className={classes.search}
          role="search"
          aria-label="Amazon Search"
        >
          <select aria-label="Search categories">
            <option value="">All</option>
            {/* Add dynamic category options here */}
          </select>
          <input type="text" aria-label="Search Amazon" />
          <button type="submit" aria-label="Submit Search">
            <BiSearchAlt2 size={25} />
          </button>
        </form>

        {/* Navigation Links */}
        <div className={classes.order_container}>
          {/* Language Selector */}
          <div className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_the_United_States_%281912-1959%29.svg/1200px-Flag_of_the_United_States_%281912-1959%29.svg.png"
              alt="United States Flag"
              loading="lazy"
            />
            <select aria-label="Select language">
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Account Section */}
          <Link to="/auth">
            <div>
              {user ? (
                <>
                  <p>Hello, {userEmail.split("@")[0]}</p>
                  <span
                    onClick={() => auth.signOut()} // Ensure auth is accessible here
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Sign Out
                  </span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          {/* Returns & Orders */}
          <Link to="/Orders" aria-label="Returns & Orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* Cart Section */}
          <Link to="/cart" aria-label="Shopping Cart" className={classes.cart}>
            <BiCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </header>
      <LowerHeader />
    </section>
  );
};

export default Header;
