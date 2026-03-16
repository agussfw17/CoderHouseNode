const { cartProducts } = JSON.parse(
  document.getElementById("cartData").textContent,
);

async function deleteFromCart(e) {
  try {
    const cartId = localStorage.getItem("cartId");
    const productId = e.currentTarget.dataset.id;
    const res = await axios.delete(
      `/api/carts/${cartId}/products/${productId}`,
    );

    /*Actualizo el DOM asi no tengo que renderizar todo devuelta*/
    const card = document.getElementById(`productCard${productId}`);
    card.remove();

    /*Actualizar total*/
    calculateTotal();
  } catch (error) {
    console.log("error", error);
  }
}

function calculateTotal() {
  /*Voy a calcular el total mediante el DOM asi no tengo que refrescar los productos del carrito cada vez que borre uno*/
  let total = 0;

  document.querySelectorAll(".price-subtotal").forEach((el) => {
    total += Number(el.dataset.subtotal);
  });

  document.getElementById("total").textContent = `$ ${total}`;
}

function initCart() {
  document.querySelectorAll(".removeFromCart").forEach((button) => {
    button.addEventListener("click", deleteFromCart);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCart();
  calculateTotal();
});
