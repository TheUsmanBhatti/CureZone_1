// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


// ---------------------------  Importing Icon and Linear Gradient Libraries

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// ==========================================  Creating a Component  ========================================

const TodayAptCard = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
            <LinearGradient
                start={{ x: 1, y: 0.3 }}
                end={{ x: 0, y: 1 }}
                colors={['#9e4bff', '#7f00ff']}
                style={styles.container}>


{/* ---------------------------  Doctor Image, Name and Speciality Container  */}

            <View style={styles.doctorContainer}>
                <Image source={require('../assets/images/My-Pic.jpg')} style={styles.doctorImage} />
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.doctorName}>Dr. Muhammad Usman Bhatti</Text>
                    <Text style={styles.doctorSpeciality}>Eye Specialist</Text>
                </View>
            </View>


{/* ---------------------------  Appointment Time of Current Day Consultation  */}

            <View style={styles.timeContainer}>
                <Icon name="clock-outline" color="#fff" size={20}></Icon>
                <Text style={styles.time}>11:00 - 12:25 AM</Text>
            </View>

            </LinearGradient>
        </TouchableOpacity>
    );
};


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        padding: 10,
    },
    doctorContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    doctorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    doctorName: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
    },
    doctorSpeciality: {
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Montserrat-Light',
    },
    timeContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#9e4bff',
        borderRadius: 10
    },
    time: {
        marginLeft: 10, 
        color: '#fff', 
        fontFamily: 'Montserrat-Light', 
        fontSize: 16
    }
})


// ----------------------------  Exporting the App

export default TodayAptCard;