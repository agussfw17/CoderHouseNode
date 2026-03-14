import { Router } from "express";
import Views from "../classes/viewsClass.js";

const router = Router();

router.get('/', async(req,res) => {
    try{
        const { limit = 10, page = 1 } = req.query;
        const data = await Views.getProductsHB(limit, page);
        res.render('home', data);
    } catch(error){
        res.status(500).json({ status: "error", message: "Error al cargar la pagina" });
    }
});

router.get('/realTimeProducts', async(req,res) => {
    try{
        const { limit = 10, page = 1 } = req.query;
        const data = await Views.getProductsHB(limit, page);
        res.render('realTimeProducts', data);
    } catch(error){
        res.status(500).json({ status: "error", message: "Error al cargar tiempo real" });
    }
});

export default router;