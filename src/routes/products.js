import { Router } from 'express'
import fs from "fs";
import Products from '../classes/productsClass.js';

const router = Router();

router.get('/', async (req, res) => {
    try{
        res.json(await Products.getProducts())
    } catch(error){
        res.status(500).json({ error: error.message });
    }
});

export default router;