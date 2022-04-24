// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { StyleSheet } from 'react-native';


// ---------------------------  Importing Animateable and Linear Gradient Libraries

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

// ==========================================  Creating a Component  ========================================

const VideoConsultation = () => {
    return (
        <LinearGradient></LinearGradient>
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

export default VideoConsultation;