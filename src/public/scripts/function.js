const getCartToken = () => {
    const cartCookie = document.cookie.match(/cart=(\[.*?\])/);
    if (cartCookie) {
        return JSON.parse(cartCookie[1]);
    } else {
        return [];
    }
}

const updateCart = async (cart) => {
    try {
        const res = await fetch('/user/updateCart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
            body: JSON.stringify({ cart })
        });
        if (res.status === 401 && await renewToken()) {
            updateCart(cart);
        }
    } catch (err) {
        console.log(err);
    }
}

const changeCart = async (infoBook, amount) => {
    try {
        amount = Number.parseInt(amount);
        infoBook = JSON.parse(infoBook);
        const id = infoBook._id;
        let cartArr = getCartToken();
        let flag = false;
        for (let i = 0; i < cartArr.length; i++) {
            if (cartArr[i].id === id) {
                flag = true;
                if (cartArr[i].amount + amount <= 0) {
                    console.log(cartArr[i].amount, amount);
                    console.log(cartArr);
                    cartArr.splice(i, 1);
                    console.log(cartArr);
                } else {
                    cartArr[i].amount += amount;
                }
            }
        }
        if ((cartArr.length === 0 || flag === false) && amount > 0) {
            cartArr.push({ id, amount, price: infoBook.price });
        }
        const str = JSON.stringify(cartArr);
        document.cookie = `cart=${str};max-age=2592000;path=/`;
        await updateCart(str);
        return cartArr
    } catch (err) {
        console.log(err);
        return null;
    }
}

const addProductToCart = async (infoBook, amount) => {
    const cartArr = await changeCart(infoBook, amount);
    infoBook = JSON.parse(infoBook);
    document.querySelector('.count-book-cart').textContent = cartArr.length;
    document.querySelector('.modal-add-product-to-cart .title').textContent = infoBook.title;
    document.querySelector('.modal-add-product-to-cart img').src = infoBook.image;
    document.querySelector('.modal-add-product-to-cart .price').innerText = `Price: ${infoBook.price} $`;
    document.querySelector('.modal-add-product-to-cart .amount').innerText = `Amount: ${amount}`;
    document.querySelector('.modal-add-product-to-cart').classList.remove('hidden-action');
}

const removeProductFromCart = async (infoBook) => {
    await changeCart(infoBook, -99999);
    window.location.href = "/user/cart";
}


const Validate = {
    required: (param) => {
        if (param === '') return false
        return true;
    },
    isEmail: (email) => {
        const regex = /^[a-z\-0-9]+@gmail.com$/
        if (regex.test(email)) return true;
        return false;
    },
    minLength: (length, min) => {
        if (length < min) return false;
        return true;
    },
    maxLength: (length, max) => {
        if (length > max) return false;
        return true;
    }
}

const checkLogin = async () => {
    const res = await fetch('/user/load', {
        method: 'GET',
        headers: { token: localStorage.getItem('token') }
    })
    const data = await res.json();
    if (data.user) {
        // document.cookie = `cart=${data.cart};max-age=2592000;path=/`;
        return data.user;
    }
    else if (res.status == 401 && await renewToken()) {
        return await checkLogin();
    } else
        return null;
}

const renewToken = async () => {
    const res = await fetch('/user/refresh', {
        method: 'GET',
    })
    if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem('token', data.accessToken);
        return true;
    } else return false;
}

const loadUser = async () => {
    try {
        const user = await checkLogin();
        document.cookie = `cart=${user.cart};max-age=2592000;path=/`;
        const welcome = document.querySelector('.sub-nav .login-text a');
        const welcomeIcon = document.querySelector('.sub-nav .login a');
        if (user) {
            const username = user.username.substring(0, 1).toUpperCase() + user.username.substring(1)
            welcome.innerText = `Hello ${username}`;
            welcome.href = '#';
            welcomeIcon.href = '#';
            document.querySelector('.user-option').classList.remove('login-required');
            document.querySelector('.login .fa-angle-down').classList.remove('hidden-action');
        } else {
            welcomeIcon.href = '/login';
            welcome.innerText = `Login`;
        }
        welcome.classList.remove('hidden-action');
    } catch (err) {
        console.log(err);
    }
}

const logout = async () => {
    try {
        const res = await fetch('/user/logout', {
            method: 'GET',
            headers: { token: localStorage.getItem('token') }
        })
        if (res.status === 200) {
            localStorage.removeItem("token");
            document.cookie = "cart=;max-age=0;path=/";
            document.querySelector('.user-option').classList.add('login-required');
            document.querySelector('.login .fa-angle-down').classList.add('hidden-action');
            window.location.href = "/";
        } else if (res.status === 401) {
            await checkLogin();
            await logout();
        }
    } catch (err) {
        console.log(err);
    }
}


export {
    getCartToken, addProductToCart, removeProductFromCart, loadUser, checkLogin, Validate, logout, renewToken,
    changeCart
};
