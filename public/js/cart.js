const cartBadge = document.getElementById('cart-badge')

const updateCartBadge = async (parametro) => {
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
    const el = document.getElementById(productId)
    el.parentElement.removeChild(el)
    cartBadge.innerHTML--
    await fetch(`/api/cart/${cartId}/${productId}`, { method: 'DELETE' })
}

const sendOrder = async (cartId) => {
    fetch(`/api/sms/${cartId}`, { method: 'POST' })
}