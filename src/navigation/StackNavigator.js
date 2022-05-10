import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

// ----------------Importing Navigation----------------
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

// ----------------Importing Screens----------------

import {
    CovidDetail, DoctorDetail, BookAppointment, TermAndCondition, OTP, NewPassword,
    PrescriptionDetail, SplashScreen, SignIn, SignUp, Information, ForgotPassword, Reviews
} from '../screens';

// ----------------Importing Navigator Components----------------
import TabNavigator from './TabNavigator';

import DrawerNavigator from './DrawerNavigator';
import Doctor2 from '../screens/DocCategory/Doctor2';
import VideoCall from '../screens/Appointment/VideoCall';
import PrescriptionForm from '../screens/Prescription/PrescriptionForm';
import PrescriptionForm2 from '../screens/Prescription/PrescriptionForm2';
import Otp from '../screens/Form/OTPScreen2';
import DoctorAboutForm from '../screens/DocCategory/DoctorAboutForm';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {



    return (
        <NavigationContainer>
            <Stack.Navigator>


                <Stack.Screen name="Splash Screen" component={SplashScreen} options={{
                    headerShown: false
                }} />


                <Stack.Screen name="SignIn Screen" component={SignIn} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />

                <Stack.Screen name="SignUp Screen" component={SignUp} options={{
                    headerShown: false
                }} />


                <Stack.Screen name="CovidDetail" component={CovidDetail} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Doctor Detail" component={DoctorDetail} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Book Appointment" component={BookAppointment} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Prescription Detail" component={PrescriptionDetail} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Terms and Condition" component={TermAndCondition} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="OTP Screen" component={OTP} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Information Screen" component={Information} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="New Password" component={NewPassword} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Doctor2" component={Doctor2} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Video Call" component={VideoCall} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Reviews" component={Reviews} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="PrescriptionForm" component={PrescriptionForm} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="PrescriptionForm2" component={PrescriptionForm2} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="OTP Screen 2" component={Otp} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Doctor About Form" component={DoctorAboutForm} options={{
                    headerShown: false
                }} />



            </Stack.Navigator>
        </NavigationContainer>
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

export default StackNavigator;