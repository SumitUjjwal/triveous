const express = require("express");
const cors = require("cors");
require("dotenv").config();

// modules
const { connection } = require("./config/config.db");
const { userRouter } = require("./routes/user.route");
const { categoryRouter } = require("./routes/category.route");
const { productRouter } = require("./routes/product.route");
const { cartRouter } = require("./routes/cart.route");
const { authorization } = require("./middleware/auth.middleware");
const { orderRouter } = require("./routes/order.route");

const port = process.env.port || 4500;

const app = express();
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to EKommerce API");
});

// using routes and middleware
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use(authorization);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    console.log("error connecting to db");
  }
  console.log("Listening on:", port);
});
