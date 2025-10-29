import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; 
import { signInWithGoogle, signInUserWithEmail } from "./util/firebase.jsx"; // signInUserWithEmail to be defined


function Google() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithGoogle();
      console.log(user);
      
      // Optional: createUserDoc(user); // If you want to store user info in Firestore
      navigate("/"); // Redirect to Search page
    } catch (err) {
      console.error(err.message);
      setError("Google login failed!");
    }
  };

  // Email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const userCredential = await signInUserWithEmail(email, password);
      console.log("Login successful:", userCredential.user);
      navigate("/"); // Redirect to Search page
    } catch (err) {
      console.error(err.message);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Login to continue</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="google-section">
          <h3>Sign in with</h3>
          <button className="google-btn" onClick={handleGoogleLogin}>
            <img
              className="google-icon"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>
        </div>

        <div className="divider"><span>or</span></div>

        <div className="email-section">
          <h3>Sign in with Email</h3>
          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="create-account-btn">Submit</button>
          </form>
        </div>

        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="login-link">
              Sign-up Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Google;
