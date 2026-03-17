const { cartProducts } = JSON.parse(
  document.getElementById("cartData").textContent,
);

async function deleteFromCart(e) {
  try {
    const cartId = sessionStorage.getItem("cartId");
    const productId = e.currentTarget.dataset.id;
    const res = await axios.delete(
      `/api/carts/${cartId}/products/${productId}`,
    );

    /*Actualizo el DOM asi no tengo que renderizar todo devuelta*/
    const card = document.getElementById(`productCard${productId}`);
    card.remove();

    /*Actualizar total*/
    calculateTotal();

    Toastify({
      text: "Producto eliminado del carrito 🛒",
      duration: 3000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #b00000, #c93d3d)",
        borderRadius: "12px",
        padding: "12px 20px",
        fontSize: "16px"
      }
    }).showToast();
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
