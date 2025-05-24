import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle Email/Password Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // You may need to adjust this if your userId is not an email
      const result = await signInWithEmailAndPassword(auth, userId, password);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
      }));
      // You can change the redirect path as needed
      navigate("/user/dashboard");
    } catch (error) {
      setError("Invalid user ID or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Science background"
          className="login-image"
        />
        <img
          src="https://education.nsw.gov.au/themes/custom/education_theme/logo.svg"
          alt="NSW Government"
          className="login-logo"
        />
      </div>
      <div className="login-right">
        <h2>Sign in with your department account</h2>
        <form className="login-form" onSubmit={handleSignIn}>
          <label>
            User Account
            <input
              type="text"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
          <div className="example-text">Example: jane.citizen1</div>
          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="keep-signed-in">
            <input
              type="checkbox"
              id="keepSignedIn"
              checked={keepSignedIn}
              onChange={() => setKeepSignedIn(!keepSignedIn)}
            />
            <label htmlFor="keepSignedIn">Keep me signed in</label>
          </div>
          <button type="submit" className="sign-in-btn" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <div className="login-links">
          <a href="#">Forgot your password?</a>
          <a href="#">Help signing in</a>
        </div>
        <div className="login-footer">
          <span>NSW Department of Education</span>
          <img
            src="https://education.nsw.gov.au/themes/custom/education_theme/logo.svg"
            alt="NSW Government"
            className="nsw-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;