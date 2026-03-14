import Cart from "../models/carts.model.js";
import Products from "./productsClass.js";

export default class Carts {
	static async postCart(products) {
		const cart = await Cart.create({});
		return cart;
  	}

	static async getCart(id) {
		const cart = await Cart.findById(id).lean();
		if (!cart) return null;
		return cart;
  	}

	static async postProductCart(cid, pid, quantity) {
		let updatedCart = null;

		const cartProducts = await Carts.getCartProducts(cid);
		console.log(cartProducts,'cartProducts');
    	if (cartProducts) {
			const cartProductIndex = cartProducts.findIndex(
				(cpi) => cpi.product._id.toString() === pid
			);
			console.log(cartProductIndex,'cartProductIndex');
			if (cartProductIndex !== -1) {
				cartProducts[cartProductIndex].quantity += quantity;
				updatedCart = await Cart.findByIdAndUpdate( 
					cid,  
					{ $set: { products: cartProducts } },
					{ new: true, runValidators: true }
				);
			}else {
				updatedCart = await Cart.findByIdAndUpdate(
					cid,
					{ $push: { products: { product: pid, quantity } } },
					{ new: true, runValidators: true }
				);
			}
    	}
		return updatedCart;
  	}

	static async getCartProducts(id) {
		const cart = await Cart.findById(id).lean().populate("products.product");
		if (!cart) return null;
		return cart.products;
	}

	static async deleteProductCart(cid, pid) {
		const updatedCart = await Cart.findByIdAndUpdate(
			cid,
			{ $pull: { products: { product: pid } } },
			{ new: true, runValidators: true }
		);
		return updatedCart;
	}

	static async updateProductsCart(cid, products) {
		const updatedCart = await Cart.findByIdAndUpdate(
			cid,
			{ $set: { products } },
			{ new: true }
		);
		return updatedCart;
	}
}
