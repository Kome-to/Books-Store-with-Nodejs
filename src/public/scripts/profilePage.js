import { checkLogin, renewToken } from "./function.js";

const usernameField = document.querySelector('.main-info .username .info');
const fullNameField = document.querySelector('.main-info .full-name .info');
const addressField = document.querySelector('.main-info .address .info');
const emailField = document.querySelector('.main-info .email .info');
const idUser = document.querySelector('.main-info .id-user');
const orderSuccessField = document.querySelector('.container .order-success .order-content');

const loadProfile = async () => {
    const user = await checkLogin();
    usernameField.innerText = user.username;
    fullNameField.innerText = user.fullName;
    addressField.innerText = user.address;
    emailField.innerText = user.email;
    idUser.value = user._id;
}

loadProfile();

const editBt = document.querySelector('.main-info h1 .text-edit');

editBt.addEventListener('click', () => {
    const inputFields = [usernameField, fullNameField, addressField, emailField];
    inputFields.forEach(field => {
        const textField = field.innerText;
        const inputField = document.createElement('input');
        inputField.className = 'input-field info';
        inputField.value = textField;
        field.replaceWith(inputField);
    })
    document.querySelector('.main-info .submit-modify').classList.remove('hidden-action');
    document.querySelector('.avatar-user .upload-avatar').classList.remove('hidden-action');
})

document.querySelector('.avatar-user .upload-avatar').addEventListener('click', () => {
    document.querySelector('.avatar-user .input-file').click();
})

document.querySelector('.main-info .submit-modify').addEventListener('click', async () => {
    await updateUser();
})

const updateUser = async () => {
    const inputs = document.querySelectorAll('.info-content .input-field');
    const user = {
        _id: idUser.value,
        username: inputs[0].value,
        fullName: inputs[1].value,
        address: inputs[2].value,
        email: inputs[3].value,
    }
    const res = await fetch('/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
        body: JSON.stringify({ user })
    });
    if (res.status == 200) {
        window.location.href = '/user/profile';
    } else if (res.status == 401 && await renewToken()) {
        await updateUser();
    };
}

const getOrderInfo = async (order) => {
    try {
        const res = await fetch('/user/order-success', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
            body: JSON.stringify({ order })
        })
        if (res.status == 200) {
            const data = await res.json();
            return data.orderSuccess;
        } else if (res.status == 401 && await renewToken()) {
            await getOrderInfo();
        } else return null
    } catch (err) {
        console.log(err);
    }
}


const loadOrder = async () => {
    const user = await checkLogin();
    const orderSuccess = await getOrderInfo(user.orderSuccess);
    if (orderSuccess.length <= 0) {
        const empty = document.createElement('div');
        empty.className = 'empty';
        empty.innerText = 'Empty';
        document.querySelector('.order-success').appendChild(empty);
    }
    orderSuccess.forEach(item => {
        const orderContent = document.createElement('div');
        orderContent.className = 'order-content';
        document.querySelector('.order-success').appendChild(orderContent);
        const order = item.order;
        const date = new Date(JSON.parse(item.date));
        const dateOrder = document.createElement('div');
        dateOrder.className = 'date-order';
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        dateOrder.innerText =
            `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${minutes}`;
        orderContent.appendChild(dateOrder);
        const totalPrice = document.createElement('div');
        totalPrice.className = 'total';
        let total = 0;
        order.forEach(prt => {
            const product = document.createElement('div');
            product.className = 'product';
            orderContent.appendChild(product);
            const img = document.createElement('div');
            const title = document.createElement('div');
            title.innerText = prt.title;
            const amount = document.createElement('div');
            amount.innerText = `x ${prt.amount}`;
            const price = document.createElement('div');
            price.innerText = `${prt.price} $`;
            total += Number.parseInt(prt.price) * prt.amount;
            img.className = 'img';
            const imgTag = document.createElement('img');
            imgTag.src = prt.image;
            img.appendChild(imgTag);
            title.className = 'title';
            amount.className = 'amount';
            price.className = 'price';
            product.appendChild(img);
            product.appendChild(title);
            product.appendChild(amount);
            product.appendChild(price);
        });
        totalPrice.innerText = `Paid : ${total} $`;
        orderContent.appendChild(totalPrice);
    });
}


document.querySelector('.show-order').addEventListener('click', async () => {
    document.querySelector('.order-success').classList.remove('hidden-action');
    document.querySelector('.show-order').classList.add('hidden-action');
    await loadOrder();

})
