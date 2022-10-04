const getCartToken = () => {
    const cartCookie = document.cookie.match(/cart=(\[.*?\])/);
    if (cartCookie) {
        return JSON.parse(cartCookie[1]);
    } else {
        return [];
    }
}

const addProductToCart = async (id) => {
    let cartArr = getCartToken();
    if (!JSON.stringify(cartArr).includes(id)) {
        cartArr.push({ id, "amount": 1 });
    } else {
        cartArr.map(item => item.id === id ? item.amount++ : item);
    }
    const str = JSON.stringify(cartArr);
    document.cookie = `cart=${str};max-age=2592000;path=/`;
    document.querySelector('.count-book-cart').textContent = cartArr.length;
    const res = await fetch('/books/Detail', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    const data = await res.json();
    document.querySelector('.modal-add-product-to-cart .title').textContent = data.book.title;
    document.querySelector('.modal-add-product-to-cart img').src = data.book.image;
    document.querySelector('.modal-add-product-to-cart').classList.remove('hidden-action');
}

const removeProductFromCart = (id) => {
    let cartArr = getCartToken();
    cartArr = cartArr.filter(item => item.id !== id);
    const str = JSON.stringify(cartArr);
    document.cookie = `cart=${str};max-age=2592000;path=/`;
}

const Validate = {
    required: (param) => {
        if (param === '') return false
        return true;
    },
    isEmail: (email) => {
        const regex = /^[a-z\-0-9]+@gmail.com$/
        if (regex.test(email)) return true;
        return false;
    },
    minLength: (length, min) => {
        if (length < min) return false;
        return true;
    },
    maxLength: (length, max) => {
        if (length > max) return false;
        return true;
    }
}
export { getCartToken, addProductToCart, removeProductFromCart, Validate };
