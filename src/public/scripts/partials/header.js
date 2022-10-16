import { logout, loadUser, getCartToken } from '../function.js';
loadUser();


const countCart = document.querySelector('.count-book-cart');

//Get quantities of cart
countCart.textContent = getCartToken().length;


const userOptionText = document.querySelector('.sub-nav .user-nav')
userOptionText.addEventListener('mouseover', () => {
    document.querySelector('.user-option').classList.remove('hidden-action');
});

userOptionText.addEventListener('mouseout', () => {
    document.querySelector('.user-option').classList.add('hidden-action');
});

const logoutBt = document.querySelector('.log-out')
logoutBt.addEventListener('click', async () => {
    await logout();
})

