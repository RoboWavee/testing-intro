function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
    if (quantity <= 0) {
        throw new RangeError('The quantity must be more than 0');
    }

    let currentQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            currentQuantity = cart[i].quantity;
        }
    }

    if (currentQuantity + quantity > product.stock) {
        throw new RangeError('Insufficient stock');
    }

    const result = [];
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            result.push({ ...cart[i], quantity: cart[i].quantity + quantity });
            found = true;
        } else {
            result.push(cart[i]);
        }
    }

    if (!found) {
        result.push({ ...product, quantity: quantity });
    }

    return result;
}
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
