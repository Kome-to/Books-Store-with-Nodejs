import { getCartToken, Validate } from './function.js';

const countCart = document.querySelector('.count-book-cart');

//Get quantities of cart
countCart.textContent = getCartToken().length;

const loginUser = async (user) => {
    try {
        const res = await fetch('/user/login', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ user })
        })

        if (res.status === 200) {
            const data = await res.json();
            const accessToken = data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            alert('Login Successfully');
        } else {
            throw 'error';
        }
    } catch (err) {
        document.querySelector('.username-field .error-input').innerText = 'Username or password not exactly'
        document.querySelector('.username-field .error-input').classList.remove('hidden-action');
    }
}

const validateFormLogin = (arr) => {
    let flag = true;
    arr.forEach((item, index) => {
        const father = document.querySelectorAll('.login-pane input')[index].parentElement;
        const errorTag = father.querySelector('span');
        errorTag.innerText = '';
        const labelValue = father.querySelector('label').innerText;
        if (!Validate.required(item)) {
            const messageError = labelValue + ' is required *'
            errorTag.classList.remove('hidden-action');
            errorTag.innerText = messageError;
            flag = false;
        } else {
            if (!Validate.minLength(item.length, 6)) {
                errorTag.innerText = '';
                const messageError = labelValue + ' must have at least 6 characters.'
                errorTag.classList.remove('hidden-action');
                errorTag.innerText = messageError;
                flag = false;
            }
        }
    })
    return flag;
}

const bt = document.querySelector('.submit-login');

bt.addEventListener('click', () => {
    const arr = [...document.querySelectorAll('.login-pane input')].map(data => data.value);
    if (validateFormLogin(arr)) {
        const user = {
            'username': arr[0],
            'password': arr[1],
        }
        loginUser(user);
    }
})