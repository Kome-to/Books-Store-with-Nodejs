import { checkTokenEpx, removeProductFromCart, loadUser, changeCart } from './function.js';

const removeProducts = document.querySelectorAll('.remove-product');

removeProducts.forEach(item => {
    item.addEventListener('click', async (e) => {
        e.preventDefault();
        const infoBook = item.parentElement.parentElement.querySelector('.info-book').value
        await removeProductFromCart(infoBook);
    });
});

document.querySelector('.modal-login-required-content .cancel-modal').addEventListener('click', () => {
    document.querySelector('.modal-login-required').classList.add('hidden-action');
})

const checkoutCart = async () => {
    try {
        if (await checkTokenEpx(localStorage.getItem('token'))) {
            const res = await fetch('/user/checkout', {
                method: 'PUT',
                headers: { token: localStorage.getItem('token') },
            })
            if (res.status === 200) {
                document.querySelector('.modal-info-checkout').classList.remove('hidden-action');//Total : <%=total%> $
                document.querySelector('.modal-info-checkout .info span').innerText = `Total : ${getTotal()} $`
                document.cookie = `cart="[]";max-age=2592000;path=/`;
            } else {
                document.querySelector('.modal-login-required').classList.remove('hidden-action');
            }
        }
    } catch (err) {
        console.log(err);
    }
};

if (document.querySelector('.footer-cart .row-2 button')) {
    document.querySelector('.footer-cart .row-2 button').addEventListener('click', async () => {
        await checkoutCart();
    });
}

const getTotal = () => {
    let total = 0;
    const products = document.querySelectorAll('table .data-table');
    products.forEach(item => {
        const amount = item.querySelector('.td-3 input').value;
        const infoBook = JSON.parse(item.querySelector('.info-book').value);
        const price = infoBook.price;
        total += Number.parseInt(amount) * Number.parseInt(price);
    });
    return total;
}

document.querySelectorAll('table .td-3 input').forEach(item => {
    let beginValue = Number.parseInt(item.value);
    item.addEventListener('input', async () => {
        let afterValue = Number.parseInt(item.value);
        let infoBook = item.parentElement.parentElement.querySelector('.info-book').value;
        if (beginValue < afterValue) {
            changeCart(infoBook, 1);
        } else if (beginValue > afterValue) {
            changeCart(infoBook, -1);
        }
        beginValue = afterValue;
        document.querySelector('table .total-price').innerText = getTotal() + ' $';
    })
})
document.querySelector('table .total-price').innerText = getTotal() + ' $';

