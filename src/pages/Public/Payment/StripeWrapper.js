// StripeWrapper.js

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentPage from './PaymentPage'; // Assurez-vous que le chemin est correct

// Clé publique Stripe de test
const stripePromise = loadStripe('your_test_public_key_here');

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentPage />
    </Elements>
  );
};

export default StripeWrapper;
