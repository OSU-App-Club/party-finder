const express = require('express');

const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe Payment Sheet endpoint
app.post('/payment-sheet', async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-10-28.acacia'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});