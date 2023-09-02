const express = require("express");

const { orderModel } = require("../models/order.model");

let orderRouter = express.Router();

// place a new order
orderRouter.post("/placeorder", async (req, res) => {
  let { userID, productID, cartID } = req.body;
  try {
    let orderProduct = orderModel({ userID, productID, cartID });
    await orderProduct.save();
    res.send({ msg: "order placed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// get a list orders
orderRouter.get("/", async (req, res) => {
  let userID = req.body.userID;
  try {
    let orderData = await orderModel
      .find({ userID })
      .populate(["productID", "cartID"]);
    res.send(orderData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// get details of an order
orderRouter.get("/:orderID", async (req, res) => {
  let orderID = req.params.orderID;
  try {
    let orderData = await orderModel
      .find({ _id: orderID })
      .populate(["productID", "cartID"]);
    res.send(orderData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// update status of an order
orderRouter.patch("/:orderID", async (req, res) => {
  let orderID = req.params.orderID;
  let status = req.body.status;
  try {
    await orderModel.findByIdAndUpdate({ _id: orderID }, { status });
    res.send({ msg: "status updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = { orderRouter };
