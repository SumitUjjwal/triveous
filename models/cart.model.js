const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel };
