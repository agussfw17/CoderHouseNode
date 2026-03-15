import { Router } from "express";
import Views from "../classes/viewsClass.js";
import Carts from "../classes/cartsClass.js";

const router = Router();

router.get('/', async(req,res) => {
    try{
        const { limit = 3, page = 1 } = req.query;
        const data = await Views.getProductsHB(limit, page);
        const cart = await Carts.postCart();
        res.render('home', { ...data, cart });
    } catch(error){
        res.status(500).json({ status: "error", message: "Error al cargar la pagina" });
    }
});

router.get('/cart/:cid', async(req,res) => {
    try{
        const cid = req.params.cid;
        const cartProducts = await Carts.getCartProducts(cid);
        res.render('cart', { cartProducts });
    } catch(error){
        res.status(500).json({ status: "error", message: "Error al cargar la pagina" });
    }
});

export default router;