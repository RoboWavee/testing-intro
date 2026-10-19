function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart() { return notImplemented(); }
function changeQuantity() { return notImplemented(); }
function removeFromCart(cart, productID) {
    return cart.filter((item) => item.id !== productID);
}
function calculateCartSubtotal(cart) {
    let subtotal = 0;
    for (let i = 0; i < cart.length; i += 1) {
        subtotal = subtotal + cart[i].product.price * cart[i].quantity;
    }
    return subtotal;
}
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
