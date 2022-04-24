//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

// create a component
const PrescriptionDetail = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/Back.png')} style={{ width: 10, height: 25, resizeMode: 'center', marginHorizontal: 20, marginVertical: 12 }} tintColor='#fff' />
                </TouchableOpacity>

                <Text style={styles.headerText}>Prescription Detail</Text>
            </View>

            <View style={styles.doctorContainer}>
                <Image source={require('../../assets/images/My-Pic.jpg')} style={styles.doctorImage} />
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={styles.doctorName}>Dr. Muhammad Usman Bhatti</Text>
                    <Text style={styles.doctorSpeciality}>Eye Specialist</Text>
                </View>
            </View>

            <View style={styles.categoryContainer}>
                <Text style={styles.heading}>Medicines</Text>

                <Medicine />
                <Medicine />
            </View>


            <View style={styles.categoryContainer}>
                <Text style={styles.heading}>Advises</Text>

                <Advise/>
                <Advise/>
                <Advise/>
            </View>
        </ScrollView>
    );
};


const Medicine = () => {
    return (
        <View style={{
            borderRadius: 15,
            paddingHorizontal: 20,
            marginVertical: 10,
            backgroundColor: '#fff',
            elevation: 8
        }}>
            <Text style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 20,
                color: '#2e409a',
                paddingVertical: 10,
                textAlign: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#2e409a'
            }}>Panadol</Text>
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                <View style={{
                    width: '50%'
                }}>
                    <Text style={styles.medicineInfoHeading}>Strength</Text>
                    <Text style={styles.medicineInfoHeading}>Dosage</Text>
                    <Text style={styles.medicineInfoHeading}>Duration</Text>
                    <Text style={styles.medicineInfoHeading}>Instruction</Text>
                </View>
                <View>
                    <Text style={styles.medicineInfoText}>200 mg</Text>
                    <Text style={styles.medicineInfoText}>1 - 1 - 1</Text>
                    <Text style={styles.medicineInfoText}>1 Week</Text>
                    <Text style={styles.medicineInfoText}>After Meal</Text>
                </View>
            </View>
        </View>
    )
}

const Advise = () => {
    return (
        <View style={{
            borderRadius: 15,
            paddingHorizontal: 20,
            marginVertical: 10,
            backgroundColor: '#fff',
            elevation: 5
        }}>

            <Text style={styles.medicineInfoText}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut </Text>

        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#5a62ac',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    headerText: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        marginVertical: 12
    },
    heading: {
        fontSize: 18,
        color: '#2e409a',
        fontFamily: 'Montserrat-Bold',
        marginBottom: 10
    },
    doctorContainer: {
        flexDirection: 'row',
        margin: 20
    },
    doctorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    doctorName: {
        fontSize: 16,
        color: '#2e409a',
        fontFamily: 'Montserrat-SemiBold',
    },
    doctorSpeciality: {
        fontSize: 15,
        color: '#2e409a',
        fontFamily: 'Montserrat-Regular',
    },
    categoryContainer: {
        marginHorizontal: 20,
        marginBottom: 10
    },
    medicineInfoHeading: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: '#2e409a',
        paddingVertical: 5
    },
    medicineInfoText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: '#2e409a',
        paddingVertical: 5
    }
});

//make this component available to the app
export default PrescriptionDetail;
