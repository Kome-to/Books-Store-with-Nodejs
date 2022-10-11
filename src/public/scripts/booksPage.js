import { getCartToken, addProductToCart, loadUser } from './function.js';

loadUser();

const countCart = document.querySelector('.count-book-cart');

//Get quantities of cart
countCart.textContent = getCartToken().length;

document.querySelector('.nav-bar .li-book').classList.add('active');


document.querySelector('.keep-shopping').addEventListener('click', () => {
    document.querySelector('.modal-add-product-to-cart').classList.add('hidden-action');
})


const searchBooks = async (input) => {
    const res1 = await fetch('/books/search',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input }),
        })
    const data = await res1.json();
    let html = ``;
    if (data.length) {
        document.querySelector('.books').innerHTML = ``;
        // const img = document.createElement('.div');
        // const titleBook = document.createElement('.div');
        // const priceBook = document.createElement('.div');
        // const book = document.createElement('.div');
        for (let i = 0; i < data.length; i++) {
            const book = document.createElement('div');
            book.className = 'book'
            html +=
                `<div class="book">
                <div class="img"><img src="${data[i].image}" alt="" ></div>
        <div class="title-book">${data[i].title}</div>
        <div class="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
        </div>
        <div class="price-book">100$</div>
        <div class="hidden-action action-hover ">
            <i class="fa-solid fa-cart-shopping action-add-to-cart"></i>
            <i class="fa-solid fa-eye"></i>
        </div>
        <form action="/books/detail/${data[i]._id}" class="get-detail" method="GET"></form>
        <input type="text" hidden value="${data[i]._id}">
            </div>`;
            // book.innerHTML = html;
            // document.querySelector('.books').appendChild(book);
        }
    } else {
        html = `<p style="text-align: center;padding: 30px;">Sorry! No result found</p>`
    }
    document.querySelector('.books').innerHTML = `${html}`;
    const books = document.querySelectorAll('.book');
    bookEvent(books);
}

document.querySelector('.searchTerm').addEventListener('keyup', (e) => {
    const input = document.querySelector('.searchTerm').value.toLowerCase();
    if (e.key === 'Enter' || e.keyCode === 13) {
        searchBooks(input);
    }
})

document.querySelector('.searchButton').addEventListener('click', () => {
    const input = document.querySelector('.searchTerm').value.toLowerCase();
    searchBooks(input);
})



const books = document.querySelectorAll('.book');

const bookEvent = (books) => {
    books.forEach(book => {
        book.addEventListener('click', () => {
            book.children[5].submit();
        });

        book.addEventListener('mouseover', () => {
            book.children[4].classList.remove('hidden-action')
        })

        book.addEventListener('mouseout', () => {
            book.children[4].classList.add('hidden-action')
        })
        book.children[4].children[0].addEventListener('click', async (e) => {
            e.stopPropagation();
            const infoBook = book.children[6].value;
            await addProductToCart(infoBook, 1);
        })
    })
}
bookEvent(books);