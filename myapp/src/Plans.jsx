import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Plans.css';

export default function Plans() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('monthly'); // 'monthly' or 'yearly'

  const price = billing === 'monthly' ? { free: '0', premium: '9' } : { free: '0', premium: '90' };
  const billingLabel = billing === 'monthly' ? 'per month' : 'per year (save 16%)';

  const premiumFeatures = [
    'Custom messages & banners',
    'Multiple themes & branding',
    'Advanced content controls',
    'Analytics dashboard (admin)',
    'Priority support & onboarding',
    'Additional admin tools & reports',
  ];

  return (
    <div className="plans-page">
      <div className="plans-header">
        <h2 className="plans-title">Pricing Plans</h2>
        <p className="plans-subtitle">
          Choose a plan that fits your needs. Upgrade to Premium for customization, advanced admin tools,
          and priority support.
        </p>

        <div className="billing-toggle" role="tablist" aria-label="Billing">
          <span className={`bill-label ${billing === 'monthly' ? 'active' : ''}`}>Monthly</span>
          <button
            className="toggle-switch"
            aria-pressed={billing === 'yearly'}
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            title="Toggle billing"
          >
            <span className={`knob ${billing === 'yearly' ? 'yearly' : 'monthly'}`} />
          </button>
          <span className={`bill-label ${billing === 'yearly' ? 'active' : ''}`}>Yearly</span>
        </div>
      </div>

      <div className="plans-grid">
        {/* Free Plan */}
        <div className="plan-card plan-free" aria-labelledby="free-title">
          <div className="plan-top">
            <h3 id="free-title" className="plan-name">Free</h3>
            <div className="plan-price">
              <span className="price-amount">${price.free}</span>
              <span className="price-label"> {billing === 'monthly' ? '/month' : '/year'}</span>
            </div>
          </div>

          <ul className="plan-features">
            <li>Standard content access</li>
            <li>Community support</li>
            <li>Create & view posts</li>
            <li>Basic editor & preview</li>
          </ul>

          <div className="plan-action">
            <button className="btn btn-secondary" disabled aria-disabled="true">Current Plan</button>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="plan-card plan-premium" aria-labelledby="premium-title">
          <div className="ribbon">Most Popular</div>

          <div className="plan-top">
            <h3 id="premium-title" className="plan-name">Premium</h3>
            <div className="plan-price">
              <span className="price-amount">${price.premium}</span>
              <span className="price-label"> {billingLabel}</span>
            </div>
          </div>

          <p className="plan-note">Everything in Free, plus advanced customization and admin features.</p>

          <ul className="plan-features">
            {premiumFeatures.map((f) => (
              <li key={f}><span className="tick" aria-hidden="true">✔</span>{f}</li>
            ))}
          </ul>

          <div className="plan-action">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/payment')}
              aria-label="Choose Premium plan and go to payment"
            >
              Choose Premium
            </button>
            <small className="secure-note">Secure payment via Stripe • Cancel anytime</small>
          </div>
        </div>
      </div>

      <div className="plans-legal">
        <small>
          By selecting a premium plan you agree to the Terms & Conditions. Payment processing is handled securely by Stripe;
          no card data is stored on this site.
        </small>
      </div>
    </div>
  );
}
