import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Pages/Utiles/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ClipLoader from "react-spinners/ClipLoader";
import { Type } from "../Utiles/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Unified loading state

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location?.state?.redirect || "/";

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: Type.SET_USER, user: userInfo.user });
      navigate("/Payment");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up
  const handleSignUp = async () => {
    setError("");
    setLoading(true);

    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "SET_USER", user: userInfo.user });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>

        {location?.state?.msg && (
          <small className={classes.errorMessage}>{location.state.msg}</small>
        )}

        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={classes.login_signInButton}
          >
            {loading ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        {error && <p className={classes.error}>{error}</p>}

        <p>
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>

        <button
          type="button"
          onClick={handleSignUp}
          disabled={loading}
          className={classes.login_registerButton}
        >
          {loading ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;
