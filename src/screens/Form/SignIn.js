// ==========================================  Importing Libraries  =========================================

import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';


// ---------------------------  Importing Libraries and Icons

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import SwitchSelector from "react-native-switch-selector";
import { validate } from 'react-email-validator';
import { showMessage, hideMessage } from "react-native-flash-message";
import { signInAuth } from '../../helpers/formAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/store/AuthGlobal';
import { loginUser } from '../../context/actions/Auth.actions';

// ==========================================  Creating a Component  ========================================

const SignIn = ({ navigation }) => {

    const context = useContext(AuthGlobal)

    const [userRole, setUserRole] = useState('doctors');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        if(context.stateUser.isAuthenticated === true){
            if(context.stateUser.userProfile.isFilled == true){
                // navigation.reset({index: 0, routes: [{name: 'Tab'}]})
                navigation.navigate('Tab')
            }
            else{
                navigation.navigate('Information Screen')
            }   
        }
    }, [context.stateUser.isAuthenticated])

    const handleSignIn = () => {
        const email = userEmail.toLowerCase().trim()
        const password = userPassword.trim()

        if (!signInAuth( email, password)) {
            // console.log(`Role: ${userRole}, Email: ${email}, Password: ${password} `);
            
            const user = {
                email,
                password
            }

            loginUser(userRole, user, context.dispatch)
        }

    }


    return (
        <LinearGradient
            start={{ x: 1, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={['#9e4bff', '#7f00ff']}
            style={styles.container}>

            {/* ---------------------------  Header  */}

            <View style={styles.header}>
                <Text style={styles.textHeader}>Welcome!</Text>
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
                        { label: "Doctor", value: "doctors" },
                        { label: "Patient", value: "users" }
                    ]}
                    fontSize={20}
                    style={{ width: 300, alignItem: 'center' }}
                    initial={0}
                    onPress={value => setUserRole(value)}
                />
            </View>
            {/* ---------------------------  SignIn Form  */}
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


                {/* ---------------------------  Forget Password Button  */}

                <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
                    <Text style={{ color: '#9e4bff', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>


                {/* ---------------------------  SignIn Button  */}

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => handleSignIn()}>
                        <LinearGradient
                            colors={['#9e4bff', '#7f00ff']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* ---------------------------  SignUp Button  */}

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('SignUp Screen')
                        }
                        style={[styles.signIn, {
                            borderColor: '#7f00ff',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#7f00ff'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </Animatable.View>
        </LinearGradient>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.7,
        justifyContent: 'flex-end',
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
    signIn: {
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

export default SignIn;