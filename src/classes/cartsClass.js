import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Products from "./productsClass.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Carts {
  static #path = path.join(__dirname, "../../db/carts.json");

  static async postCart(products) {
    if (!fs.existsSync(this.#path)) {
      const emptyCarts = [];
      await fs.promises.writeFile(this.#path, JSON.stringify(emptyCarts));
    }

    const data = await fs.promises.readFile(this.#path, "utf-8");
    const cartsJSON = JSON.parse(data);

    const lastId = cartsJSON.carts.at(-1)?.id ?? 0;
    const newId = lastId + 1;
    const cart = {
      id: newId,
      products: products,
    };

    cartsJSON.carts.push(cart);
    await fs.promises.writeFile(this.#path, JSON.stringify(cartsJSON));
    return cart;
  }

  static async getCartProducts(id) {
    if (!fs.existsSync(this.#path)) return null;

    const data = await fs.promises.readFile(this.#path, "utf-8");
    const carts = JSON.parse(data).carts;
    const cart = carts.find((c) => c.id === id);

    if (!cart) return null;

    return cart.products;
  }

  static async postProductCart(cid, pid) {
    const product = await Products.getProduct(pid);
    if (!product) return null;

    if (!fs.existsSync(this.#path)) return null;

    const data = await fs.promises.readFile(this.#path, "utf-8");
    const cartsJSON = JSON.parse(data);

    const cart = cartsJSON.carts.find((c) => c.id === cid);
    if (!cart) return null;

    const index = cart.products.findIndex((p) => p.product === pid);

    if (index < 0) {
      const newProductCart = {
        product: pid,
        quantity: 1,
      };
      cart.products.push(newProductCart);
    } else {
      cart.products[index].quantity += 1;
    }

    await fs.promises.writeFile(this.#path, JSON.stringify(cartsJSON));
    return cart;
  }
}
