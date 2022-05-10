import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// ----------------Importing Navigation----------------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import AuthGlobal from '../context/store/AuthGlobal';

// ----------------Importing Screens----------------

import {
    Home, Profile, Hospital, Settings
} from '../screens';

// ---------- Importing Component

import CustomDrawer from '../components/CustomDrawer'
import DoctorAbout from '../screens/DocCategory/DoctorAbout';


// ----------------Importing Navigator Components----------------


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    const context = useContext(AuthGlobal)

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false, drawerLabelStyle: { marginLeft: -20, fontFamily: 'Montserrat-Medium', fontSize: 15 },
                drawerActiveBackgroundColor: '#7f00ff',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#7f00ff'
            }}>

            <Drawer.Screen name='Home' component={Home} options={{
                drawerIcon: ({ color, size }) => (
                    <Icon name="md-home" color={color} size={size} />
                )
            }} />

            <Drawer.Screen name='Profile' component={Profile} options={{
                drawerIcon: ({ color, size }) => (
                    <Icon name="person" color={color} size={size} />
                )
            }} />

            {
                context.stateUser.userRole == 'doctors' && <Drawer.Screen name='About' component={DoctorAbout} options={{
                    drawerIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size} />
                    )
                }} />
            }
            
            <Drawer.Screen name='Hospital' component={Hospital} options={{
                drawerIcon: ({ color, size }) => (
                    <FAIcon name="hospital-alt" color={color} size={20} />
                )
            }} />

            <Drawer.Screen name='Settings' component={Settings} options={{
                drawerIcon: ({ color, size }) => (
                    <Icon name="settings" color={color} size={size} />
                )
            }} />
        </Drawer.Navigator>

    );
};

const styles = StyleSheet.create({
    headerContainerStyle: {
        backgroundColor: '#5a62ac',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: 60
    },
    headerTextStyle: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
    }
})

export default DrawerNavigator;