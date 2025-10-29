import React, { useState } from 'react';
import { setup2FA, verify2FA } from './api';
import './Twofactor.css';

export default function Twofactor() {
  // For demo purposes we use a fixed userId. In your app, use authenticated user id.
  const userId = 'demo-user-1';
  const [qr, setQr] = useState(null);
  const [secret, setSecret] = useState(null);
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');

  async function handleSetup() {
    setStatus('');
    const data = await setup2FA(userId);
    setQr(data.qr);
    setSecret(data.base32);
    setStatus('Scan the QR code with your Authenticator app and enter the token to verify.');
  }

  async function handleVerify() {
    setStatus('Verifying…');
    const res = await verify2FA(userId, token);
    if (res.verified) {
      setStatus('✅ 2FA setup verified successfully.');
    } else {
      setStatus('❌ Invalid token, please try again.');
    }
  }

  return (
    <div className="twofactor-container">
      <p className="twofactor-note">
        This demo uses an in-memory server store; refreshing the page will reset the 2FA setup.
      </p>
      <button className="twofactor-button" onClick={handleSetup}>
        Setup 2FA (generate QR)
      </button>

      {qr && (
        <div className="twofactor-qrsection">
          <img src={qr} alt="2FA QR Code" className="twofactor-qrimage" />
          <div className="twofactor-secret">
            Secret (store safely): <code>{secret}</code>
          </div>
          <div className="twofactor-verifysection">
            <input
              className="twofactor-input"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter token from app"
            />
            <button className="twofactor-button" onClick={handleVerify}>
              Verify Token
            </button>
          </div>
        </div>
      )}

      <div className="twofactor-status">
        <strong>{status}</strong>
      </div>
    </div>
  );
}
