// ==========================================  Importing Libraries  =========================================

import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';


// ---------------------------  Importing Libraries and Icons

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SwitchSelector from "react-native-switch-selector";
import { validate } from 'react-email-validator';
import { showMessage, hideMessage } from "react-native-flash-message";
import { signUpAuth } from '../../helpers/formAuth';

// ==========================================  Creating a Component  ========================================

const SignUp = ({ navigation }) => {

    const [userRole, setUserRole] = useState('doctor');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSignUp = () => {
        const email = userEmail.trim()
        const password = userPassword.trim()
        const confirmPassword = userConfirmPassword.trim()

        if (!signUpAuth(email, password, confirmPassword)) {
            console.log(`Role: ${userRole}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword} `);
            navigation.navigate('OTP Screen')
        }

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
            start={{ x: 1, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={['#9e4bff', '#7f00ff']}
            style={styles.container}>

            {/* ---------------------------  Header  */}

            <View style={styles.header}>
                <Text style={styles.textHeader}>Register!</Text>
            </View>

            <View style={{ width: '100%', height: 70, alignItems: 'center', justifyContent: 'center' }}>
                <SwitchSelector
                    textColor={'#d8b7fe'}
                    selectedColor={"#fff"}
                    buttonColor={'#7b54f2'}
                    borderColor={'#7b54f2'}
                    animationDuration={300}
                    height={45}
                    textStyle={{ fontFamily: 'Montserrat-Medium' }}
                    selectedTextStyle={{ fontFamily: 'Montserrat-Medium' }}
                    hasPadding
                    options={[
                        { label: "Doctor", value: "doctor" },
                        { label: "Patient", value: "patient" }
                    ]}
                    fontSize={20}
                    style={{ width: 300, alignItem: 'center' }}
                    initial={0}
                    onPress={value => setUserRole(value)}
                />
            </View>
            {/* ---------------------------  SignUp Form  */}

            <Animatable.View
                animation="fadeInUpBig" style={styles.footer}>

                {/* ---------------------------  Email Input  */}

                <Text style={styles.textFooter}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name='user-o' color='#7f00ff' size={20} />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor={'#d8b7fe'}
                        style={styles.textInput}
                        autoCapitalize='none'
                        value={userEmail}
                        onChangeText={setUserEmail}
                    ></TextInput>
                    {
                        validate(userEmail) ? <Feather name='check-circle' color='#7f00ff' size={20} />
                        : null
                    }
                </View>


                {/* ---------------------------  Password Input  */}

                <Text style={[styles.textFooter, { marginTop: 20 }]}>Password</Text>
                <View style={styles.action}>
                    <Feather name='lock' color='#7f00ff' size={20} />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor={'#d8b7fe'}
                        secureTextEntry={!showPassword}
                        style={styles.textInput}
                        autoCapitalize='none'
                        value={userPassword}
                        onChangeText={setUserPassword}
                    ></TextInput>

                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Feather name= {showPassword ? 'eye' : 'eye-off'} color='#7f00ff' size={20} />
                    </TouchableOpacity>
                </View>


                {/* ---------------------------  Confirm Password Input  */}

                <Text style={[styles.textFooter, { marginTop: 20 }]}>Confirm Password</Text>
                <View style={styles.action}>
                    <Feather name='lock' color='#7f00ff' size={20} />
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor={'#d8b7fe'}
                        secureTextEntry={!showConfirmPassword}
                        style={styles.textInput}
                        autoCapitalize='none'
                        value={userConfirmPassword}
                        onChangeText={setUserConfirmPassword}
                    ></TextInput>

                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Feather name= {showConfirmPassword ? 'eye' : 'eye-off'} color='#7f00ff' size={20} />
                    </TouchableOpacity>
                </View>


                {/* ---------------------------  Term and Privacy Button  */}

                <View style={{ marginTop: 15, flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text style={{ color: '#9e4bff' }}>By signing up you agree to our</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Terms and Condition')}>
                        <Text style={{ color: '#9e4bff', fontWeight: 'bold' }}> Terms of Services </Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#9e4bff' }}>and</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Terms and Condition')}>
                        <Text style={{ color: '#9e4bff', fontWeight: 'bold' }}> Privacy policy</Text>
                    </TouchableOpacity>
                </View>


                {/* ---------------------------  SignUp Button  */}

                <View>
                    <TouchableOpacity
                        style={styles.SignUp}
                        onPress={() => handleSignUp()}>
                        <LinearGradient
                            colors={['#9e4bff', '#7f00ff']}
                            style={styles.SignUp}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* ---------------------------  SignIn Button  */}

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn Screen')}
                        style={[styles.SignUp, {
                            borderColor: '#7f00ff',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#7f00ff'
                        }]}>Sign In</Text>
                    </TouchableOpacity>

                </View>
            </Animatable.View>
        </LinearGradient>
        </ScrollView>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        // flex: 1,
        justifyContent: 'flex-end',
        paddingTop: 10,
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
    textFooter: {
        color: '#7f00ff',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#d8b7fe',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        marginTop: -5,
        padding: 0,
        paddingLeft: 10,
        color: '#05375a',
    },
    SignUp: {
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})


// ----------------------------  Exporting the App

export default SignUp;