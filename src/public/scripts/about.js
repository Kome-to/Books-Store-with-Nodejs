import { getCartToken, loadUser } from './function.js';

loadUser();

document.querySelector('.nav-bar .li-about').classList.add('active');

const countCart = document.querySelector('.count-book-cart');

//Get quantities of cart
countCart.textContent = getCartToken().length;