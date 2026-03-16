const { links } = JSON.parse(document.getElementById("homeData").textContent);

/*---------------------------------------Inicializo carrito---------------------------------------*/
async function initCart() {
  try {
    const cartURL = document.getElementById("cartURL");

    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      const res = await axios.post("/api/carts");
      cartId = res.data.payload._id.toString();
      localStorage.setItem("cartId", cartId);
    }

    cartURL.href = `/cart/${cartId}`;
    localStorage.setItem("cartURL", cartId);
  } catch (error) {
    console.log("error", error);
  }
}
/*------------------------------------------------------------------------------------------------*/

/*----------------------------------------Agregar productos---------------------------------------*/
async function addToCart(e) {
  try {
    const cartId = localStorage.getItem("cartId");
    const productId = e.currentTarget.dataset.id;
    const quantity = Number(
      document.getElementById(`quantity${productId}`).value,
    );

    const res = await axios.post(`/api/carts/${cartId}/product/${productId}`, {
      quantity: quantity,
    });
  } catch (error) {
    console.log("error", error);
  }
}

/*------------------------------------------------------------------------------------------------*/

/*---------------------------------------------Paginado-------------------------------------------*/
function goFirst() {
  if (links.length > 0) {
    window.location = links[0].link;
  }
}

function goLast() {
  if (links.length > 0) {
    window.location = links[links.length - 1].link;
  }
}

function goPrev() {
  let currentIndex = links.findIndex((l) => l.active);
  if (currentIndex > 0) {
    window.location = links[currentIndex - 1].link;
  }
}

function goNext() {
  let currentIndex = links.findIndex((l) => l.active);
  if (currentIndex < links.length - 1) {
    window.location = links[currentIndex + 1].link;
  }
}
/*------------------------------------------------------------------------------------------------*/

async function initHome() {
  initCart();

  document.querySelectorAll(".addToCart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  document.getElementById("firstPage").addEventListener("click", goFirst);
  document.getElementById("lastPage").addEventListener("click", goLast);
  document.getElementById("prevPage").addEventListener("click", goPrev);
  document.getElementById("nextPage").addEventListener("click", goNext);
}

document.addEventListener("DOMContentLoaded", () => {
  initHome();
});
