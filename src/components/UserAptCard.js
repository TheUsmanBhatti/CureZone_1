// ==========================================  Importing Libraries  =========================================

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


// ---------------------------  Importing Icons

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// ==========================================  Creating a Component  ========================================

const UserAptCard = (props) => {

    const { navigation } = props;

    return (
        <View style={styles.container}>


            {/* ---------------------------  Doctor Image, Name and Speciality Container  */}

            <View style={styles.doctorContainer}>
                <Image source={{ uri: props.docImage ? props.docImage : 'https://i.pinimg.com/564x/2d/4a/33/2d4a33f892bd525361c668dafb625dec.jpg' }} style={styles.doctorImage} />
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.doctorName}>{props.docName}</Text>
                    <Text style={styles.doctorSpeciality}>{props.docCategory.name}</Text>
                </View>
            </View>


            {/* ---------------------------  Appointment Time and Date of Consultation  */}

            <View style={{ backgroundColor: '#d4ddf4', borderRadius: 10, marginBottom: 10 }}>
                <View style={styles.timeContainer}>
                    <Icon name="calendar-month" color="#5a62ac" size={20}></Icon>
                    <Text style={styles.dateAndTime}>{props.AptDate}</Text>
                </View>

                <View style={styles.timeContainer}>
                    <Icon name="clock-outline" color="#5a62ac" size={20}></Icon>
                    <Text style={styles.dateAndTime}>{props.AptSlot}</Text>
                </View>
            </View>


            {/* ---------------------------  Button to Cancel or Reschedule the Appointment  */}

            {props.ButtonEnable && <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.btnDesign, { backgroundColor: '#5a62ac' }]} onPress={() => navigation.navigate('Video Call', props.Item)}>
                    <Text style={[styles.btnText, { color: '#fff' }]}>Start Consultation</Text>
                </TouchableOpacity>
            </View>

            }


        </View>
    );
};


// ==========================================  Styling  ====================================================

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginVertical: 5
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnDesign: {
        borderWidth: 2,
        width: '100%',
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#d4ddf4'
    },
    btnText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        padding: 10
    }
})


// ----------------------------  Exporting the App

export default UserAptCard;