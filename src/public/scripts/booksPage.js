import { getCartToken, addProductToCart, loadUser } from './function.js';



document.querySelector('.nav-bar .li-book').classList.add('active');


document.querySelector('.keep-shopping').addEventListener('click', () => {
    document.querySelector('.modal-add-product-to-cart').classList.add('hidden-action');
})

const booksResultDisplay = (data) => {
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
    <div class="price-book">${data[i].price} $</div>
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


const searchBooks = async (input) => {
    try {
        const res = await fetch('/books/search',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: input.toLowerCase() }),
            })
        const data = await res.json();
        booksResultDisplay(data);
        document.querySelector('.row-3 .search-result').innerText = `: Result of '${input}'`
    } catch (err) {
        console.log(err);
    }
}

const searchByPrice = async (fromPrice, toPrice) => {
    try {
        const res = await fetch('/books/search-by-price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prices: [fromPrice, toPrice] }),
        });
        const data = await res.json();
        booksResultDisplay(data);
        document.querySelector('.row-3 .search-result').innerText = `: Price ${fromPrice} - ${toPrice} $`
    } catch (err) {
        console.log(err);
    }

}

document.querySelectorAll('.prices li').forEach(item => {
    item.addEventListener('click', async () => {
        const arr = item.innerText.split(/ /g);
        const fromPrice = Number.parseInt(arr[0]), toPrice = Number.parseInt(arr[2]);
        await searchByPrice(fromPrice, toPrice);
    })
});


const searchByGenres = async (genre) => {
    try {
        const res = await fetch('/books/search-by-genres', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ genre }),
        });
        const data = await res.json();
        booksResultDisplay(data);
        document.querySelector('.row-3 .search-result').innerText = `: Genre '${genre}'`
    } catch (err) {
        console.log(err);
    }

}

document.querySelectorAll('.genres li').forEach(item => {
    item.addEventListener('click', async () => {
        const genres = item.innerText;
        await searchByGenres(genres);
    })
});


document.querySelector('.searchTerm').addEventListener('keyup', (e) => {
    const input = document.querySelector('.searchTerm').value;
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