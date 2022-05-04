import React, { Component, useState } from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import FlashMessage from "react-native-flash-message";

import Auth from './src/context/store/Auth';

// ----------------Importing Navigator Components----------------
import StackNavigator from './src/navigation/StackNavigator';
import MapViewScreen from './src/screens/Maps';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
    
    return (
        <Auth>
            <StackNavigator />
            <FlashMessage position="top" />
        </Auth>
     
    );
};

const styles = StyleSheet.create({

})

export default App;