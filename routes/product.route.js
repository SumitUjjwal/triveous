const express = require("express");

const { productModel } = require("../models/product.model");

let productRouter = express.Router();

// add a product
productRouter.post("/addproduct", async (req, res) => {
  let { title, price, desc, availability, categoryID } = req.body;
  try {
    let product = productModel({
      title,
      price,
      desc,
      availability,
      categoryID,
    });
    await product.save();
    res.send({ msg: "product added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: err.message });
  }
});

// get a list of products
productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("categoryID", "categoryname");
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// get product by id
productRouter.get("/:productID", async (req, res) => {
  let productID = req.params.productID;
  try {
    const products = await productModel
      .findById(productID)
      .populate("categoryID", "categoryname");
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = { productRouter };
