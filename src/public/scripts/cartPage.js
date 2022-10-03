import { getCartToken, removeProductFromCart } from './function.js';

const countCart = document.querySelector('.count-book-cart');

//Get quantities of cart
countCart.textContent = getCartToken().length;

const removeProducts = document.querySelectorAll('.remove-product');

removeProducts.forEach(item => {
    item.addEventListener('click', () => {
        const id = item.classList[1];
        removeProductFromCart(id);
    })
})