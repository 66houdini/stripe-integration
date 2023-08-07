const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1NbLKUFvFf2icezmETOlv4BQ',
            quantity: 1,
          },
        ],
        mode: "payment",
        currency: "NGN",
        customer_email: "user@email.com",
        success_url: `${"http://localhost:3000/success"}/?success=true`,
        cancel_url: `${"http://localhost:3000/canceled"}/?canceled=true`,
        automatic_tax: { enabled: true },
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
