import fs from "fs";
import path from "path";
import __dirname from "../utils.js";
import Product from "../models/product.model.js";

export default class Products {
  static #path = path.join(__dirname, "../db/products.json");

  static async #readFile() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify({ products: [] }));
    }
    const data = await fs.promises.readFile(this.#path, "utf-8");
    return JSON.parse(data);
  }

  static async getProducts() {
    const products = await Product.find().lean();
    return products;
  }

  static async getProduct(id) {
    const product = await Product.findById(id);
    return product;
  }

  static async postProduct(newProduct) {
    const product = await Product.create(newProduct);
    return product;
  }

  static async updateProduct(id, updProduct) {
    const updatedProduct = await Product.findByIdAndUpdate(id, updProduct, {
      new: true,
      runValidators: true,
    });
    return updatedProduct;
  }

  static async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    return product;
  }
}
