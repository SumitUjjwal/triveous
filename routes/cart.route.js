const express = require("express");

const { cartModel } = require("../models/cart.model");

let cartRouter = express.Router();

// get items present in a cart
cartRouter.get("/", async (req, res) => {
  let userID = req.body.userID;
  try {
    let userCartData = await cartModel.find({ userID }).populate("productID");
    res.send(userCartData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// add item to a cart
cartRouter.post("/addtocart", async (req, res) => {
  let { userID, quantity, productID } = req.body;
  try {
    let addToCart = cartModel({ userID, quantity, productID });
    await addToCart.save();
    res.send({ mas: "product added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// update quantity of an item in cart
cartRouter.patch("/updatequantity/:cartItemID", async (req, res) => {
  let cartItemID = req.params.cartItemID;
  let quantity = req.body.quantity;

  try {
    await cartModel.findByIdAndUpdate({ _id: cartItemID }, { quantity });
    res.send("quantity updated");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// delete an item from cart
cartRouter.delete("/deleteitem/:cartItemID", async (req, res) => {
  let cartItemID = req.params.cartItemID;

  try {
    await cartModel.findByIdAndDelete({ _id: cartItemID });
    res.send("Item deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = { cartRouter };
