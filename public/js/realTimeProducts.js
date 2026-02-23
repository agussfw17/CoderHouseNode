const socket = io();

const form = document.getElementById("productForm");
const container = document.getElementById("productsContainer");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const product = {};

    formData.forEach((value, key) => {
        product[key] = value;
    });

    socket.emit("addProduct", product);
    form.reset();
});

socket.on("productAdded", (product) => {
    const newProduct = document.createElement("div");
    newProduct.className = "col-12 col-sm-6 col-lg-4 col-xl-3";
    newProduct.setAttribute("data-product-id", product.id);
    
    newProduct.innerHTML = `
        <div class="product-card h-100 shadow-lg">
            <div class="p-4 d-flex flex-column">
                <h5 class="text-light fw-semibold">${product.title}</h5>
                <p class="text-secondary small mb-2">${product.category || ""}</p>
                <p class="text-muted small">${product.description || ""}</p>
                <div class="mt-auto">
                    <div class="price mb-2">$ ${product.price}</div>
                    ${
                        product.stock > 0
                        ? `<span class="badge badge-stock mb-3">En stock (${product.stock})</span>`
                        : `<span class="badge badge-out mb-3">Sin stock</span>`
                    }
                    <div class="d-grid"><button class="btn btn-danger delete-btn" data-id="${product.id}">Eliminar</button></div>
                </div>
            </div>
        </div>
        `;

    container.appendChild(newProduct);
});

container.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        socket.emit("deleteProduct", id);
    }
});

socket.on("productDeleted", (id) => {
    const productCard = document.querySelector( `[data-product-id="${id}"]`);

    if (productCard) {
        productCard.remove();
    }
});