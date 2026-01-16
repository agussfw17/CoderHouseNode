import { Router } from "express";
import Carts from "../classes/cartsClass.js";
import Products from "../classes/productsClass.js";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body;

  if (!body || Object.keys(body).length === 0) {
    return res
      .status(400)
      .json({ message: "Debe ingresar los datos del carrito" });
  }

  const requiredFields = ["products"];
  for (const field of requiredFields) {
    if (body[field] === undefined) {
      return res.status(400).json({ message: `Falta el campo ${field}` });
    }
  }

  if (!body.products || body.products.length <= 0)
    return res
      .status(400)
      .json({ message: "Debe ingresar productos al carrito" });

  const cart = await Carts.postCart(body.products);
  res.json({ message: "Carrito agregado correctamente", cart: cart });
});

router.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  if (isNaN(id)) return res.status(400).json({ message: "Id inválido" });

  const products = await Carts.getCartProducts(id);

  if (!products)
    return res.status(404).json({ message: `No existe el carrito ${id}` });
  res.json({ products: products });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  if (isNaN(cid) || isNaN(pid)) return res.status(400).json({ message: "Id inválido" });

  const cart = await Carts.postProductCart(cid, pid);

  if (!cart)
    return res
      .status(404)
      .json({ message: "No se encuentra carrito o producto no existe" });

  res.json({ message: "Se agrego producto correctamente", cart: cart });
});

export default router;
