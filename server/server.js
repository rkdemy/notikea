const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

// This is your test secret API key.
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/config", async (req, res) => {
  res.send({
    publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  const { shipping_fee, total_amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total_amount + shipping_fee,
      currency: "aud",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const response = await fetch(
      "https://course-api.com/react-store-products",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching products:", response.status, errorText);
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const products = await response.json();
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/single-products", async (req, res) => {
  const { id } = req.query;
  try {
    const response = await fetch(
      `https://course-api.com/react-store-single-product?id=${id}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Error fetching single product:",
        response.status,
        errorText
      );
      throw new Error(`Error fetching single product: ${response.statusText}`);
    }

    const product = await response.json();
    res.json(product);
  } catch (error) {
    console.error("Failed to fetch single product:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
