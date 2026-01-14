import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Products {
  static #path = path.join(__dirname, "../../db/products.json");

  static async postProduct(newProduct) {
    if (!fs.existsSync(this.#path)) {
      const emptyProducts = { products: [] };
      await fs.promises.writeFile(this.#path, JSON.stringify(emptyProducts));
    }

    const data = await fs.promises.readFile(this.#path, "utf-8");
    const productsJSON = JSON.parse(data);

    const lastId = productsJSON.products.at(-1)?.id ?? 0;
    const newId = lastId + 1;
    const product = {
      id: newId,
      title: newProduct.title,
      description: newProduct.description,
      code: newProduct.code,
      price: newProduct.price,
      status: newProduct.status,
      stock: newProduct.stock,
      category: newProduct.category,
      thumbnails: newProduct.thumbnails,
    };

    productsJSON.products.push(product);

    await fs.promises.writeFile(this.#path, JSON.stringify(productsJSON));
    return product;
  }

  static async getProducts() {
    const data = await fs.promises.readFile(this.#path, "utf-8");
    return JSON.parse(data);
  }

  static async getProduct(id) {
    const data = await fs.promises.readFile(this.#path, "utf-8");
    const products = JSON.parse(data).products;
    const product = products.find((p) => p.id === id);
    return product;
  }

  static async updateProduct(id, updProduct) {
    if (!fs.existsSync(this.#path)) return null;

    const data = await fs.promises.readFile(this.#path, "utf-8");
    const productsJSON = JSON.parse(data);

    const index = productsJSON.products.findIndex((p) => p.id === id);
    if (index < 0) return null;

    if (updProduct && updProduct.id) delete updProduct.id;

    productsJSON.products[index] = {
      ...productsJSON.products[index],
      ...updProduct,
    };

    await fs.promises.writeFile(this.#path, JSON.stringify(productsJSON));
    return productsJSON.products[index];
  }

  static async deleteProduct(id) {
    if (!fs.existsSync(this.#path)) return null;

    const data = await fs.promises.readFile(this.#path, "utf-8");
    const products = JSON.parse(data);

    const length = products.products.length;

    products.products = products.products.filter((p) => p.id !== id);

    if (products.products.length === length) {
      return null;
    }

    await fs.promises.writeFile(this.#path, JSON.stringify(products));
    return true;
  }
}
