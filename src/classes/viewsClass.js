import Products from "./productsClass.js";
import Carts from "./cartsClass.js";

export default class Views {  
    static async getProductsHB(limit, page) {  
        const products = await Products.getProducts(limit,page);
        
        const links = [];
        for (let i = 1; i <= products.totalPages; i++) {
            links.push({text: i, link: `?limit=${limit}&page=${i}`}); 
        };
        return { ...products, links };
    }
}