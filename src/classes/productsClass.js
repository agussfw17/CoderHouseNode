import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Products {
  static #path = path.join(__dirname, "../../db/products.json");

  static async #readFile() {
    if (!fs.existsSync(this.#path)) {
      await fs.promises.writeFile(this.#path, JSON.stringify({ products: [] }));
    }
    const data = await fs.promises.readFile(this.#path, "utf-8");
    return JSON.parse(data);
  }

  static async getProducts() {
    return await this.#readFile();
  }

  static async getProduct(id) {
    const productsJSON = await this.#readFile();
    const product = productsJSON.products.find((p) => p.id === id);
    return product;
  }

  static async postProduct(newProduct) {
    const productsJSON = await this.#readFile();

    const lastId = productsJSON.products.at(-1)?.id ?? 0;
    const newId = lastId + 1;
    
  const product = {
      id: newId,
      title: newProduct.title,
      description: newProduct.description ?? "",
      code: newProduct.code ?? "",
      price: Number(newProduct.price),
      status: newProduct.status ?? true,
      stock: Number(newProduct.stock),
      category: newProduct.category ?? "",
      thumbnails: newProduct.thumbnails ?? [],
    };

    productsJSON.products.push(product);

    await fs.promises.writeFile(this.#path, JSON.stringify(productsJSON));
    return product;
  }

  static async updateProduct(id, updProduct) {
    const productsJSON = await this.#readFile();

    const index = productsJSON.products.findIndex((p) => p.id === id);
    if (index < 0) return null;

    productsJSON.products[index] = {
      ...productsJSON.products[index],
      ...updProduct,
    };

    await fs.promises.writeFile(this.#path, JSON.stringify(productsJSON));
    return productsJSON.products[index];
  }

  static async deleteProduct(id) {
    const productsJSON = await this.#readFile();

    const length = productsJSON.products.length;

    productsJSON.products = productsJSON.products.filter((p) => p.id !== id);

    if (productsJSON.products.length === length) {
      return false;
    }

    await fs.promises.writeFile(this.#path, JSON.stringify(productsJSON));
    return true;
  }
}
