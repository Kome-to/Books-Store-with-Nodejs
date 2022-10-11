import { logout } from '../function.js';


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