// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { StyleSheet } from 'react-native';


// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';


// ==========================================  Creating a Component  ========================================

const SplashScreen = ({ navigation }) => {


// ---------------------------  After 2 second it will navigate to Login Screen  

    setTimeout(() => navigation.reset({index: 0, routes: [{name: 'SignIn Screen'}]}), 2000)


    return (
        <LinearGradient
            start={{ x: 1, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            colors={['#0fa7ff', '#7f00ff']}
            style={styles.container}>

{/* ---------------------------  Animated Logo   */}

            <Animatable.Image 
                animation='bounceIn'
                duration={1500}
                source={require('../../assets/images/CZ-Splash-Icon.png')}
                style={styles.logo}>
            </Animatable.Image>
            
        </LinearGradient>
    );
};


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '40%',
        resizeMode: 'center'
    }
});


// ----------------------------  Exporting the App

export default SplashScreen;
