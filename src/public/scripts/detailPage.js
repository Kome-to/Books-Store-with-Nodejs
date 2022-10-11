const countCart = document.querySelector('.count-book-cart');
import { addProductToCart, getCartToken, loadUser } from './function.js';

loadUser();

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
    if (n_count > 1) n_count--;
    n_countBt.textContent = n_count;
})
const addBt = document.querySelector('.add-to-cart button')

addBt.addEventListener('click', async () => {
    const infoBook = document.querySelector('.add-to-cart input').value;

    const amount = n_countBt.textContent = n_count;
    await addProductToCart(infoBook, amount);
})