import { Router } from "express";
import fs from "fs";
import Products from "../classes/productsClass.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await Products.getProducts();

    if (!products || products.products.length <= 0) {
      return res.status(404).json({ message: "No hay productos ingresados" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Products.getProduct(id);

    if (!product) {
      return res.status(404).json({ message: `No existe el producto ${id}` });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res
        .status(401)
        .json({ message: "Debe ingresar los datos del producto" });
    }

    const requiredFields = ["title", "price", "stock"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return res.status(400).json({ message: `Falta el campo ${field}` });
      }
    }

    const product = await Products.postProduct(body);
    res.json({ message: "Producto agregado correctamente", product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const body = req.body;

    const product = await Products.updateProduct(id, body);

    if (!product) {
      return res
        .status(404)
        .json({ message: "No existe el producto ingresado" });
    }

    res.json({ message: "Producto actualizado", product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const isOk = await Products.deleteProduct(id);

    if (!isOk) {
      return res.status(404).json({ message: `No existe el producto ${id}` });
    }
    res.json({ message: `Se elimino el producto ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
