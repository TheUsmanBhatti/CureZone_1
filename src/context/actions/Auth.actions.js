import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { showMessage, hideMessage } from "react-native-flash-message";
import baseURL from "../../assets/common/baseUrl"

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/signin`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {

                if (data.message != 'Wrong Password' && data.message != 'User Not Found') {
                    const token = data.token;
                    AsyncStorage.setItem("jwt", token)
                    const decoded = jwt_decode(token)
                    dispatch(setCurrentUser(decoded, user))
                }
                else {
                    showMessage({
                        message: data.message,
                        backgroundColor: '#7f00ff'
                    })
                }
            }
            else {
                logoutUser(dispatch)
            }
        })
        .catch((err) => {
            showMessage({
                message: "Please fill correct Credential",
                backgroundColor: '#7f00ff'
            })
            logoutUser(dispatch)
        });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {

    AsyncStorage.removeItem('jwt');
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}