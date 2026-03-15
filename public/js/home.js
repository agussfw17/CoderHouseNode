const { links, products, cart } = JSON.parse(document.getElementById("pageData").textContent);

console.log('links', links);
console.log('products', products);
console.log('cart', cart);

document.querySelectorAll(".addToCart").forEach(button => {
button.addEventListener("click", async (e) => {
    const productId = e.target.dataset.id
    try {
    const res = await fetch("/api/carts/1/product/" + productId, {
        method: "POST"
    })
    if(res.ok){
        alert("Producto agregado al carrito")
    } else {
        alert("Error al agregar")
    }
    } catch(err){
    console.error(err)
    }
})
})

function goFirst(){
    if(links.length > 0){
        window.location = links[0].link
    }
}

function goLast(){
    if(links.length > 0){
        window.location = links[links.length - 1].link
    }
}

function goPrev(){
    let currentIndex = links.findIndex(l => l.active)
    if(currentIndex > 0){
        window.location = links[currentIndex - 1].link
    }
}

function goNext(){
    console.log('entre');
    let currentIndex = links.findIndex(l => l.active)
    if(currentIndex < links.length - 1){
        window.location = links[currentIndex + 1].link
    }
}

document.getElementById("firstPage").addEventListener("click", goFirst);
document.getElementById("lastPage").addEventListener("click", goLast);
document.getElementById("prevPage").addEventListener("click", goPrev);
document.getElementById("nextPage").addEventListener("click", goNext);