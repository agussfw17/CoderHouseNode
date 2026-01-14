import express from "express";
import "dotenv/config";
import products from "./routes/products.js";
import carts from "./routes/carts.js";

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/products", products);
app.use("/api/carts", carts);

app.listen(port, () => {
  console.log(`HTTP Server listening on port ${port}`);
});
