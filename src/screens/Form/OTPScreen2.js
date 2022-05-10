import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Keyboard, Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const Otp = ({ navigation, route }) => {

    const { userRole, userId } = route.params;

    const [userOtp, setUserOtp] = useState('');

    const handleOtp = () => {
        const otp = userOtp.trim();
        if (otp == '') {
            return (
                showMessage({
                    message: "Please enter your OTP",
                    backgroundColor: '#7f00ff'
                })
            )
        }

        if (!otp.match(/^[0-9]+$/)) {
            return (
                showMessage({
                    message: "Please enter valid OTP",
                    backgroundColor: '#7f00ff'
                })
            )
        }

        if (otp.length < 4) {
            return (
                showMessage({
                    message: "Please enter valid OTP",
                    backgroundColor: '#7f00ff'
                })
            )
        }

        console.log(otp, userId);

        const sendRequest = async () => {
            try {

                const res = await axios.post(`${baseURL}${userRole}/forgotpassword/verifyotp`, {
                    ownerId: userId,
                    otp: otp
                })
                if (res.data) {
                    navigation.reset({index: 0, routes: [{name: 'New Password'}]})
                }
                console.log(res.data)
            } catch (error) {
                // console.log(error.response.data.message)
                showMessage({
                    message: error.response.data.message,
                    backgroundColor: '#7f00ff'
                })
            }
        }

        sendRequest()
    }

    return (
        <LinearGradient
            start={{ x: 1, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={['#9e4bff', '#7f00ff']}
            style={styles.container}>

            {/* ---------------------------  Header  */}

            <View style={styles.header}>
                <Text style={styles.textHeader}>OTP</Text>
                <Text style={{ color: '#fff' }}>Please enter the OTP sent to your e-mail</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig" style={styles.footer}>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    maxLength={4}
                    placeholder={'0000'}
                    placeholderTextColor='#6ba4ff'
                    value={userOtp}
                    onChangeText={setUserOtp}
                />
                <TouchableOpacity style={styles.submitIcon} onPress={() => handleOtp()}>
                    <Icon name="checkmark-outline" color='#fff' size={34} />
                </TouchableOpacity>
            </Animatable.View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        // fontFamily: 'Montserrat-SemiBold'
    },
    input: {
        backgroundColor: '#d8b7fe',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 20,
        fontSize: 25,
        textAlign: 'center',
        width: 200,
        // paddingHorizontal: 15,
        letterSpacing: 20,
        color: '#7b54f2'
    },
    submitIcon: {
        alignSelf: 'center',
        padding: 15,
        backgroundColor: '#7b54f2',
        borderRadius: 50,
        marginTop: 15,
    }
})

export default Otp;