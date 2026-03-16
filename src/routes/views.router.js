import { Router } from "express";
import Views from "../classes/viewsClass.js";
import Carts from "../classes/cartsClass.js";
import axios from "axios";
import Cart from "../models/carts.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const data = await Views.getProductsHB(limit, page);
    res.render("home", { ...data });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al cargar la pagina" });
  }
});

router.get("/cart/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartProducts = await Carts.getCartProducts(cid);
    res.render("cart", { cartProducts });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error al cargar la pagina" });
  }
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const data = await Views.getProductsHB(limit, page);
    res.render("realTimeProducts", data);
  } catch (error) {
    res.status(500).send({ message: error.message });
    res
      .status(500)
      .json({ status: "error", message: "Error al cargar tiempo real" });
  }
});

export default router;
