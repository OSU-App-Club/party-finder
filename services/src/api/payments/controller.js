// https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet

import Stripe from "stripe" 
const stripe = new Stripe(process.env.STRIPE_SK)

const paymentsController = {
  async createPaymentSheet(req, res) {
    try {
      const { cost } = req.body
      if (!cost) {
        return res.status(400).json({ error: 'Cost is required' })
      }

      const customer = await stripe.customers.create()
      
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2024-09-30.acacia" }
      )

      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(cost),
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: {
          enabled: true,
        },
      })

      res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default paymentsController