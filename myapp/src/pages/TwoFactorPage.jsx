import TwoFactor from "../Twofactor";
import "./TwoFactorPage.css";

export default function TwoFactorPage() {
  return (
    <div className="twofactor-page">
      <h1 className="twofactor-title">🔐 Two-Factor Authentication</h1>
      <p className="twofactor-subtitle">
        Secure your account using OTP-based verification for extra protection.
      </p>
      <TwoFactor />
    </div>
  );
}
