import { addProductToCart } from './function.js';

const books = document.querySelectorAll('.book');
document.querySelector('.nav-bar .li-home').classList.add('active');


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
    book.children[5].children[0].addEventListener('click', async (e) => {
        e.stopPropagation();
        const infoBook = book.children[7].value;
        await addProductToCart(infoBook, 1);
    })
})
