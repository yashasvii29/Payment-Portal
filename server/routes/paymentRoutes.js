const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Transaction = require("../models/Transaction");

router.post("/process-payment", async (req, res) => {
  const { createdAt, amount, phoneNumber, cardType } = req.body;
  console.log("backend :- ", req.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: "inr",
      metadata: { phoneNumber },
    });

    let newTransaction = new Transaction({
      amount,
      phoneNumber,
      cardType,
      createdAt,
    });
    await newTransaction.save();
    console.log("Transaction saved");
    res.status(200).json({ message: "Payment successful", paymentIntent });
  } catch (error) {
    console.error("Error processing payment:", error);
    res
      .status(500)
      .json({ message: "Error processing payment. Please try again." });
  }
});

// to fetch transactions
router.get("/payment-page", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ message: "Error fetching transactions. Please try again." });
  }
});

module.exports = router;
