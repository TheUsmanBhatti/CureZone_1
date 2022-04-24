// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';


// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

// ==========================================  Creating a Component  ========================================

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.inputHeading}>Enter Your Old Password</Text>
            <TextInput placeholder='Old Password' style={styles.inputForm}/>

            <Text style={styles.inputHeading}>New Password</Text>
            <TextInput placeholder='Password' style={styles.inputForm}/>

            <Text style={styles.inputHeading}>Confirm New Password</Text>
            <TextInput placeholder='Confirm Password' style={styles.inputForm}/>
        </View>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    inputForm : {
        borderWidth: 1, 
        borderRadius: 10, 
        marginBottom: 20
    },
    inputHeading : {
        fontSize: 17,
        color: 'blue'
    }
});


// ----------------------------  Exporting the App

export default Settings;