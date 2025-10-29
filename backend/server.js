// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendgrid from "@sendgrid/mail";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import fetch from "node-fetch";   // install via: npm install node-fetch

dotenv.config();

// Load and validate required environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!SENDGRID_API_KEY) {
  console.error("SENDGRID_API_KEY not set in environment");
  process.exit(1);
}
if (!SENDGRID_FROM_EMAIL) {
  console.error("SENDGRID_FROM_EMAIL not set in environment");
  process.exit(1);
}
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY not set in environment");
  process.exit(1);
}

// Setup Express app
const app = express();
app.use(cors());
app.use(express.json());

// Setup SendGrid
sendgrid.setApiKey(SENDGRID_API_KEY);

// In-memory store for demo (not for production)
const userStore = {};  // { userId: { totp_secret, … } }

// 1) Email subscription endpoint
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  const message = {
    to: email,
    from: SENDGRID_FROM_EMAIL,
    subject: "Welcome to DEV@Deakin!",
    text: "Thanks for joining the DEV@Deakin platform!",
    html: "<h2>Welcome to DEV@Deakin!</h2><p>We’re excited to have you onboard.</p>",
  };

  try {
    await sendgrid.send(message);
    return res.status(200).json({ success: true, message: "Welcome email sent!" });
  } catch (error) {
    console.error("SendGrid Error:", error.response ? error.response.body : error);
    return res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// 2) Assistant endpoint (Gemini API integration)
app.post("/api/assistant", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    // REST call to Gemini API
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
    const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [ { text: prompt } ]
          }
        ]
      })
    });

    const data = await response.json();
    // Simplify extraction; adjust based on actual response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);

    return res.json({ text });
  } catch (err) {
    console.error("Assistant error:", err);
    return res.status(500).json({ error: "Assistant failed" });
  }
});

// 3) 2FA TOTP setup endpoint
app.post("/api/2fa/setup", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const secret = speakeasy.generateSecret({ length: 20 });
  userStore[userId] = userStore[userId] || {};
  userStore[userId].totp_secret = secret.base32;

  const otpauthURL = speakeasy.otpauthURL({ secret: secret.ascii, label: `devdeakin:${userId}`, algorithm: 'sha1' });
  const qrImage = await qrcode.toDataURL(otpauthURL);

  return res.json({ qr: qrImage, base32: secret.base32 });
});

// 4) 2FA verify endpoint
app.post("/api/2fa/verify", (req, res) => {
  const { userId, token } = req.body;
  if (!userId || !token) return res.status(400).json({ error: "Missing params" });

  const record = userStore[userId];
  if (!record || !record.totp_secret) return res.status(404).json({ error: "2FA not setup" });

  const verified = speakeasy.totp.verify({
  secret: record.totp_secret,
  encoding: 'base32',
  token,
  window: 2
});


  return res.json({ verified });
});

// 5) Health check
app.get("/api/health", (req, res) => {
  return res.json({ ok: true });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
