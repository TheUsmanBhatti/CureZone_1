//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';


import { DoctorCard } from '../../components';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl";
import AuthGlobal from '../../context/store/AuthGlobal';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


// create a component
const BookAppointment = ({ navigation, route }) => {

    const item = route.params

    const d = new Date();
    const curDate = d.getDate();
    const curMonth = d.getMonth()+1;
    const curYear = d.getFullYear();

    const context = useContext(AuthGlobal)


    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [docApts, setDocApts] = useState()
    const [aptResponse, setAptResponse] = useState()
    const [selectedDate, setSelectedDate] = useState(`${curYear}-${curMonth}-${curDate}`);

    const [aSlot, setASlot] = useState();



    const handleApt = async () => {
        if (aSlot != undefined) {

            const dateOfApt = selectedDate + ' ' + aSlot;

            const data = {
                user: context.stateUser.user.userId,
                doctor: item._id,
                dateOfApt: dateOfApt,
                slotOfApt: aSlot
            }

            console.log(data);

            AsyncStorage.getItem("jwt")
                .then(async (jwtToken) => {
                    try {
                        const resp = await axios.post(`${baseURL}appointments`,
                            data,
                            {
                                headers: { Authorization: `Bearer ${jwtToken}` }
                            });
                        setAptResponse(resp.data);
                    }
                    catch (error) {
                        console.log(error.response.data)
                    }
                })

        

        }
    }


    

    return (
        <>
            <ScrollView style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/Back.png')} style={{ width: 10, height: 25, resizeMode: 'center', marginHorizontal: 20, marginVertical: 12 }} tintColor='#fff' />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Book Appoinment</Text>
                </View>

                <View style={{ marginTop: -55, marginHorizontal: 15 }}>
                    <DoctorCard
                        docImage={item.avatar}
                        docName={item.name}
                        docEdu={item.education}
                        docCategory={item.category.name}
                        docRating={item.rating}
                    />
                </View>







                <CalendarList
                    current={`${curYear}-${curMonth}-${curDate}`}

                    minDate={`${curYear}-${curMonth}-${curDate}`}

                    onDayPress={day => {
                        setSelectedDate(day.dateString)
                    }}

                    horizontal={true}

                    // enableSwipeMonths={true}

                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: '#5a62ac' },
                    }}

                    selected={`${curYear}-${curMonth}-${curDate}`}

                    pastScrollRange={1}
                    futureScrollRange={1}

                    theme={{
                        textDayFontFamily: 'Montserrat-Medium',
                        textMonthFontFamily: 'Montserrat-Bold',
                        textDayHeaderFontFamily: 'Montserrat-SemiBold',
                        monthTextColor: '#5a62ac'
                    }}
                />




                <View style={{ margin: 10 }}>
                    <Text style={styles.heading}>Available Slots</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                        {item.meetingSlots.map((item) => <TouchableOpacity
                            key={item}
                            onPress={() => setASlot(item)}
                            style={{ backgroundColor: item == aSlot ? 'green' : 'blue', margin: 5, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 }}>

                            <Text style={{ color: '#fff' }}>{item}</Text>
                        </TouchableOpacity>)}
                    </View>


                </View>

                <TouchableOpacity onPress={() => handleApt()}
                    style={{ backgroundColor: '#5a62ac', alignItems: 'center', borderRadius: 10, margin: 10 }}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: '#fff', paddingVertical: 10 }}>Next</Text>
                </TouchableOpacity>

            </ScrollView>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
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
        // marginTop: -40
    },
});

//make this component available to the app
export default BookAppointment;
