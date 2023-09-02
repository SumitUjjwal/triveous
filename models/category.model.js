const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryname: String,
});

const categoryModel = mongoose.model("category", categorySchema);

module.exports = { categoryModel };
