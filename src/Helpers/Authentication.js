import authConfig from "../contexts/authConfig"

export default class Authentication {
    constructor(authObject) {
        // strictly pass an object
        this.email = authObject.email;
        this.password = authObject.password;
        this.phone = authObject.phone;
    }

    /////////////////////////////////////////////////
    //  THE CLASS AUTOMATICALLY HAS ACCESS TO...     ||
    //  this.email, this.password, this.phone        ||
    //  USE THEM TO PERFORM ALL AUTHENTICATION       ||
    ////////////////////////////////////////////////

    #signUpWithEmailAndPassword = function () {

        // PERFORM YOUR SIGN UP LOGIC HERE
        // THEN RETURN THE USER OBJECT
        return authConfig();

    }

    #signUpWithPhoneAndPassword = function () {

        // PERFORM YOUR SIGN UP LOGIC HERE
        // THEN RETURN THE USER OBJECT
        return authConfig();
    }

    #signInWithEmailAndPassword = function () {
        // PERFORM YOUR SIGN IN HERE AND RETURN
        // THE USER OBJECT

        return authConfig();
    }




    #signInWitPhoneAndPassword = function () {
        // PERFORM YOUR SIGN IN HERE AND RETURN
        // THE USER OBJECT

        return authConfig();
    }

    updatePassword = function () {
        // PAYLOAD REPRESENTS ANY EXTRA DATA NEEDED BY YOU BACKEND
        // YOU MAY RESTRUCTURE THIS
        // BACKEND REQUIREMENTS
        return true; // whaatever your backend returns
    }

    #signInWithGoogle = function () {
        // use the google sdk here
        // return the user object

        return authConfig();
    }

    #signInWithFacebook = function () {
        // use the facebook sdk here
        // return the user object
        return authConfig();
    }

    static updateProfilePhoto = function (file, user, callback) {
        // file: File
        // user: object
        // callback: Function
        // call your api endoint here and pass it the
        // profile file to send.
        // the user object will contain the user's current profile
        // information. This is useful if you want to use some
        // information as meta data for the file.
        // when done, call the callback function with no arguments.
        // this will refresh the user to match the updated user object
        // 

    }

    static updateProfileInfo = function (newUserObject, callback) {
        // send the data to the backend
        // then call the callback function with no arguments.
    }

    static logout = function (callback) {

        // IF YORU LOGOUT PROCESS NEEDS EXTRA STEPS
        // DO THEM HERE THEN EXECUTE THE CALL BACK
        // FUNCTION AT THE END LIKE SO...

        callback();
    }


    signIn = function (type) {

        switch (type.toLowerCase()) {
            case 'phone':
                return this.#signInWitPhoneAndPassword();
            case 'email':
                return this.#signInWithEmailAndPassword();
            case 'google':
                return this.#signInWithGoogle();
            case 'facebook':
                return this.#signInWithFacebook();
            default:
                return;
        }
    }
    signUp = function (type) {

        switch (type.toLowerCase()) {
            case 'phone':
                return this.#signUpWithPhoneAndPassword();
            case 'email':
                return this.#signUpWithEmailAndPassword();
            case 'google':
                return this.signInWithGoogle();
            case 'facebook':
                return this.signInWithFacebook();
            default:
                return;
        }
    }


}

