import { Router } from "express";
import Products from "../classes/productsClass.js";

const router = Router();

router.get('/', async(req,res) => {
    try{
        const products = await Products.getProducts() 
        res.render('home', { products });
    } catch(error){
        res.status(500).send({ message:error.message });
    }
});

router.get('/realTimeProducts', async(req,res) => {
    try{
        const products = await Products.getProducts() 
        res.render('realTimeProducts', { products });
    } catch(error){
        res.status(500).send({ message:error.message });
    }
});

export default router;