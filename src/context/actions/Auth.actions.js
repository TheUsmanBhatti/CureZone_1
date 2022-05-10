import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { showMessage, hideMessage } from "react-native-flash-message";
import baseURL from "../../assets/common/baseUrl"

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (userRole, user, dispatch) => {

    fetch(`${baseURL}${userRole}/signin`, {
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

                if (data.message != 'Wrong Password' && data.message != 'User Not Found' && data.message != 'Doctor Not Found') {
                    const token = data.token;
                    AsyncStorage.setItem("jwt", token)
                    const decoded = jwt_decode(token)
                    dispatch(setCurrentUser(userRole, decoded, data))
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
                message: "Please connect to the Internet",
                backgroundColor: '#7f00ff'
            })
            console.log(err);
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

export const logoutUser = async (dispatch) => {

    await AsyncStorage.removeItem('jwt');
    dispatch(setCurrentUser())
}

export const setCurrentUser = (userRole, decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        userRole: userRole,
        payload: decoded,
        userProfile: user
    }
}