import { Platform } from "react-native";

let baseURL = '';

{
    Platform.OS == 'android' ?
        baseURL = 'http://192.168.43.72:3000/api/v1/' :
        baseURL = 'http://localhost:3000/api/v1/'
}

export default baseURL;