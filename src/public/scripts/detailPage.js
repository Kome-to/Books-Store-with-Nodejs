const countCart = document.querySelector('.count-book-cart');
import { getCartToken } from './function.js';

//Get quantities of cart
countCart.textContent = getCartToken().length;

const increaseBt = document.querySelector('.increase-count');
const decreaseBt = document.querySelector('.decrease-count');
const n_countBt = document.querySelector('.number-count');
let n_count = Number.parseInt(n_countBt.textContent);

increaseBt.addEventListener('click', () => {
    n_count++;
    n_countBt.textContent = n_count;
})

decreaseBt.addEventListener('click', () => {
    if (n_count > 0) n_count--;
    n_countBt.textContent = n_count;
})
