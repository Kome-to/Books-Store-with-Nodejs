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

export default Validate;