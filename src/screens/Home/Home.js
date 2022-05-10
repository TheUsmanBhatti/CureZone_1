// ==========================================  Importing Libraries  =========================================

import React, { useState, useEffect, useCallback, useContext, useFocusEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, RefreshControl } from 'react-native';

import StarRating from 'react-native-star-rating';

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
    const [userAppointments, setUserAppointments] = useState()
    const [topRatedDoctors, setTopRatedDoctors] = useState()
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [covidData, setCovidData] = useState();

    const [userImage, setUserImage] = useState('https://i.pinimg.com/564x/2d/4a/33/2d4a33f892bd525361c668dafb625dec.jpg')



    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            navigation.navigate("SignIn Screen")
        }


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


                let aptOf = context.stateUser.userRole == 'users' ? 'userApt' : 'doctorApt';

                const getAppointments = async () => {
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

                const getCovidData = async () => {
                    try {
                        const resp = await axios.get(`https://api.covid19api.com/summary`);
                        return resp.data;
                    } catch (error) {
                        console.log(error.response.data);
                    }
                }

                const getTopDoctors = async () => {
                    try {
                        const resp = await axios.get(`${baseURL}doctors/top-rated`, {
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
                        getUserData(),
                        getAppointments(),
                        getTopDoctors(),
                        getCovidData()
                    ]);
                };


                getData().then(
                    ([
                        userData,
                        appointments,
                        topDoctors,
                        covidData
                    ]) => {
                        setUserProfile(userData);
                        setUserAppointments(appointments);
                        setTopRatedDoctors(topDoctors);
                        setCovidData(covidData)
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
            setUserProfile();
            setUserAppointments();
            setTopRatedDoctors();
            setCovidData()
        }
    }, [context.stateUser.isAuthenticated])

    return (
        <ScrollView showsVerticalScrollIndicator={false} >

            {loaded && !error && (<View style={styles.container}>

                {/* ---------------------------  Greeting Container  */}

                <View style={styles.greetingContainer}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={{ uri: userImage ? userImage : 'https://i.pinimg.com/564x/2d/4a/33/2d4a33f892bd525361c668dafb625dec.jpg' }} style={styles.userImage} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.greetingTime}>Good Evening,</Text>
                        <Text style={styles.userName}>{userProfile ? userProfile.name : ""} 👋</Text>
                    </View>
                </View>


                {/* ---------------------------  Covid Timeline of Current Country  */}

                <View style={styles.categoryContainer}>
                    <Text style={styles.heading}>Covid-19 Timeline</Text>
                    <CovidCard navigation={navigation} 
                    country={covidData.Countries[130].Country} 
                    active={covidData.Countries[130].NewConfirmed} 
                    death={covidData.Countries[130].TotalDeaths} 
                    total={covidData.Countries[130].TotalConfirmed}
                    />
                </View>


                {/* ---------------------------  User Current Day Appoinments  */}

                <View style={[styles.categoryContainer, { marginBottom: -5 }]}>
                    <Text style={styles.heading}>Appointment Today</Text>

                    {
                        userAppointments ?
                            userAppointments.map(
                                (item) => <TodayAptCard
                                    key={item._id}
                                    navigation={navigation}
                                    // docImage={context.stateUser.userRole == 'users' ? item.doctor.avatar : item.user.avatar}
                                    docName={context.stateUser.userRole == 'users' ? item.doctor.name : item.user.name}
                                    docCategory={context.stateUser.userRole == 'users' && item.doctor.category}
                                    aptTime={item.slotOfApt} />
                            )
                            : (
                                <View style={{backgroundColor: '#7b54f2', padding: 10, borderRadius: 10}}>
                                <Text style={{fontFamily: 'Montserrat-Medium', color: '#fff', fontSize: 15}}>You Don't have any Appointment for today</Text>
                                </View>
                            )
                    }

                </View>


                {/* ---------------------------  Top Rated Doctor (Max 5 will show)  */}

                {
                    context.stateUser.userRole == 'users' && <View style={styles.categoryContainer}>
                        <Text style={styles.heading}>Top Doctors</Text>
                        <View>
                            {
                                topRatedDoctors &&
                                topRatedDoctors.map(
                                    (item) => <DoctorCard
                                        key={item._id}
                                        onPress={() => navigation.navigate('Doctor Detail', item)}
                                        // docImage={item.avatar}
                                        docName={item.name}
                                        docEdu={item.education}
                                        docCategory={item.category.name}
                                        docRating={item.rating}
                                    />
                                )
                            }
                        </View>
                    </View>
                }



                {/* ---------------------------  Near Hospital by Location of User  */}

                <View style={styles.categoryContainer}>
                    <Text style={styles.heading}>Near Hospitals</Text>
                    <NearHospital />
                </View>

            </View>)}

            {!loaded && <ActivityIndicator size='large' color='#dea838' />}
            {error && <Error />}

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
        marginRight: 10,
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
    }
})


// ----------------------------  Exporting the App

export default Home;