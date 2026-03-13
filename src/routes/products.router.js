import { Router } from "express";
import fs from "fs";
import Products from "../classes/productsClass.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await Products.getProducts();
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al recuperar los productos." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.getProduct(id);
    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al recuperar producto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const product = await Products.postProduct(body);
    res.status(201).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al agregar un producto nuevo.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const product = await Products.updateProduct(id, body);

    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al editar un producto nuevo.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Products.deleteProduct(id);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al eliminar producto" });
  }
});

export default router;
