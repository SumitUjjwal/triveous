const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  status: {
    type: String,
    enum: ["placed", "delivered", "ontheway"],
    default: "placed",
  }
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = { orderModel };
