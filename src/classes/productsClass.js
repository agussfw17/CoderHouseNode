import Product from "../models/product.model.js";

export default class Products {
  static async getProducts(limit, page) {
    const data = await Product.paginate({}, { limit, page, lean:true });
    const products = data.docs;
    delete data.docs;
    return { products, ...data };
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
