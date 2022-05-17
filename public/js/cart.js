const updateCartBadge = async (parametro) => {
    const cartBadge = document.getElementById('cart-badge')
    const cartLengthResponse = await fetch(`/api/cart/getAll`)
    const cart = await cartLengthResponse.json()
    if (parametro != 1) {
        cartBadge.innerHTML = cart.products.length
        return
    }
    cartBadge.innerText = cart.products.length + 1
}

const addToCart = async (cartId, productId) => {
    await updateCartBadge(1) 
    await fetch(`/api/cart/${cartId}/${productId}`, { method: 'POST' })  
}

const removeFromCart = async (cartId, productId) => {
    const res = await fetch(`/api/cart/${cartId}/${productId}`, { method: 'DELETE' })
    if (res.status != 200) {
        return
    }
    await updateCartBadge()
    const el = document.getElementById(productId)
    el.parentElement.removeChild(el)
}

const emptyCart = async (cartId) => {
    const res = await fetch(`/api/cart/all/${cartId}`, { method: 'DELETE' })
    if (res.status != 200) {
        return
    }
    await updateCartBadge()
    const el = document.getElementById('cart-list')
    el.innerHTML = ''
}

// function sendOrder(pedidoId) {
//     fetch(`/api/sms/${pedidoId}`, { method: 'POST' })
//         .then(res => {
//             if (res.status != 202) {
//                 return
//             }
//             const row = document.getElementById(pedidoId)
//             consz cell = row.children.item(3)
//             cell.innerHTML = 'Si'
//         })
// }

