const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Completed",
  },
  cardType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
