// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// ==========================================  Creating a Component  ========================================

const ForgotPassord = ({navigation}) => {
    return (
        <LinearGradient
            start={{ x: 1, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={['#9e4bff', '#7f00ff']}
            style={styles.container}>

            {/* ---------------------------  Header  */}

            <View style={styles.header}>
                <Text style={styles.textHeader}>Forgot Password</Text>
                <Text style={{ color: '#fff' }}>Please enter the e-mail of your account.</Text>
            </View>

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
                    ></TextInput>
                    <Feather name='check-circle' color='#7f00ff' size={20} />
                </View>

                <TouchableOpacity
                    style={styles.nextbtn}
                    onPress={() => navigation.navigate('New Password')}>
                    <LinearGradient
                        colors={['#9e4bff', '#7f00ff']}
                        style={styles.nextbtn}
                    >
                        <Text style={[styles.emailTxt, {
                            color: '#fff'
                        }]}>Next</Text>
                    </LinearGradient>
                </TouchableOpacity>

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
    nextbtn: {
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    emailTxt: {
        fontSize: 18,
        fontWeight: 'bold'
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
});


// ----------------------------  Exporting the App

export default ForgotPassord;