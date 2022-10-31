import { addProductToCart } from './function.js';


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

    const amount = Number.parseInt(n_countBt.textContent);
    await addProductToCart(infoBook, amount);
})

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
    book.children[5].children[0].addEventListener('click', async (e) => {
        e.stopPropagation();
        const infoBook = book.children[7].value;
        await addProductToCart(infoBook, 1);
    })
});

const genres = document.querySelectorAll('.description-detail .genres-detail .genre');

genres.forEach(genre => {
    genre.addEventListener('click', (e) => {
        localStorage.setItem('genre', genre.innerText);
        window.location.href = '/books';
    });
});
