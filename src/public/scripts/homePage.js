const books = document.querySelectorAll('.book');
const countCart = document.querySelector('.count-book-cart');
import { getCartToken, addProductToCart } from './function.js';



//Get quantities of cart
countCart.textContent = getCartToken().length;

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

document.querySelector('.keep-shopping').addEventListener('click', () => {
    document.querySelector('.modal-add-product-to-cart').classList.add('hidden-action');
})