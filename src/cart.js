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
function changeQuantity(cart, productId, quantity) {

    let item = null;
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].id === productId) {
            item = cart[i];
        }
    }

    if (item === null) {
        return cart;
    }

    if (quantity <= 0) {
        throw new RangeError('The quantity must be more than 0');
    }

    if (quantity > item.stock) {
        throw new RangeError('Insufficient stock');
    }

    const result = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            result.push({ ...cart[i], quantity: quantity });
        } else {
            result.push(cart[i]);
        }
    }

    return result;
}
function removeFromCart(cart, productID) {

    return cart.filter((item) => item.id !== productID);
}
function calculateCartSubtotal(cart) {

    let subtotal = 0;
    for (let i = 0; i < cart.length; i += 1) {
        subtotal = subtotal + cart[i].price * cart[i].quantity;
    }
    return subtotal;
}
function calculateOrderTotal(cart, promoCode) {

    let subtotal = 0;
    for (let i = 0; i < cart.length; i += 1) {
        subtotal = subtotal + cart[i].price * cart[i].quantity;
    }

    let discount = 0;
    if (promoCode === 'SAVE10' && subtotal >= 20000) {
        discount = Math.round(subtotal * 0.1);
    }

    let delivery = 0;
    if (subtotal < 50000) {
        delivery = 30000;
    }

    const total = subtotal - discount + delivery;

    return {
        subtotal: subtotal,
        discount: discount,
        delivery: delivery,
        total: total, 
    };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
