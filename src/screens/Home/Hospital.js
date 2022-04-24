// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { Text, StyleSheet } from 'react-native';


// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

// ==========================================  Creating a Component  ========================================

const Hospital = () => {
    return (
        <Text>Near Hospital</Text>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


// ----------------------------  Exporting the App

export default Hospital;