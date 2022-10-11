import { getCartToken, removeProductFromCart, loadUser, renewToken, changeCart } from './function.js';

loadUser();

const countCart = document.querySelector('.count-book-cart');

//Get quantities of cart
countCart.textContent = getCartToken().length;

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
        const res = await fetch('/user/checkout', {
            method: 'PUT',
            headers: { token: localStorage.getItem('token') },
        })
        if (res.status === 200) {
            document.querySelector('.modal-info-checkout').classList.remove('hidden-action');
            document.cookie = `cart="[]";max-age=2592000;path=/`;
        } else if (res.status === 401 && await renewToken()) {
            checkoutCart();
        } else {
            document.querySelector('.modal-login-required').classList.remove('hidden-action');
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
    })
})

