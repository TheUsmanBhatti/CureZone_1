// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';


// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

// ==========================================  Creating a Component  ========================================

const NewPassword = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/PasswordChange.jpg')} style={{width: 170, height: 170, resizeMode: 'center'}} />

            <Text style={{color: 'blue', fontFamily: 'Montserrat-SemiBold', fontSize: 18, textAlign: 'center', marginTop: 10}}>Your Password Changed Successfully</Text>
            <Text style={{color: 'blue', fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center'}}>We have sent New Password to your Email</Text>

            <TouchableOpacity 
            onPress={() => navigation.reset({index: 0, routes: [{name: 'SignIn Screen'}]})}
            style={{padding: 10, backgroundColor: 'blue', width: 130, marginTop: 10, borderRadius: 50}}>
                <Text style={{color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 18, textAlign: 'center'}}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff'
    }
});


// ----------------------------  Exporting the App

export default NewPassword;