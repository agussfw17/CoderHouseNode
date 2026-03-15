import { Router } from "express";
import Carts from "../classes/cartsClass.js";
import Cart from "../models/carts.model.js";
import Products from "../classes/productsClass.js";

const router = Router();

router.post("/", async (req, res) => {
	try {
		const cart = await Carts.postCart();
		res.status(201).json({ status: "success",  payload: cart });
	} catch (error) {
  		res.status(500).json({ status: "error", message: "Error al agregar carrito" });
	}
});

router.post("/:cid/product/:pid", async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const quantity = req.body.quantity || 1;

		const product = await Products.getProduct(pid);
		if (!product) return res.status(404).json({ status: "error", message: "No se encuentra producto" });;

		const cart = await Carts.getCart(cid);
		if (!cart) return res.status(404).json({ status: "error", message: "No se encuentra carrito" });

		const updatedCart = await Carts.postProductCart(cid, pid, quantity);
		if (!updatedCart) return res.status(404).json({ status: "error", message: "Error al agregar producto al carrito" });

		res.status(200).json({ status: "success", payload: updatedCart });
	} catch (error) {
		console.log(error,'error');
		res.status(500).json({ status: "error", message: "Error al agregar producto al carrito" });
	}
});

router.get("/:cid", async (req, res) => {
	try {
		const id = req.params.cid;
		const products = await Carts.getCartProducts(id);
		if (!products) return res.status(404).json({ status: "error", message: 'No existe el carrito'});
		res.status(200).json({ status: "success", payload: products });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error al obtener productos del carrito" });
	}
});

router.delete("/:cid/products/:pid", async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const product = await Products.getProduct(pid);
		if (!product) return res.status(404).json({ status: "error", message: "No se encuentra producto" });;

		const cart = await Carts.getCart(cid);
		if (!cart) return res.status(404).json({ status: "error", message: "No se encuentra carrito" });

		const updatedCart = await Carts.deleteProductCart(cid, pid);
		if (!updatedCart) return res.status(404).json({ status: "error", message: "Error al eliminar producto del carrito" });
		res.status(200).json({ status: "success", payload: updatedCart });
	}catch (error) {
		console.log(error,'error');
		res.status(500).json({ status: "error", message: "Error al eliminar producto del carrito" });
	}
});

router.put("/:cid/", async (req, res) => {
	try {		
		const { cid } = req.params;
		const { products } = req.body;
		const cart = await Carts.getCart(cid);
		if (!cart) return res.status(404).json({ status: "error", message: "No se encuentra carrito" });

		products.forEach(async (p) => {
			const product = await Products.getProduct(p.product);
			if (!product) return res.status(404).json({ status: "error", message: `No se encuentra producto con id ${p.product}` });
		});

		const updatedCart = await Carts.updateProductsCart(cid, products);
		if (!updatedCart) return res.status(404).json({ status: "error", message: "Error al actualizar productos del carrito" });
		res.status(200).json({ status: "success", payload: updatedCart });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error al actualizar productos del carrito" });
	}
});

router.put("/:cid/products/:pid", async (req, res) => {
	try {		
		const { cid, pid } = req.params;
		const { quantity } = req.body;

		const product = await Products.getProduct(pid);
		if (!product) return res.status(404).json({ status: "error", message: "No se encuentra producto" });
		
		const cart = await Carts.getCart(cid);
		if (!cart) return res.status(404).json({ status: "error", message: "No se encuentra carrito" });
		
		const cartProducts = await Carts.getCartProducts(cid);

		const cartProductIndex = cartProducts.findIndex(
			(item) => item.product._id.toString() === pid	
		);
		if (cartProductIndex === -1) return res.status(404).json({ status: "error", message: "El producto no se encuentra en el carrito" });

		cartProducts[cartProductIndex].quantity = quantity;
		const updatedCart = await Cart.findByIdAndUpdate( 
			cid,  
			{ $set: { products: cartProducts } },
			{ new: true, runValidators: true }
		);
		res.status(200).json({ status: "success", payload: updatedCart });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error al actualizar productos del carrito" });
	}
});

router.delete("/:cid", async (req, res) => {
	try {		
		const { cid } = req.params;

		const cart = await Carts.getCart(cid);
		if (!cart) return res.status(404).json({ status: "error", message: "No se encuentra carrito" });
		
		const cartProducts = await Carts.getCartProducts(cid);

		const updatedCart = await Cart.findByIdAndUpdate( 
			cid,  
			{ $set: { products: [] } },
			{ new: true, runValidators: true }
		);
		res.status(200).json({ status: "success", payload: updatedCart });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error al actualizar productos del carrito" });
	}
});

export default router;
