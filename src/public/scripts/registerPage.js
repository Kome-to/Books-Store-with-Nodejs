import { getCartToken, Validate } from './function.js';


const bt = document.querySelector('.footer-login button');

const registerUser = async (user) => {
    try {
        const res = await fetch('/user/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ user })
        })
        const data = await res.json();
    } catch (err) {
        console.log(err);
    }
}


const validateFormRegister = (arr) => {
    let flag = true;
    arr.forEach((item, index) => {
        const father = document.querySelectorAll('.register-pane input')[index].parentElement;
        const errorTag = father.querySelector('span');
        errorTag.innerText = '';
        const labelValue = father.querySelector('label').innerText;
        if (!Validate.required(item)) {
            const messageError = labelValue + ' is required *'
            errorTag.classList.remove('hidden-action');
            errorTag.innerText = messageError;
            flag = false;
        } else {
            if (index === 3 && !Validate.isEmail(item)) {
                errorTag.innerText = '';
                const messageError = labelValue + ' is invalid'
                errorTag.classList.remove('hidden-action');
                errorTag.innerText = messageError;
                flag = false;
            }
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

bt.addEventListener('click', () => {
    const arr = [...document.querySelectorAll('.register-pane input')].map(data => data.value);
    if (validateFormRegister(arr)) {
        const user = {
            'username': arr[0],
            'fullName': arr[1],
            'address': arr[2],
            'email': arr[3],
            'password': arr[4],
        }
        registerUser(user);
        document.querySelector('.modal-register').classList.remove('hidden-action');
    }
})





