import React, { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
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
    <div className="newsletter">
      <h3>Subscribe to our Newsletter</h3>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Newsletter;
