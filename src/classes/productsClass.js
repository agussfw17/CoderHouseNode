import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Products {
  static #path = path.join(__dirname, '../../db/products.json');

  static async getProducts() {
    const res = await fs.promises.readFile(this.#path, "utf-8");
    return JSON.parse(res).products;
  }
}