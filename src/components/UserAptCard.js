// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


// ---------------------------  Importing Icons

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// ==========================================  Creating a Component  ========================================

const UserAptCard = () => {
    return (
        <View style={styles.container}>


{/* ---------------------------  Doctor Image, Name and Speciality Container  */}

            <View style={styles.doctorContainer}>
                <Image source={require('../assets/images/My-Pic.jpg')} style={styles.doctorImage} />
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.doctorName}>Dr. Muhammad Usman Bhatti</Text>
                    <Text style={styles.doctorSpeciality}>Eye Specialist</Text>
                </View>
            </View>


{/* ---------------------------  Appointment Time and Date of Consultation  */}

            <View style={{backgroundColor: '#d4ddf4', borderRadius: 10, marginBottom: 10}}>
                <View style={styles.timeContainer}>
                    <Icon name="calendar-month" color="#5a62ac" size={20}></Icon>
                    <Text style={styles.dateAndTime}>Wednesday, Mar 22</Text>
                </View>

                <View style={styles.timeContainer}>
                    <Icon name="clock-outline" color="#5a62ac" size={20}></Icon>
                    <Text style={styles.dateAndTime}>11:00 - 12:25 AM</Text>
                </View>
            </View>


{/* ---------------------------  Button to Cancel or Reschedule the Appointment  */}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.btnDesign, {backgroundColor: '#fff'}]}>
                    <Text style={[styles.btnText, {color: '#5a62ac'}]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btnDesign, {backgroundColor: '#5a62ac'}]}>
                    <Text style={[styles.btnText, {color: '#fff'}]}>ReSchedule</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        elevation: 2
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
        color: '#5a62ac',
        fontFamily: 'Montserrat-SemiBold',
    },
    doctorSpeciality: {
        fontSize: 15,
        color: '#5a62ac',
        fontFamily: 'Montserrat-Light',
    },
    timeContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    dateAndTime: {
        marginLeft: 10,
        color: '#5a62ac',
        fontFamily: 'Montserrat-Light',
        fontSize: 16
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnDesign:{
        borderWidth: 2,
        width: '48%',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#d4ddf4'
    },
    btnText:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        padding: 10
    }
})


// ----------------------------  Exporting the App

export default UserAptCard;