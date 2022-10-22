import { Validate } from './function.js';


const loginUser = async (user) => {
    try {
        const res = await fetch('/user/login', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ user })
        })
        if (res.status === 200) {
            const data = await res.json();
            localStorage.setItem('token', data.accessToken);
            document.cookie = `cart=${data.cart};max-age=2592000;path=/`;
            if (data.admin) {
                document.querySelector('.load-home-page').action = '/admin';
            }
            document.querySelector('.load-home-page').submit();
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


document.querySelector('.submit-login').addEventListener('click', async () => {
    const arr = [...document.querySelectorAll('.login-pane input')].map(data => data.value);
    if (validateFormLogin(arr)) {
        const user = {
            'username': arr[0],
            'password': arr[1],
        }
        await loginUser(user);
    }
});
document.querySelectorAll('.login-pane input').forEach(ele => {
    ele.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            document.querySelector('.submit-login').click();
        }
    });
})