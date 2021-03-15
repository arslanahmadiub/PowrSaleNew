export default class verifications {


    static verifyEmail(email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            .test(email)
    }

    static verifyPhone(phoneNumber) {
        return /^\d{10}|d{9}$/.test(phoneNumber)
    }

    static verifyPassword(password) {
        return /^[a-zA-Z0-9!@#$%^&*]{7,15}$/
            .test(password)
    }
}