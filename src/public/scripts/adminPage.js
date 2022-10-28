import { logout, checkLogin, checkTokenEpx, Validate } from './function.js';


const main = async () => {

    await checkAdmin();
    await getAllBook();
    await getAllUser();

    const usernameFieldAdmin = document.querySelector('.container-profile .main-info .username .info');
    const fullNameFieldAdmin = document.querySelector('.container-profile .main-info .full-name .info');
    const addressFieldAdmin = document.querySelector('.container-profile .main-info .address .info');
    const emailFieldAdmin = document.querySelector('.container-profile .main-info .email .info');
    const idAdmin = document.querySelector('.container-profile .main-info .id-user');
    const adminArr = [usernameFieldAdmin, fullNameFieldAdmin, addressFieldAdmin, emailFieldAdmin];

    const usernameField = document.querySelector('.user-detail .main-info .username .info');
    const fullNameField = document.querySelector('.user-detail .main-info .full-name .info');
    const addressField = document.querySelector('.user-detail .main-info .address .info');
    const emailField = document.querySelector('.user-detail .main-info .email .info');
    const idUser = document.querySelector('.user-detail .main-info .id-user');
    const userArr = [usernameField, fullNameField, addressField, emailField];

    const userOptionText = document.querySelector('.sub-nav .user-nav');
    const editBt = document.querySelector('.main-info h1 .text-edit');

    const titleField = document.querySelector('.book-detail .main-info .title .info');
    const authorField = document.querySelector('.book-detail .main-info .author .info');
    const genresField = document.querySelector('.book-detail .main-info .genres .info');
    const priceField = document.querySelector('.book-detail .main-info .price .info');
    const idBook = document.querySelector('.book-detail .main-info .id-book');
    const bookArr = [titleField, authorField, genresField, priceField];

    const editBook = document.querySelector('.book-detail .main-info h1 .text-edit');
    const editUser = document.querySelector('.user-detail .main-info h1 .text-edit');


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

    document.querySelector('.your-profile').addEventListener('click', async () => {
        await loadProfile();
        document.querySelector('.container-profile').classList.remove('hidden-action');
    });

    document.querySelector('.container-profile').addEventListener('click', () => {
        let i = 0;
        document.querySelectorAll('.container-profile .main-info .info').forEach(item => {
            console.log(item);
            if (item.classList.contains('input-field')) {
                if (item.classList.contains('input-field')) {
                    item.replaceWith(adminArr[i++]);
                }
            }
        });
        document.querySelector('.container-profile').classList.add('hidden-action');
    })

    document.querySelector('.container-profile .info-user').addEventListener('click', (e) => {
        e.stopPropagation();
    })



    const loadProfile = async () => {
        const user = await checkLogin();
        usernameFieldAdmin.innerText = user.username;
        fullNameFieldAdmin.innerText = user.fullName;
        addressFieldAdmin.innerText = user.address;
        emailFieldAdmin.innerText = user.email;
        idAdmin.value = user._id;
    }


    editBt.addEventListener('click', () => {
        const inputFields = [usernameFieldAdmin, fullNameFieldAdmin, addressFieldAdmin, emailFieldAdmin];
        inputFields.forEach(field => {
            const textField = field.innerText;
            const inputField = document.createElement('input');
            inputField.className = 'input-field info';
            inputField.value = textField;
            field.replaceWith(inputField);
        })
        document.querySelector('.main-info .submit-modify').classList.remove('hidden-action');
        document.querySelector('.avatar-user .upload-avatar').classList.remove('hidden-action');
    });

    document.querySelector('.avatar-user .upload-avatar').addEventListener('click', () => {
        const fileInput = document.querySelector('.avatar-user .input-file');
        fileInput.click();
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('loadend', () => {
                document.querySelector('.avatar-user img').src = reader.result;
            })
        })
    })


    document.querySelector('.container-profile .main-info .submit-modify').addEventListener('click', async () => {
        const username = document.querySelector('.container-profile .main-info .username .info').value;
        const fullName = document.querySelector('.container-profile .main-info .full-name .info').value;
        const address = document.querySelector('.container-profile .main-info .address .info').value;
        const email = document.querySelector('.container-profile .main-info .email .info').value;
        await updateUser(idAdmin.value,
            username,
            fullName,
            address,
            email);
    })

    document.querySelector('.user-detail .main-info .submit-modify').addEventListener('click', async () => {
        const username = document.querySelector('.user-detail .main-info .username .info').value;
        const fullName = document.querySelector('.user-detail .main-info .full-name .info').value;
        const address = document.querySelector('.user-detail .main-info .address .info').value;
        const email = document.querySelector('.user-detail .main-info .email .info').value;
        await updateUser(idAdmin.value,
            username,
            fullName,
            address,
            email);
    })

    document.querySelector('.user-detail .main-info .submit-add').addEventListener('click', async () => {
        const username = document.querySelector('.user-detail .main-info .username .info').value;
        const fullName = document.querySelector('.user-detail .main-info .full-name .info').value;
        const address = document.querySelector('.user-detail .main-info .address .info').value;
        const email = document.querySelector('.user-detail .main-info .email .info').value;
        await addUser(
            username,
            fullName,
            address,
            email);
    })

    const updateUser = async (id, username, fullName, address, email) => {
        try {
            if (await checkTokenEpx(localStorage.getItem('token'))) {
                const user = {
                    _id: id,
                    username: username,
                    fullName: fullName,
                    address: address,
                    email: email,
                }
                const res = await fetch('/user/update', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                    body: JSON.stringify({ user })
                });
                if (res.status == 200) {
                    document.querySelector('.container-profile').classList.add('hidden-action');
                    document.querySelector('.container-view').click();
                    window.location.reload();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }


    const addUser = async (username, fullName, address, email) => {
        try {
            if (await checkTokenEpx(localStorage.getItem('token'))) {
                const user = {
                    username: username,
                    fullName: fullName,
                    address: address,
                    email: email,
                }
                const res = await fetch('admin/users/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                    body: JSON.stringify({ user })
                });
                if (res.status == 200) {
                    document.querySelector('.container-profile').classList.add('hidden-action');
                    document.querySelector('.container-view').click();
                    window.location.reload();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }






    const searchBooks = async (input) => {
        try {
            const res = await fetch('/books/search',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ input: input.toLowerCase() }),
                })
            const data = await res.json();
            displayBooks(data);
        } catch (err) {
            console.log(err);
        }
    }

    document.querySelector('.searchTerm').addEventListener('keyup', async (e) => {
        const input = document.querySelector('.searchTerm').value;
        if (e.key === 'Enter' || e.keyCode === 13) {
            await searchBooks(input);
        }
    });

    document.querySelector('.searchButton').addEventListener('click', async () => {
        const input = document.querySelector('.searchTerm').value.toLowerCase();
        await searchBooks(input);
    });

    const getBookDetail = async (id) => {
        try {
            const accept = await checkTokenEpx(localStorage.getItem('token'));
            if (accept) {
                const res = await fetch('admin/books/detail', {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json', token: localStorage.getItem('token') },
                    body: JSON.stringify({ id })
                });
                if (res.status == 200) {
                    const data = await res.json();
                    return data
                }
                return null;
            }
        } catch (err) {
            console.log(er);
            return null;
        }
    }

    const getUserDetail = async (id) => {
        try {
            const accept = await checkTokenEpx(localStorage.getItem('token'));
            if (accept) {
                const res = await fetch('admin/users/detail', {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json', token: localStorage.getItem('token') },
                    body: JSON.stringify({ id })
                });
                if (res.status == 200) {
                    const data = await res.json();
                    return data;
                }
                return null;
            }
        } catch (err) {
            console.log(er);
            return null;
        }
    }

    document.querySelector('.container .books .action .view').addEventListener('click', async () => {
        document.querySelector('.container-view').classList.remove('hidden-action');
        document.querySelector('.container-view .books-list').classList.remove('hidden-action');
        const books = document.querySelectorAll('.container-view .books-list .all-docs .book');
        books.forEach(book => {
            book.addEventListener('click', async () => {
                const bookDetail = document.querySelector('.modal-detail .book-detail');
                const id = book.querySelector('.id-book').value;
                const bookData = await getBookDetail(id);
                if (bookData) {
                    bookDetail.querySelector('.img-book img').src = `${bookData.image}`;
                    bookDetail.querySelector('.info-content .title .info').innerText = `${bookData.title}`;
                    bookDetail.querySelector('.info-content .author .info').innerText = `${bookData.author}`;
                    bookDetail.querySelector('.info-content .genres .info').innerText = `${bookData.genres}`;
                    bookDetail.querySelector('.info-content .price .info').innerText = `${bookData.price} $`;
                    bookDetail.querySelector('.info-content .amount-sold .info').innerText = `${bookData.amountSold}`;
                    bookDetail.querySelector('.info-content .id-book').value = `${bookData._id}`;
                    bookDetail.querySelector('.description .info').innerText = `${bookData.description}`;
                    document.querySelector('.container-view .modal-detail').classList.remove('hidden-action');
                    document.querySelector('.container-view .modal-detail .book-detail').classList.remove('hidden-action');
                }
            })
        })
    });


    document.querySelector('.container .users .action .view').addEventListener('click', async () => {
        document.querySelector('.container-view').classList.remove('hidden-action');
        document.querySelector('.container-view .users-list').classList.remove('hidden-action');
        const users = document.querySelectorAll('.container-view .users-list .all-docs .user');
        users.forEach(user => {
            user.addEventListener('click', async () => {
                const userDetail = document.querySelector('.modal-detail .user-detail');
                const id = user.querySelector('.id-user').value;
                const userData = await getUserDetail(id);
                if (userData) {
                    userDetail.querySelector('.info-content .username .info').innerText = `${userData.username}`;
                    userDetail.querySelector('.info-content .full-name .info').innerText = `${userData.fullName}`;
                    userDetail.querySelector('.info-content .email .info').innerText = `${userData.email}`;
                    userDetail.querySelector('.info-content .address .info').innerText = `${userData.address}`;
                    userDetail.querySelector('.info-content .id-user').value = `${userData._id}`;
                    document.querySelector('.container-view .modal-detail').classList.remove('hidden-action');
                    document.querySelector('.container-view .modal-detail .user-detail').classList.remove('hidden-action');
                }
            })
        })
    });



    editBook.addEventListener('click', () => {
        bookArr.forEach(field => {
            const textField = field.innerText;
            const inputField = document.createElement('input');
            inputField.className = 'input-field info';
            inputField.value = textField;
            field.replaceWith(inputField);
        })
        const textField = document.querySelector('.book-detail .description .info').innerText;
        const inputField = document.createElement('textarea');
        inputField.className = 'description-field info';
        inputField.value = textField;
        document.querySelector('.book-detail .description .info').replaceWith(inputField);
        document.querySelector('.book-detail .submit-modify').classList.remove('hidden-action');
        document.querySelector('.img-book .upload-img-book').classList.remove('hidden-action');
        editBook.style.pointerEvents = 'none';
        document.querySelector('.container-view').addEventListener('click', () => {
            let i = 0;
            document.querySelectorAll('.book-detail .info-content .info').forEach(item => {
                if (!item.parentElement.classList.contains('amount-sold')) {
                    bookArr[i].innerText = '';
                    item.replaceWith(bookArr[i++]);
                } else {
                    item.innerText = '0';
                }
            });
            const divTag = document.createElement('div');
            divTag.className = 'info';
            document.querySelector('.book-detail .description .info').replaceWith(divTag);
            document.querySelector('.book-detail .submit-modify').classList.add('hidden-action');
            document.querySelector('.img-book .upload-img-book').classList.add('hidden-action');
            editBook.style.pointerEvents = 'visible';
        });

    });

    editUser.addEventListener('click', () => {
        userArr.forEach(field => {
            const textField = field.innerText;
            const inputField = document.createElement('input');
            inputField.className = 'input-field info';
            inputField.value = textField;
            field.replaceWith(inputField);
        })
        document.querySelector('.user-detail .submit-modify').classList.remove('hidden-action');
        document.querySelector('.img-user .upload-img-user').classList.remove('hidden-action');
        editBook.style.pointerEvents = 'none';

        document.querySelector('.container-view').addEventListener('click', () => {
            let i = 0;
            document.querySelectorAll('.user-detail .info-content .info').forEach(item => {

                userArr[i].innerText = '';
                item.replaceWith(userArr[i++]);
            });
            document.querySelector('.user-detail .submit-modify').classList.add('hidden-action');
            document.querySelector('.img-user .upload-img-user').classList.add('hidden-action');
            editUser.style.pointerEvents = 'visible';
        });
    });

    const updateBook = async () => {
        try {
            if (await checkTokenEpx(localStorage.getItem('token'))) {
                const inputs = document.querySelectorAll('.book-detail .info-content .input-field');
                const description = document.querySelector('.book-detail .description .description-field').value
                const book = {
                    _id: idBook.value,
                    image: document.querySelector('.book-detail .img-book img').src,
                    title: inputs[0].value,
                    author: inputs[1].value,
                    genres: [...inputs[2].value.split(',')],
                    price: inputs[3].value,
                    description: description
                }
                const res = await fetch('/admin/books/update', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                    body: JSON.stringify({ book })
                });
                if (res.status == 200) {
                    document.querySelector('.container-view').click();
                    window.location.reload();
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addBook = async () => {
        try {
            if (await checkTokenEpx(localStorage.getItem('token'))) {
                const inputs = document.querySelectorAll('.book-detail .info-content .input-field');
                const description = document.querySelector('.book-detail .description .description-field').value
                if (validateBook(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)) {
                    const book = {
                        _id: idBook.value,
                        image: document.querySelector('.book-detail .img-book img').src,
                        title: inputs[0].value,
                        author: inputs[1].value,
                        genres: [...inputs[2].value.split(',')],
                        price: inputs[3].value,
                        description: description
                    }
                    const res = await fetch('/admin/books/add', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                        body: JSON.stringify({ book })
                    });
                    if (res.status == 200) {
                        document.querySelector('.container-view').click();
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }


    document.querySelector('.img-book .upload-img-book').addEventListener('click', () => {
        const fileInput = document.querySelector('.img-book .input-file');
        fileInput.click();
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('loadend', () => {
                document.querySelector('.img-book img').src = reader.result;
            })
        })
    });

    document.querySelector('.img-user .upload-img-user').addEventListener('click', () => {
        const fileInput = document.querySelector('.img-user .input-file');
        fileInput.click();
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('loadend', () => {
                document.querySelector('.img-user img').src = reader.result;
            })
        })
    })

    document.querySelector('.book-detail .submit-modify').addEventListener('click', async () => {
        await updateBook();
    });

    document.querySelector('.book-detail .submit-add').addEventListener('click', async () => {
        await addBook();
    });

    document.querySelector('.container .books .action .add').addEventListener('click', async () => {
        document.querySelector(' .modal-detail .book-detail .img-book img').src = '';
        editBook.click();
        document.querySelector('.book-detail .title .input-field').value = '';
        document.querySelector('.book-detail .author .input-field').value = '';
        document.querySelector('.book-detail .genres .input-field').value = '';
        document.querySelector('.book-detail .price .input-field').value = '';
        document.querySelector('.book-detail .amount-sold .info').innerText = '0';
        document.querySelector('.book-detail .description .description-field').value = '';
        document.querySelector('.book-detail h1').innerText = 'Add Book';
        document.querySelector('.book-detail .submit-modify').classList.add('hidden-action');
        document.querySelector('.book-detail .submit-add').classList.remove('hidden-action');
        document.querySelector('.container-view').classList.remove('hidden-action');
        document.querySelector('.container-view .modal-detail').classList.remove('hidden-action');
        document.querySelector('.book-detail').classList.remove('hidden-action');
        document.querySelector('.container-view').addEventListener('click', () => {
            document.querySelector('.book-detail h1').innerText = 'Book Detail';
            document.querySelector('.book-detail h1').appendChild(editBook);
            document.querySelector('.book-detail .submit-modify').classList.add('hidden-action');
            document.querySelector('.book-detail .submit-add').classList.add('hidden-action');
            document.querySelector('.book-detail').classList.add('hidden-action');
        });
    });

    document.querySelectorAll('.books-list .all-docs .delete').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelector('.modal-confirm-delete').classList.remove('hidden-action');
            const id = item.parentElement.querySelector('.id-book').value;
            document.querySelector('.modal-confirm-delete .delete-confirm').addEventListener('click', async () => {
                try {
                    const access = await checkTokenEpx(localStorage.getItem('token'));
                    if (access) {
                        const res = await fetch('/admin/books/delete', {
                            method: 'DELETE',
                            headers: { 'Content-type': 'application/json', token: localStorage.getItem('token') },
                            body: JSON.stringify({ _id: id })
                        })
                        if (res.status == 200) {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            })
        })
    })

    document.querySelectorAll('.users-list .all-docs .delete').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelector('.modal-confirm-delete').classList.remove('hidden-action');
            const id = item.parentElement.querySelector('.id-user').value;
            document.querySelector('.modal-confirm-delete .delete-confirm').addEventListener('click', async () => {
                try {
                    const access = await checkTokenEpx(localStorage.getItem('token'));
                    if (access) {
                        const res = await fetch('/admin/users/delete', {
                            method: 'DELETE',
                            headers: { 'Content-type': 'application/json', token: localStorage.getItem('token') },
                            body: JSON.stringify({ _id: id })
                        })
                        if (res.status == 200) {
                            window.location.reload();
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            })
        })
    })

    document.querySelector('.modal-confirm-delete').addEventListener('click', () => {
        document.querySelector('.modal-confirm-delete').classList.add('hidden-action');
    })

    document.querySelector('.modal-confirm-delete .cancel-confirm').addEventListener('click', () => {
        document.querySelector('.modal-confirm-delete').classList.add('hidden-action');
    })

    document.querySelector('.modal-confirm-delete .inner-modal').addEventListener('click', (e) => {
        e.stopPropagation();
    })

    document.querySelector('.container .users .action .add').addEventListener('click', async () => {
        editUser.click();
        document.querySelector('.user-detail .username .input-field').value = '';
        document.querySelector('.user-detail .full-name .input-field').value = '';
        document.querySelector('.user-detail .address .input-field').value = '';
        document.querySelector('.user-detail .email .input-field').value = '';
        document.querySelector('.user-detail h1').innerText = 'Add User';
        document.querySelector('.user-detail .submit-modify').classList.add('hidden-action');
        document.querySelector('.user-detail .submit-add').classList.remove('hidden-action');
        document.querySelector('.container-view').classList.remove('hidden-action');
        document.querySelector('.container-view .modal-detail').classList.remove('hidden-action');
        document.querySelector('.user-detail').classList.remove('hidden-action');
        document.querySelector('.container-view').addEventListener('click', () => {
            document.querySelector('.user-detail h1').innerText = 'User Detail';
            document.querySelector('.user-detail h1').appendChild(editUser);
            document.querySelector('.user-detail .submit-modify').classList.add('hidden-action');
            document.querySelector('.user-detail .submit-add').classList.add('hidden-action');
            document.querySelector('.user-detail').classList.add('hidden-action');
        });
    });

    document.querySelector('.container-view').addEventListener('click', () => {
        document.querySelector('.container-view').classList.add('hidden-action');
        const children = [...document.querySelector('.container-view').children];
        children.forEach(child => {
            child.classList.add('hidden-action');
        });
        document.querySelector('.container-view .modal-detail .book-detail').classList.add('hidden-action');
        document.querySelector('.container-view .modal-detail .user-detail').classList.add('hidden-action');
    });

    document.querySelector('.container-view .books-list').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.querySelector('.container-view .users-list').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.querySelector('.container-view .book-detail').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.querySelector('.container-view .user-detail').addEventListener('click', (e) => {
        e.stopPropagation();
    });


}


