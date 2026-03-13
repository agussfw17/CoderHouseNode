import Product from "../models/product.model.js";

export default class Products {
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
