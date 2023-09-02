const express = require("express");

const { categoryModel } = require("../models/category.model");

let categoryRouter = express.Router();

// Add a new category 
categoryRouter.post("/addcategory", async (req, res) => {
  let { categoryname } = req.body;
  let data = await categoryModel.find({
    categoryname: categoryname.toLowerCase(),
  });
  if (data.length != 0) {
    res.status(409);
    res.send({ msg: "category already exists" });
  } else {
    let saveCategory = categoryModel({
      categoryname: categoryname.toLowerCase(),
    });
    await saveCategory.save();
    res.send({ msg: "Category added" });
  }
});

// Get a list of categories
categoryRouter.get("/", async (req, res) => {
  try {
    let allCategory = await categoryModel.find();
    res.send(allCategory);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ msg: "something went wrong" });
  }
});

module.exports = { categoryRouter };
