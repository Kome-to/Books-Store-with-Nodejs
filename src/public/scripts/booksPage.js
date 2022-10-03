import { getCartToken, addProductToCart } from './function.js';

const countCart = document.querySelector('.count-book-cart');

//Get quantities of cart
countCart.textContent = getCartToken().length;


const books = document.querySelectorAll('.book');

books.forEach(book => {
    book.addEventListener('click', () => {
        book.children[6].submit();
    });

    book.addEventListener('mouseover', () => {
        book.children[5].classList.remove('hidden-action')
    })

    book.addEventListener('mouseout', () => {
        book.children[5].classList.add('hidden-action')
    })
    book.children[5].children[0].addEventListener('click', (e) => {
        e.stopPropagation();
        const idBook = book.children[7].value;
        addProductToCart(idBook);
    })
})