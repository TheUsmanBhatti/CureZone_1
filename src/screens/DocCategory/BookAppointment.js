//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';

import { DoctorCard } from '../../components';


import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


// create a component
const BookAppointment = ({ navigation }) => {

    const d = new Date();
    const curDate = d.getDate();
    const curMonth = d.getMonth();
    const curYear = d.getFullYear();

    const [selectedDate, setSelectedDate] = useState(`${curYear}-${curMonth}-${curDate}`);

    const [aSlot, setASlot] = useState();

    const availableSlots = ['10:00', '11:00', '12:00', '02:00', '03:00', '03:30', '04:00', '04:30', '05:00']


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/Back.png')} style={{ width: 10, height: 25, resizeMode: 'center', marginHorizontal: 20, marginVertical: 12 }} tintColor='#fff' />
                </TouchableOpacity>

                <Text style={styles.headerText}>Book Appoinment</Text>
            </View>

            <View style={{ marginTop: -55, marginHorizontal: 15 }}>
                <DoctorCard />
            </View>







            <CalendarList
                current={`${curYear}-${curMonth}-${curDate}`}

                minDate={`${curYear}-${curMonth + 1}-${curDate}`}

                onDayPress={day => {
                    setSelectedDate(day.dateString)
                }}

                horizontal={true}

                // enableSwipeMonths={true}

                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#5a62ac' },
                }}

                selected={`${curYear}-${curMonth + 1}-${curDate}`}

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

                <View style={{flexDirection: 'row', justifyContent: 'center',flexWrap: 'wrap'}}>
                    {availableSlots.map((item) => <TouchableOpacity 
                    key={item} 
                    onPress={() => setASlot(item)}
                    style={{ backgroundColor: item == aSlot ? 'green' : 'blue', margin: 5, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 }}>

                        <Text style={{ color: '#fff' }}>{item}</Text>
                    </TouchableOpacity>)}
                </View>


            </View>

            <TouchableOpacity style={{ backgroundColor: '#5a62ac', alignItems: 'center', borderRadius: 10, margin: 10 }}>
                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: '#fff', paddingVertical: 10 }}>Next</Text>
            </TouchableOpacity>


        </ScrollView>
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
