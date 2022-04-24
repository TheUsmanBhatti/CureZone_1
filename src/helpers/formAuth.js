import { validate } from 'react-email-validator';
import { showMessage, hideMessage } from "react-native-flash-message";

const signInAuth = (email, password) => {

    if (email == '' && password == '') {
        showMessage({
            message: "Please enter Email and Password",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (email == '') {
        showMessage({
            message: "Please enter your Email",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (!validate(email)) {
        showMessage({
            message: "Please enter valid Email",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (password == '') {
        showMessage({
            message: "Please enter your Password",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    return false;
}

const signUpAuth = (email, password, confirmPassword) => {

    if (email == '' && password == '' && confirmPassword == '') {
        showMessage({
            message: "Please fill the details",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (email == '' && password == '') {
        showMessage({
            message: "Please enter Email and Password",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (email == '') {
        showMessage({
            message: "Please enter your Email",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (!validate(email)) {
        showMessage({
            message: "Please enter valid Email",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (password == '') {
        showMessage({
            message: "Please enter your Password",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (password.length < 8) {
        showMessage({
            message: "Password length must be greater than 8",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (confirmPassword == '') {
        showMessage({
            message: "Please confirm your Password",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    if (password !== confirmPassword) {
        showMessage({
            message: "Password not Match",
            backgroundColor: '#7f00ff'
        })
        return true
    }

    return false;
}

module.exports = {signInAuth, signUpAuth}