//fetch API
const displayBooks = (books) => {
    document.querySelector('.books-list .all-docs').innerHTML = '';
    books.forEach(book => {
        const item = document.createElement('div');
        item.className = 'book';
        const img = document.createElement('div');
        img.className = 'img';
        const imgLink = document.createElement('img');
        imgLink.src = `${book.image}`;
        img.appendChild(imgLink);
        const titleBook = document.createElement('div');
        titleBook.className = 'title-book';
        const innerTitle = document.createElement('div');
        innerTitle.className = 'inner-title';
        innerTitle.innerText = `${book.title}`;
        titleBook.appendChild(innerTitle);
        const priceBook = document.createElement('div');
        priceBook.className = 'price-book';
        priceBook.innerText = `${book.price} $`;
        const deleteBt = document.createElement('div');
        deleteBt.className = 'delete';
        deleteBt.innerHTML = '<i class="fa-solid fa-trash"></i>'
        const idBook = document.createElement('input');
        idBook.value = book._id;
        idBook.className = 'id-book hidden-action';
        item.appendChild(idBook);
        item.appendChild(img);
        item.appendChild(titleBook);
        item.appendChild(priceBook);
        item.appendChild(deleteBt);
        document.querySelector('.books-list .all-docs').appendChild(item);
    })
}

