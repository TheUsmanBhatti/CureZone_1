//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

import { DoctorCard, PatientReviews } from '../../components';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// create a component
const DoctorDetail = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/Back.png')} style={{ width: 10, height: 25, resizeMode: 'center', marginHorizontal: 20, marginVertical: 12 }} tintColor='#fff' />
                </TouchableOpacity>

                <Text style={styles.headerText}>Doctor Detail</Text>
            </View>

            <View style={{ marginTop: -55, marginHorizontal: 15 }}>
                <DoctorCard />
            </View>

            <View style={{margin: 10}}>
                <Text style={styles.heading}>About Doctor</Text>
                <Text style={styles.aboutDoc} numberOfLines={4} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
            </View>

            <View style={{margin: 10}}>
                <Text style={styles.heading}>Book Video Consultation</Text>
                <View style={{marginTop: -7}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#c9b5bb', borderBottomWidth: 1, paddingVertical: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name='credit-card-outline' size={20} color='#a0878d' />
                            <Text style={{fontFamily: 'Montserrat-Medium', paddingLeft: 5, color:'#a0878d'}}>Fee:</Text>
                        </View>
                        <Text style={{fontFamily: 'Montserrat-Medium', color:'#a0878d'}}>Rs 1000</Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#c9b5bb', borderBottomWidth: 1, paddingVertical: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name='weather-sunny' size={20} color='#a0878d' />
                            <Text style={{fontFamily: 'Montserrat-Medium', paddingLeft: 5, color:'#a0878d'}}>Days</Text>
                        </View>
                        <Text style={{fontFamily: 'Montserrat-Medium', color:'#a0878d'}}>Mon, Tue, Wed, Thu, Fri, Sat</Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#c9b5bb', borderBottomWidth: 1, paddingVertical: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name='clock-outline' size={20} color='#a0878d' />
                            <Text style={{fontFamily: 'Montserrat-Medium', paddingLeft: 5, color:'#a0878d'}}>Time:</Text>
                        </View>
                        <Text style={{fontFamily: 'Montserrat-Medium', color:'#a0878d'}}>10:00 AM - 01:00 PM</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Book Appointment')} style={{backgroundColor: '#5a62ac', alignItems:'center', borderRadius: 10, marginTop: 10}}>
                        <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: '#fff', paddingVertical: 10}}>Book Appoinment</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{margin: 10}}>
                <Text style={styles.heading}>Patient Reviews</Text>
                <PatientReviews/>
                <PatientReviews/>
                <PatientReviews/>
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#5a62ac',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        height: 105
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
    aboutDoc:{
        fontFamily: 'Montserrat-Medium',
        color: '#a0878d', 
        marginTop: -10
    }
});

//make this component available to the app
export default DoctorDetail;
