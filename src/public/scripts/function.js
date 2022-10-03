const getCartToken = () => {
    const cartCookie = document.cookie.match(/cart=(\[.*?\])/);
    if (cartCookie) {
        return JSON.parse(cartCookie[1]);
    } else {
        return [];
    }
}

const addProductToCart = (id) => {
    let cartArr = getCartToken();
    if (!JSON.stringify(cartArr).includes(id)) {
        cartArr.push({ id, "amount": 1 });
    } else {
        cartArr.map(item => item.id === id ? item.amount++ : item);
    }
    const str = JSON.stringify(cartArr);
    document.cookie = `cart=${str};max-age=2592000;path=/`;
    document.querySelector('.count-book-cart').textContent = cartArr.length;
    document.querySelector('.modal-add-product-to-cart').classList.remove('hidden-action');
}

const removeProductFromCart = (id) => {
    let cartArr = getCartToken();
    cartArr = cartArr.filter(item => item.id !== id);
    const str = JSON.stringify(cartArr);
    document.cookie = `cart=${str};max-age=2592000;path=/`;
}
export { getCartToken, addProductToCart, removeProductFromCart };