const displayUsers = (users) => {
    document.querySelector('.users-list .all-docs').innerHTML = '';
    users.forEach(user => {
        const item = document.createElement('div');
        item.className = 'user';
        const username = document.createElement('div');
        username.className = 'username';
        const inner = document.createElement('div');
        inner.className = 'inner-username';
        inner.innerText = user.username;
        username.appendChild(inner);
        const idUser = document.createElement('input');
        idUser.value = user._id;
        idUser.className = 'id-user hidden-action';
        const deleteBt = document.createElement('div');
        deleteBt.className = 'delete';
        deleteBt.innerHTML = '<i class="fa-solid fa-trash"></i>'
        item.appendChild(idUser);
        item.appendChild(username);
        item.appendChild(deleteBt)
        document.querySelector('.users-list .all-docs').appendChild(item);
    })
}

const checkAdmin = async () => {
    try {
        const accept = await checkTokenEpx(localStorage.getItem('token'));
        if (accept) {
            const res = await fetch('/admin/check', {
                method: 'GET',
                headers: { 'Content-type': 'application/json', token: localStorage.getItem('token') }
            });
            if (res.status == 200) {
                const data = await res.json();
                const welcome = document.querySelector('.sub-nav .login-text a');
                const welcomeIcon = document.querySelector('.sub-nav .login a');
                welcome.innerText = `Administrator: ${data.admin.username}`;
                document.querySelector('.user-option').classList.remove('login-required');
                document.querySelector('.login .fa-angle-down').classList.remove('hidden-action');
                welcome.classList.remove('hidden-action');
            } else {
                window.location.href = '/access-denied';
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const getAllBook = async () => {
    try {
        const accept = await checkTokenEpx(localStorage.getItem('token'));
        const access = accept;
        if (access) {
            const res = await fetch('admin/books/all', {
                method: 'GET',
                headers: { 'Content-type': 'application/json', token: localStorage.getItem('token') }
            });
            if (res.status == 200) {
                const data = await res.json();
                document.querySelector('.dashboard .books .number-of span').innerText = data.books.length;
                displayBooks(data.books);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const getAllUser = async () => {
    try {
        const accept = await checkTokenEpx(localStorage.getItem('token'));
        if (accept) {
            const res = await fetch('admin/users/all', {
                method: 'GET',
                headers: { 'Content-type': 'application/json', token: localStorage.getItem('token') }
            });
            if (res.status == 200) {
                const data = await res.json();
                document.querySelector('.dashboard .users .number-of span').innerText = data.users.length;
                displayUsers(data.users);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

// Validate
const validateBook = (title, author, genres, price) => {
    let flag = 1;
    price = price.split('$')[0].trim();
    // Tittle
    if (!Validate.required(title)) {
        flag = 0;
        document.querySelector('.book-detail .main-info .title .error-validate').innerText = 'Tittle is required';
        document.querySelector('.book-detail .main-info .title .error-validate').classList.remove('hidden-action');
    } else {
        if (!Validate.minLength(title.length, 5) || !Validate.maxLength(title.length, 100)) {
            flag = 0;
            document.querySelector('.book-detail .main-info .title .error-validate').innerText =
                'Tittle must contain between 5 and 100 characters';
            document.querySelector('.book-detail .main-info .title .error-validate').classList.remove('hidden-action');
        } else {
            document.querySelector('.book-detail .main-info .title .error-validate').classList.add('hidden-action');
        }
    }

    // Author 
    if (!Validate.required(author)) {
        flag = 0;
        document.querySelector('.book-detail .main-info .author .error-validate').innerText = 'Author is required';
        document.querySelector('.book-detail .main-info .author .error-validate').classList.remove('hidden-action');
    } else {
        if (!Validate.minLength(author.length, 6) || !Validate.maxLength(author.length, 50)) {
            flag = 0;
            document.querySelector('.book-detail .main-info .author .error-validate').innerText =
                'Author must contain between 6 and 50 characters';
            document.querySelector('.book-detail .main-info .author .error-validate').classList.remove('hidden-action');
        } else {
            document.querySelector('.book-detail .main-info .author .error-validate').classList.add('hidden-action');
        }
    }

    // Genres
    if (!Validate.required(genres)) {
        flag = 0;
        document.querySelector('.book-detail .main-info .genres .error-validate').innerText =
            'Genres is required and separated by commas';
        document.querySelector('.book-detail .main-info .genres .error-validate').classList.remove('hidden-action');
    } else {
        document.querySelector('.book-detail .main-info .genres .error-validate').classList.add('hidden-action');
    }

    // Price
    if (!Validate.required(price)) {
        flag = 0;
        document.querySelector('.book-detail .main-info .price .error-validate').innerText =
            'Price is required';
        document.querySelector('.book-detail .main-info .price .error-validate').classList.remove('hidden-action');
    } else {
        if (!Validate.isNumber(price)) {
            flag = 0;
            document.querySelector('.book-detail .main-info .price .error-validate').innerText =
                'Price invalid';
            document.querySelector('.book-detail .main-info .price .error-validate').classList.remove('hidden-action');
        } else {
            document.querySelector('.book-detail .main-info .price .error-validate').classList.add('hidden-action');
        }
    }

    return flag;
}

main();