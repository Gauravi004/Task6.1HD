import React, { useState } from "react";
import './Query.css';

function Query() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("⚠️ Please enter a valid email.");
      return;
    }

    setMessage("Sending...");

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Welcome email sent successfully!");
        setEmail("");
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="query">
      <p>SIGN UP FOR OUR DAILY INSIDER</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleSubscribe}>Subscribe</button>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default Query;
