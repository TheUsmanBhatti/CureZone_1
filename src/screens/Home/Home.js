// ==========================================  Importing Libraries  =========================================

import React, { useState, useEffect, useCallback, useContext, useFocusEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';


// ---------------------------  Importing Components

import { DoctorCard, CovidCard, TodayAptCard, NearHospital } from '../../components'

import axios from "axios"
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/store/AuthGlobal';


// ==========================================  Creating a Component  ========================================

const Home = ({ navigation }) => {

    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                navigation.navigate("SignIn Screen")
            }

            console.log(context.stateUser.user.sub);

            AsyncStorage.getItem("jwt")
                .then((res) => {
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.sub}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => setUserProfile(user.data))
                })
                .catch((error) => console.log(error))

            return () => {
                setUserProfile();
            }

        }, [context.stateUser.isAuthenticated]))

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>


                {/* ---------------------------  Greeting Container  */}

                <View style={styles.greetingContainer}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../assets/images/My-Pic.jpg')} style={styles.userImage} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.greetingTime}>Good Evening,</Text>
                        <Text style={styles.userName}>{userProfile ? userProfile.name : ""} 👋</Text>
                    </View>
                </View>


                {/* ---------------------------  Covid Timeline of Current Country  */}

                <View style={styles.categoryContainer}>
                    <Text style={styles.heading}>Covid-19 Timeline</Text>
                    <CovidCard navigation={navigation} />
                </View>


                {/* ---------------------------  User Current Day Appoinments  */}

                <View style={styles.categoryContainer}>
                    <Text style={styles.heading}>Appointment Today</Text>
                    <TodayAptCard navigation={navigation} />
                </View>


                {/* ---------------------------  Top Rated Doctor (Max 5 will show)  */}

                <View style={styles.categoryContainer}>
                    <Text style={styles.heading}>Top Doctors</Text>
                    <View>
                        <DoctorCard navigation={navigation} />
                        <DoctorCard navigation={navigation} />
                        <DoctorCard navigation={navigation} />
                        <DoctorCard navigation={navigation} />
                        <DoctorCard navigation={navigation} />
                    </View>
                </View>


                {/* ---------------------------  Near Hospital by Location of User  */}

                <View style={styles.categoryContainer}>
                    <Text style={styles.heading}>Near Hospitals</Text>
                    <NearHospital />
                </View>

            </View>
        </ScrollView>
    );
}


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    greetingContainer: {
        flexDirection: 'row',
        margin: 10,
        marginTop: 10
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#7f00ff',
        marginRight: 10
    },
    greetingTime: {
        fontSize: 20,
        color: '#7f00ff',
        fontFamily: 'Montserrat-Medium',
    },
    userName: {
        fontSize: 20,
        color: '#7f00ff',
        fontFamily: 'Montserrat-Bold',
    },
    heading: {
        fontSize: 18,
        color: '#7f00ff',
        fontFamily: 'Montserrat-Bold',
        marginBottom: 10
    },
    categoryContainer: {
        margin: 10
    },
})


// ----------------------------  Exporting the App

export default Home;