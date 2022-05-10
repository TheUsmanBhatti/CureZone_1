//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import Moment from 'moment';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/store/AuthGlobal';

import Icon from 'react-native-vector-icons/Ionicons'
// create a component
const DoctorAbout = ({ navigation }) => {

    const context = useContext(AuthGlobal)

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [userAbout, setUserAbout] = useState()

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((jwtToken) => {
                const getUserData = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}${context.stateUser.userRole}/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        return resp.data;
                    }
                    catch (error) {
                        console.log(error.response.data)
                    }

                }


                const getData = () => {
                    return Promise.all([
                        getUserData(),
                    ]);
                };


                getData().then(
                    ([
                        userData,
                    ]) => {
                        setUserAbout(userData);
                    })
                    .catch(() => {
                        setError(true);
                    })
                    .finally(() => {
                        setLoaded(true);
                    });
            })
            .catch((error) => console.log(error))


        return () => {
            setUserAbout();
            setLoaded();
        }
    }, [])

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            {loaded && !error && (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="md-menu" size={35} color="blue" />
                    </TouchableOpacity>


                    <Text style={styles.heading}>About</Text>
                    <Text style={{ backgroundColor: '#cbbfff', fontFamily: 'Montserrat-Regular', padding: 5, borderRadius: 10, color: 'black' }}>{userAbout.about}</Text>

                    <Text style={styles.heading}>Eductaion</Text>
                    <Text style={{ backgroundColor: '#cbbfff', fontFamily: 'Montserrat-Regular', padding: 5, borderRadius: 10, color: 'black' }}>{userAbout.education}</Text>

                    <Text style={styles.heading}>Category</Text>
                    <Text style={{ backgroundColor: '#cbbfff', fontFamily: 'Montserrat-Regular', padding: 5, borderRadius: 10, color: 'black' }}>{userAbout.category.name}</Text>

                    <Text style={styles.heading}>Consultation Days</Text>
                    <View style={{ backgroundColor: '#cbbfff', padding: 5, borderRadius: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            userAbout.consultationDays.map(item => (
                                <Text key={item} style={{ backgroundColor: 'blue', color: '#fff', padding: 5, borderRadius: 5, fontFamily: 'Montserrat-Regular', width: 70, margin: 5, textAlign: 'center' }}>{item}</Text>
                            ))
                        }
                    </View>

                    <Text style={styles.heading}>Consultation Time</Text>
                    <Text style={{ backgroundColor: '#cbbfff', fontFamily: 'Montserrat-Regular', padding: 5, borderRadius: 10, color: 'black' }}>{`${Moment(userAbout.consultationTime[0]).format("hh:mm A")} - ${Moment(userAbout.consultationTime[1]).format("hh:mm A")}`}</Text>

                    <Text style={styles.heading}>Appointment Slots</Text>
                    <View style={{ backgroundColor: '#cbbfff', padding: 5, borderRadius: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            userAbout.meetingSlots.map(item => (
                                <Text key={item} style={{ backgroundColor: 'blue', color: '#fff', padding: 5, borderRadius: 5, fontFamily: 'Montserrat-Regular', width: 90, margin: 5, textAlign: 'center' }}>{item}</Text>
                            ))
                        }
                    </View>


                    <Text style={styles.heading}>Fee</Text>
                    <Text style={{ backgroundColor: '#cbbfff', fontFamily: 'Montserrat-Regular', padding: 5, borderRadius: 10, color: 'black' }}>Rs {userAbout.fee}</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Doctor About Form', userAbout)}
                        style={{ backgroundColor: '#7b54f2', padding: 10, alignItems: 'center', borderRadius: 10, marginTop: 10 }}>
                        <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 16 }}>Edit</Text>
                    </TouchableOpacity>

                </View>
            )}

            {!loaded && <ActivityIndicator size='large' color='#dea838' />}
            {error && <Error />}
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    heading: {
        fontSize: 18,
        color: '#7f00ff',
        fontFamily: 'Montserrat-Bold',
        marginBottom: 5,
        marginTop: 10
    },
});

//make this component available to the app
export default DoctorAbout;
