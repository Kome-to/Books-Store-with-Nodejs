const books = document.querySelectorAll('.book');
const count = document.querySelector('.count-book-cart');

let x = Number.parseInt(count.textContent);

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
})


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