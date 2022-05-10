import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, Image } from 'react-native';

import { UserAptCard } from '../../components'
import Moment from 'moment';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl";

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from '../../context/store/AuthGlobal';

const height = Dimensions.get('window').height;

const Data = [
    {
        id: 1,
        title: "Past",

    },
    {
        id: 2,
        title: "Today",
    },
    {
        id: 3,
        title: "Upcoming",
    }
];

const UserAppointments = ({ navigation }) => {

    const [id, setId] = useState(2)

    const [pastApts, setPastApts] = useState();
    const [todayApts, setTodayApts] = useState();
    const [upcomingApts, setUpcomingApts] = useState();

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [aaap, setAAAP] = useState(false);

    const [buttonEnable, setButtonEnable] = useState(false);

    const context = useContext(AuthGlobal)


    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((jwtToken) => {

                let aptOf = context.stateUser.userRole == 'users' ? 'userApt' : 'doctorApt';

                const getPastAppointments = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}appointments/${aptOf}/past/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        return resp.data;
                    }
                    catch (error) {
                        console.log(error.response.data);
                    }
                }

                const getTodayAppointments = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}appointments/${aptOf}/today/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        return resp.data;
                    }
                    catch (error) {
                        console.log(error.response.data);
                    }
                }

                const getUpcomingAppointments = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}appointments/${aptOf}/upcoming/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${jwtToken}` }
                        });
                        return resp.data;
                    }
                    catch (error) {
                        console.log(error.response.data);
                    }
                }



                const getData = () => {
                    return Promise.all([
                        getPastAppointments(),
                        getTodayAppointments(),
                        getUpcomingAppointments()
                    ]);
                };


                getData().then(
                    ([
                        pastApts,
                        todayApts,
                        upcomingApts
                    ]) => {
                        setPastApts(pastApts);
                        setTodayApts(todayApts);
                        setUpcomingApts(upcomingApts)
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
            setPastApts();
            setTodayApts();
            setUpcomingApts()
        }
    }, [])


    const d = Date.now();
    const d2 = new Date();

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#fff'}}>

            {loaded && !error && (<View style={{ flex: 1 }}>
                <View style={{ width: '100%', height: 50, backgroundColor: '#fff', flexDirection: 'row' }}>

                    {
                        Data.map((item) => <TouchableOpacity key={item.id}
                            onPress={() => setId(item.id)}
                            style={{ justifyContent: 'center', width: '33%', borderBottomColor: 'blue', borderBottomWidth: item.id == id ? 2 : 0 }}>

                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 16, fontFamily: item.id == id ? 'Montserrat-SemiBold' : 'Montserrat-Regular', color: item.id == id ? 'blue' : '#020202' }}>{item.title}</Text>

                        </TouchableOpacity>
                        )
                    }

                </View>

                {id == 1 ?

                    <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
                        {
                            pastApts ? pastApts.map(item => <UserAptCard
                                key={item._id}
                                docName={context.stateUser.userRole == 'users' ? item.doctor.name : item.user.name}
                                docCategory={context.stateUser.userRole == 'users' && item.doctor.category}
                                AptDate={Moment(item.dateOfApt).format("dddd, Do MMM YYYY")}
                                AptSlot={item.slotOfApt}
                            />)
                                : (
                                    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../assets/images/NoAppointment.jpg')} style={{ width: 170, height: 170, resizeMode: 'center', marginTop: 50  }} />

                                        <Text style={{ color: 'blue', fontFamily: 'Montserrat-SemiBold', fontSize: 18, textAlign: 'center', marginTop: 10 }}>No Appointments!</Text>
                                    </View>
                                )
                        }
                    </View>


                    : id == 2 ?

                        <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
                            {
                                todayApts ? todayApts.map(item => {

                                    const checkApts = (aptDate) => {

                                        if (Moment(aptDate).format("D M YYYY, hh mm") >= Moment(d).format("D M YYYY, hh mm") && Moment(aptDate).format("D M YYYY, hh mm") <= `${d2.getDate()} ${d2.getMonth() + 1} ${d2.getFullYear()}, ${d2.getHours()} ${d2.getMinutes() + 25}`)
                                            return true

                                        else
                                            return false

                                    }


                                    return (
                                        <UserAptCard
                                            key={item._id}
                                            Item={item}
                                            docName={context.stateUser.userRole == 'users' ? item.doctor.name : item.user.name}
                                            docCategory={context.stateUser.userRole == 'users' && item.doctor.category}
                                            AptDate={Moment(item.dateOfApt).format("dddd, Do MMM YYYY")}
                                            AptSlot={item.slotOfApt}
                                            ButtonEnable={checkApts(item.AptDate)}
                                            navigation={navigation}
                                        />
                                    )


                                })
                                    : (
                                        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                            <Image source={require('../../assets/images/NoAppointment.jpg')} style={{ width: 170, height: 170, resizeMode: 'center' }} />

                                            <Text style={{ color: 'blue', fontFamily: 'Montserrat-SemiBold', fontSize: 18, textAlign: 'center', marginTop: 10 }}>No Appointments!</Text>
                                        </View>
                                    )
                            }
                        </View>


                        :

                        <View style={{ marginVertical: 5, marginHorizontal: 10 }}>
                            {
                                upcomingApts ? upcomingApts.map(item => <UserAptCard
                                    key={item._id}
                                    docName={context.stateUser.userRole == 'users' ? item.doctor.name : item.user.name}
                                    docCategory={context.stateUser.userRole == 'users' && item.doctor.category}
                                    AptDate={Moment(item.dateOfApt).format("dddd, Do MMM YYYY")}
                                    AptSlot={item.slotOfApt}
                                />)
                                    : (
                                        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={require('../../assets/images/NoAppointment.jpg')} style={{ width: 170, height: 170, resizeMode: 'center', marginTop: 50  }} />

                                            <Text style={{ color: 'blue', fontFamily: 'Montserrat-SemiBold', fontSize: 18, textAlign: 'center', marginTop: 10 }}>No Appointments!</Text>
                                        </View>
                                    )
                            }
                        </View>

                }

            </View>)}

            {!loaded && <ActivityIndicator size='large' color='#dea838' />}
            {error && <Error />}

            {/* <View style={styles.container}>
                <UserAptCard />
            </View>
            <View style={styles.container}>
                <UserAptCard />
            </View> */}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        margin: 10
    }
})

export default UserAppointments;